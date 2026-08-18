document.addEventListener("DOMContentLoaded", () => {
    console.log("Client gestartet");

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("username").value;
            socket.send(JSON.stringify({ type: "login", username }));
        });
    }
});

// Spielername + Sessioncode aus localStorage
const playerName = localStorage.getItem("playerName");
const sessionCode = localStorage.getItem("sessionCode");

// Wenn nicht eingeloggt → zurück zur Login-Seite
if (!playerName || !sessionCode) {
    window.location.href = "login.html";
}

// WebSocket-Verbindung über Cloudflare Tunnel
const socket = new WebSocket("wss://reference-pressure-acknowledged-complexity.trycloudflare.com");

// Status-Anzeige
const statusBox = document.getElementById("status");

// Verbindung hergestellt
socket.onopen = () => {
    statusBox.innerText = "Verbunden. Warte auf Spielstart…";

    socket.send(JSON.stringify({
        type: "join",
        name: playerName,
        code: sessionCode
    }));
};

// EINZIGER gemeinsamer onmessage-Handler
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "error") {
        statusBox.innerText = "Fehler: " + data.msg;
    }

    if (data.type === "welcome") {
        statusBox.innerText = "Willkommen, " + data.name;
    }

    if (data.type === "lobby") {
        statusBox.innerText = "Lobby: " + data.players.join(", ");
    }

    if (data.type === "playerJoined") {
        statusBox.innerText = data.name + " ist der Lobby beigetreten!";
    }

    if (data.type === "playerLeft") {
        statusBox.innerText = "Spieler in Lobby: " + data.players.join(", ");
    }
};

// Fehler
socket.onerror = () => {
    statusBox.innerText = "Verbindungsfehler.";
};

// Verbindung geschlossen
socket.onclose = () => {
    statusBox.innerText = "Verbindung geschlossen.";
};

