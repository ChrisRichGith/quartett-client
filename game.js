// ========================================
// GAME LOGIC – Spielerpositionen, Tischlayout
// ========================================

// Reihenfolge der Sitzplätze im Uhrzeigersinn
const SEATS = ["bottom", "right", "top", "left"];

// Speichert die eigene Spieler-ID
let myPlayerId = null;

// Wird von client.js gesetzt
export function setMyPlayerId(id) {
    myPlayerId = id;
}

// Spieler am Tisch anordnen
export function updateTable(players) {
    if (!myPlayerId) return;

    const myIndex = players.findIndex(p => p.id === myPlayerId);
    if (myIndex === -1) return;

    players.forEach((player, i) => {
        const relativeIndex = (i - myIndex + players.length) % players.length;
        const seatId = SEATS[relativeIndex];

        const seat = document.getElementById("seat-" + seatId);
        if (!seat) return;

        seat.querySelector(".playerName").textContent = player.name;
    });
}

// ========================================
// Hier kommen später:
// - Kartenlogik
// - Rundenlogik
// - Animationen
// - Punkte
// - usw.
// ========================================
