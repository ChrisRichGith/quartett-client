// Login-Weiterleitung
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            localStorage.setItem("playerName", document.getElementById("username").value);
            localStorage.setItem("sessionCode", document.getElementById("sessionCode").value);
            window.location.href = "index.html";
        });
    }
});

const playerName = localStorage.getItem("playerName");
const sessionCode = localStorage.getItem("sessionCode");

if (!playerName || !sessionCode) {
    window.location.href = "login.html";
}

let socket;
let isConnected = false;

// WebSocket verbinden
function connectWS() {
    if (isConnected) return;

    socket = new WebSocket("wss://harvest-uniform-competing-explain.trycloudflare.com");

    const statusBox = document.getElementById("statusBox");
    const lobbyList = document.getElementById("lobbyList");
    const chatMessages = document.getElementById("chatMessages");

    socket.onopen = () => {
        isConnected = true;
        statusBox.innerText = "Verbunden.";
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "inviteCode") {
            socket.send(JSON.stringify({
                type: "join",
                name: playerName,
                code: sessionCode
            }));
        }

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
            div.textContent = `${data.name}: ${data.msg}`;

            const chatBox = document.getElementById("chatMessages");
            chatBox.appendChild(div);

            // ⭐ Automatisch nach unten scrollen
            chatBox.scrollTop = chatBox.scrollHeight;
        }


    socket.onclose = () => {
        isConnected = false;
        statusBox.innerText = "Verbindung verloren. Verbinde neu…";
        setTimeout(connectWS, 2000);
    };

    socket.onerror = () => {
        statusBox.innerText = "Verbindungsfehler.";
    };
}

// DOM vollständig geladen → jetzt Chat-Button sicher verfügbar
document.addEventListener("DOMContentLoaded", () => {

    connectWS(); // WebSocket erst starten, wenn DOM existiert

    const chatSend = document.getElementById("chatSend");
    const chatInput = document.getElementById("chatInput");

    if (chatSend) {
        chatSend.addEventListener("click", () => {
            const msg = chatInput.value.trim();
            if (msg === "") return;

            socket.send(JSON.stringify({
                type: "chat",
                name: playerName,
                msg
            }));

            chatInput.value = "";
        });
    }
    const startBtn = document.getElementById("startGameBtn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            socket.send(JSON.stringify({ type: "startGame" }));
        });
    }
});
