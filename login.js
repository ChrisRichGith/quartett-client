const socket = new WebSocket("ws://localhost:8080");

document.getElementById("btnLogin").onclick = () => {
    const name = document.getElementById("playerName").value.trim();
    const code = document.getElementById("inviteCode").value.trim();

    if (!name || !code) {
        document.getElementById("errorMsg").innerText = "Bitte Name und Code eingeben.";
        return;
    }

    socket.send(JSON.stringify({
        action: "login",
        playerName: name,
        code: code
    }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.action === "inviteCodeInvalid") {
        document.getElementById("errorMsg").innerText = "Einladungscode ist ungültig.";
    }

    if (data.action === "loginSuccess") {

        // WICHTIG: Spielername speichern
        localStorage.setItem("playerName", data.profile.playerName);

        // Weiter zur Lobby
        window.location.href = "lobby.html";
    }
};
