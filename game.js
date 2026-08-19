// ========================================
// GAME LOGIC – Spielerpositionen, Tischlayout
// ========================================

// Reihenfolge der Sitzplätze im Uhrzeigersinn
const SEATS = ["bottom", "right", "top", "left"];

// Speichert die eigene Spieler-ID
let myPlayerId = null;

// ========================================
// Eigene Spieler-ID setzen (wird von client.js aufgerufen)
// ========================================
export function setMyPlayerId(id) {
    myPlayerId = id;
}

// ========================================
// Spieler am Tisch anordnen
// ========================================
export function updateTable(players) {
    if (!myPlayerId) return;

    const myIndex = players.findIndex(p => p === myPlayerId);
    if (myIndex === -1) return;

    const SEATS = ["bottom", "right", "top", "left"];

    players.forEach((player, i) => {
        const relativeIndex = (i - myIndex + players.length) % players.length;
        const seatId = SEATS[relativeIndex];

        const seat = document.getElementById("seat-" + seatId);
        if (!seat) return;

        seat.querySelector(".playerName").textContent = player;
    });
}


// ========================================
// Platz für zukünftige Spiellogik
// ========================================

// Beispiel: Karten verteilen
export function dealCardsToPlayers(players, deck) {
    // später implementierbar
}

// Beispiel: Runde starten
export function startRound(players) {
    // später implementierbar
}

// Beispiel: Karten spielen
export function playCard(playerId, card) {
    // später implementierbar
}
