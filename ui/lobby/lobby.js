const socket = new WebSocket("ws://localhost:8080");

let localPlayer = null;

/* ============================================================
   LOGIN
   ============================================================ */

document.getElementById("btnLogin").onclick = () => {
    const name = document.getElementById("playerNameInput").value.trim();
    if (!name) return;

    socket.send(JSON.stringify({
        action: "login",
        playerName: name
    }));
};

/* ============================================================
   SERVER → CLIENT EVENTS
   ============================================================ */

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Login erfolgreich
    if (data.action === "loginSuccess") {
        localPlayer = data.profile;

        document.getElementById("loginPanel").style.display = "none";
        document.getElementById("lobbyPanel").style.display = "block";

        renderLobby(data.lobby);
    }

    // Lobby Update
    if (data.action === "lobbyUpdate") {
        renderLobby(data.lobby);
    }

    // Spielstart
    if (data.action === "gameStart") {
        window.location.href = "/ui/game/game.html";
    }
};

/* ============================================================
   LOBBY RENDERING
   ============================================================ */

function renderLobby(lobby) {
    const list = document.getElementById("playerList");
    list.innerHTML = "";

    lobby.players.forEach(p => {
        const row = document.createElement("div");
        row.classList.add("playerRow");

        row.innerHTML = `
            <span>${p.playerName}</span>
            <span>${p.isAdmin ? "Admin" : ""}</span>
            <span>${p.isReady ? "Bereit" : "Nicht bereit"}</span>
        `;

        list.appendChild(row);
    });

    // Buttons anzeigen
    if (localPlayer.isAdmin) {
        document.getElementById("btnStartGame").style.display = "inline-block";
        document.getElementById("btnReady").style.display = "none";
    } else {
        document.getElementById("btnReady").style.display = "inline-block";
        document.getElementById("btnStartGame").style.display = "none";
    }
}

/* ============================================================
   READY BUTTON
   ============================================================ */

document.getElementById("btnReady").onclick = () => {
    socket.send(JSON.stringify({
        action: "playerReady",
        playerName: localPlayer.playerName
    }));
};

/* ============================================================
   ADMIN START BUTTON
   ============================================================ */

document.getElementById("btnStartGame").onclick = () => {
    socket.send(JSON.stringify({
        action: "adminStart",
        playerName: localPlayer.playerName
    }));
};

/* ============================================================
   DECK MANAGEMENT
   ============================================================ */

document.getElementById("btnOpenDeck").onclick = () => {
    sessionStorage.setItem("currentPlayer", JSON.stringify(localPlayer));
    window.location.href = "/ui/deck/fantasy/deck-ui.html";
};
