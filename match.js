const socket = new WebSocket("ws://localhost:8080");

let playerName = localStorage.getItem("playerName");

if (!playerName) {
    alert("Fehler: Kein Spielername gefunden.");
    window.location.href = "login.html";
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.action === "nextTurn") {
        document.getElementById("turnInfo").innerText =
            "Spieler am Zug: " + data.turn.currentPlayer +
            " | Runde: " + data.turn.round;
    }

    if (data.action === "cardPlayed") {
        document.getElementById("cardArea").innerText =
            data.playerName + " hat gespielt: " + data.card.name;
    }
};
