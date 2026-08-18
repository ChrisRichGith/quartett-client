const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

let currentSessionCode = generateCode();
console.log("Einladungscode:", currentSessionCode);

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "join") {
      if (data.code !== currentSessionCode) {
        ws.send(JSON.stringify({ type: "error", msg: "Ungültiger Einladungscode" }));
        ws.close();
        return;
      }

      ws.playerName = data.name;

      ws.send(JSON.stringify({
        type: "welcome",
        name: ws.playerName
      }));

      console.log("Spieler beigetreten:", ws.playerName);
    }
  });
});

console.log("WebSocket Server läuft auf Port 8081");
