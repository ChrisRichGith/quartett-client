// Login
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

function connectWS() {
    socket = new WebSocket("wss://harvest-uniform-competing-explain.trycloudflare.com");

    const statusBox = document.getElementById("status");
    const lobbyList = document.getElementById("lobbyList");
    const chatMessages = document.getElementById("chatMessages");

    // Verbindung hergestellt
    socket.onopen = () => {
        statusBox.innerText = "Verbunden.";
        // WICHTIG: Join NICHT sofort senden!
        // Erst warten, bis der Server inviteCode sendet.
    };

    // Nachrichten empfangen
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Server sendet Einladungscode → Verbindung ist wirklich aktiv
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
            div.textContent = data.name + ": " + data.msg;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    // Verbindung verloren → automatisch neu verbinden
    socket.onclose = () => {
        statusBox.innerText = "Verbindung verloren. Verbinde neu…";
        setTimeout(connectWS, 2000);
    };

    socket.onerror = () => {
        statusBox.innerText = "Verbindungsfehler.";
    };
}

connectWS();

// Chat senden
document.getElementById("chatSend").addEventListener("click", () => {
    const msg = document.getElementById("chatInput").value;
    if (msg.trim() === "") return;

    socket.send(JSON.stringify({
        type: "chat",
        name: playerName,
        msg
    }));

    document.getElementById("chatInput").value = "";
});
