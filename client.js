// ========================================
// LOGIN-WEITERLEITUNG
// ========================================
import { updateTable, setMyPlayerId } from "./game.js";
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

// ========================================
// WEBSOCKET
// ========================================

let socket;
let isConnected = false;
let myPlayerId = null;

// ========================================
// SPIELFELD: Spieler an Tisch setzen
// ========================================

function updateTable(players, myId) {
    const seats = ["bottom", "right", "top", "left"];

    const myIndex = players.findIndex(p => p.id === myId);
    if (myIndex === -1) return;

    players.forEach((player, i) => {
        const relativeIndex = (i - myIndex + players.length) % players.length;
        const seatId = seats[relativeIndex];

        const seat = document.getElementById("seat-" + seatId);
        if (!seat) return;

        seat.querySelector(".playerName").textContent = player.name;
    });
}

// ========================================
// WEBSOCKET VERBINDEN
// ========================================

function connectWS() {
    if (isConnected) return;

    socket = new WebSocket("wss://homework-mistress-families-ban.trycloudflare.com");

    const statusBox = document.getElementById("statusBox");
    const lobbyList = document.getElementById("lobbyList");
    const chatMessages = document.getElementById("chatMessages");

    socket.onopen = () => {
        isConnected = true;
        statusBox.innerText = "Verbunden.";
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // ----------------------------------------
        // SERVER: Einladungscode → Join senden
        // ----------------------------------------
        if (data.type === "inviteCode") {
            socket.send(JSON.stringify({
                type: "join",
                name: playerName,
                code: sessionCode
            }));
        }

        // ----------------------------------------
        // SERVER: Fehler
        // ----------------------------------------
        if (data.type === "error") {
            statusBox.innerText = "Fehler: " + data.msg;
        }

        // ----------------------------------------
        // SERVER: Willkommen → eigene ID speichern
        // ----------------------------------------
        if (data.type === "welcome") {
            statusBox.innerText = "Willkommen, " + data.name;
            setMyPlayerId(data.id);   // ⭐ eigene ID speichern
        }


        // ----------------------------------------
        // SERVER: Lobby-Update
        // ----------------------------------------
        if (data.type === "lobby") {
            lobbyList.innerHTML = "";
            data.players.forEach(p => {
                const li = document.createElement("li");
                li.textContent = p.name;
                lobbyList.appendChild(li);
            });

            updateTable(data.players); // ⭐ Spieler am Tisch anordnen
        }


        // ----------------------------------------
        // SERVER: Spieler beigetreten
        // ----------------------------------------
        if (data.type === "playerJoined") {
            const li = document.createElement("li");
            li.textContent = data.name;
            lobbyList.appendChild(li);
        }

        // ----------------------------------------
        // SERVER: Spieler hat verlassen
        // ----------------------------------------
        if (data.type === "playerLeft") {
            lobbyList.innerHTML = "";
            data.players.forEach(p => {
                const li = document.createElement("li");
                li.textContent = p.name;
                lobbyList.appendChild(li);
            });

            updateTable(data.players, myPlayerId);
        }

        // ----------------------------------------
        // SERVER: Chat-Nachricht
        // ----------------------------------------
        if (data.type === "chat") {
            const div = document.createElement("div");
            div.textContent = `${data.name}: ${data.msg}`;

            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    socket.onclose = () => {
        isConnected = false;
        statusBox.innerText = "Verbindung verloren. Verbinde neu…";
        setTimeout(connectWS, 2000);
    };

    socket.onerror = () => {
        statusBox.innerText = "Verbindungsfehler.";
    };
}

// ========================================
// DOM geladen → Buttons aktivieren
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    connectWS();

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
