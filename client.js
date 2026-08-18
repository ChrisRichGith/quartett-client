document.addEventListener("DOMContentLoaded", () => {
    console.log("Client gestartet");

    // Beispiel: Login-Button
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("username").value;
            socket.send(JSON.stringify({ type: "login", username }));
        });
    }

    // Beispiel: UI aktualisieren
    function updateUI(data) {
        // Deine UI-Logik hier
        console.log("UI Update:", data);
    }
});
const playerName = localStorage.getItem("playerName");
const sessionCode = localStorage.getItem("sessionCode");

if (!playerName || !sessionCode) {
  window.location.href = "login.html";
}

const socket = new WebSocket("wss://reference-pressure-acknowledged-complexity.trycloudflare.com");

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
