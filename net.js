// WebSocket-Verbindung zum Server herstellen
// WICHTIG: WSS für GitHub Pages (HTTPS)
const socket = new WebSocket("wss://quartettarena.duckdns.org:8080");

// Wenn Verbindung geöffnet ist
socket.addEventListener("open", () => {
    console.log("Verbunden mit dem Server");
});

// Nachrichten vom Server empfangen
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("Server:", data);

    // Hier deine Logik einfügen
});

// Fehler behandeln
socket.addEventListener("error", (err) => {
    console.error("WebSocket-Fehler:", err);
});

// Verbindung geschlossen
socket.addEventListener("close", () => {
    console.log("Verbindung geschlossen");
});
