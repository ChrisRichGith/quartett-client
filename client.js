document.addEventListener("DOMContentLoaded", () => {
    console.log("Client gestartet");

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("username").value;
            const code = document.getElementById("sessionCode").value;

            localStorage.setItem("playerName", username);
            localStorage.setItem("sessionCode", code);

            window.location.href = "index.html";
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

// UI-Elemente
const statusBox = document.getElementById("status");
const lobbyList = document.getElementById("lobbyList");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

// Verbindung hergestellt
socket.onopen = () => {
    statusBox.innerText = "Verbunden. Warte auf Spielstart…";

    socket.send(JSON.stringify({
        type: "join",
        name: playerName,
        code: sessionCode
    }));
};

// Nachrichten empfangen
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "error") {
        statusBox.innerText = "Fehler: " + data.msg;
    }

    if (data.type === "welcome") {
        statusBox.innerText = "Willkommen, " + data.name;
    }

    if (data.type === "lobby") {
        lobbyList.innerHTML = "";
        data.players.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p;
            lobbyList.appendChild(li);
        });
    }

    if (data.type === "playerJoined") {
        const li = document.createElement("li");
        li.textContent = data.name;
        lobbyList.appendChild(li);
    }

    if (data.type === "playerLeft") {
        lobbyList.innerHTML = "";
        data.players.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p;
            lobbyList.appendChild(li);
        });
    }

    if (data.type === "chat") {
        const div = document.createElement("div");
        div.textContent = data.name + ": " + data.msg;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
};

// Chat senden
chatSend.addEventListener("click", () => {
    const msg = chatInput.value;
    if (msg.trim() === "") return;

    socket.send(JSON.stringify({
        type: "chat",
        name: playerName,
        msg
    }));

    chatInput.value = "";
});

// Fehler
socket.onerror = () => {
    statusBox.innerText = "Verbindungsfehler.";
};

// Verbindung geschlossen
socket.onclose = () => {
    statusBox.innerText = "Verbindung geschlossen.";
};
