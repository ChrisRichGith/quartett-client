const socket = new WebSocket("ws://localhost:8080");

let playerName = localStorage.getItem("playerName");

if (!playerName) {
    alert("Fehler: Kein Spielername gefunden.");
    window.location.href = "login.html";
}

document.getElementById("btnReady").onclick = () => {
    socket.send(JSON.stringify({
        action: "playerReady",
        playerName: playerName
    }));
};

document.getElementById("btnStart").onclick = () => {
    socket.send(JSON.stringify({
        action: "adminStart",
        playerName: playerName
    }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.action === "lobbyUpdate") {
        updateLobby(data.lobby);
    }

    if (data.action === "matchStarted") {
        window.location.href = "match.html";
    }
};

function updateLobby(lobby) {
    const list = document.getElementById("playerList");
    list.innerHTML = "";

    lobby.players.forEach(p => {
        const div = document.createElement("div");
        div.className = "player-entry";

        div.innerText =
            p.playerName +
            (p.isAdmin ? " (Admin)" : "") +
            (p.isReady ? " ✔️ Bereit" : " ❌ Nicht bereit");

        list.appendChild(div);
    });

    const me = lobby.players.find(p => p.playerName === playerName);

    if (me && me.isAdmin) {
        document.getElementById("btnStart").style.display = "block";
    }
}
