const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const {
    handleLogin,
    playerReady,
    adminStart,
    lobby
} = require("./playerdata/playerManager");

/* ============================================================
   WebSocket Connection
   ============================================================ */

wss.on("connection", (ws) => {

    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        /* -------------------------
           LOGIN
        ------------------------- */
        if (data.action === "login") {
            const profile = handleLogin(data.playerName);

            ws.send(JSON.stringify({
                action: "loginSuccess",
                profile,
                lobby
            }));

            broadcastLobby();
        }

        /* -------------------------
           PLAYER READY
        ------------------------- */
        if (data.action === "playerReady") {
            playerReady(data.playerName);
            broadcastLobby();
        }

        /* -------------------------
           ADMIN START GAME
        ------------------------- */
        if (data.action === "adminStart") {
            const result = adminStart(data.playerName);

            if (result.success) {
                broadcast({ action: "gameStart" });
            } else {
                ws.send(JSON.stringify(result));
            }
        }
    });
});

/* ============================================================
   BROADCAST FUNCTIONS
   ============================================================ */

function broadcastLobby() {
    broadcast({
        action: "lobbyUpdate",
        lobby
    });
}

function broadcast(obj) {
    const msg = JSON.stringify(obj);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

console.log("WebSocket Server läuft auf ws://localhost:8080");
