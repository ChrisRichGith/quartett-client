const playerName = localStorage.getItem("playerName");
const sessionCode = localStorage.getItem("sessionCode");

if (!playerName || !sessionCode) {
  window.location.href = "login.html";
}

const socket = new WebSocket("ws://quartettarena.duckdns.org:8080");

const statusBox = document.getElementById("status");

socket.onopen = () => {
  statusBox.innerText = "Verbunden. Warte auf Spielstart…";

  socket.send(JSON.stringify({
    type: "join",
    name: playerName,
    code: sessionCode
  }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "error") {
    statusBox.innerText = "Fehler: " + data.msg;
  }

  if (data.type === "welcome") {
    statusBox.innerText = "Willkommen, " + data.name + "!";
  }
};

socket.onerror = () => {
  statusBox.innerText = "Verbindungsfehler.";
};

socket.onclose = () => {
  statusBox.innerText = "Verbindung geschlossen.";
};
