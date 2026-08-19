const { loadProfile } = require("../playerdata/profileManager");

const matchState = {
    players: [],
    decks: {},
    turnIndex: 0,
    round: 1,
    activeCard: null,
    matchStarted: false
};

/* ============================================================
   MATCH INITIALISIEREN
============================================================ */

function startMatch(lobby) {
    matchState.players = lobby.players.map(p => p.playerName);
    matchState.matchStarted = true;
    matchState.round = 1;
    matchState.turnIndex = 0;

    // Decks laden
    matchState.players.forEach(playerName => {
        const profile = loadProfile(playerName);
        matchState.decks[playerName] = profile.deck;
    });

    return matchState;
}

/* ============================================================
   NÄCHSTER SPIELER
============================================================ */

function nextTurn() {
    matchState.turnIndex = (matchState.turnIndex + 1) % matchState.players.length;

    if (matchState.turnIndex === 0) {
        matchState.round++;
    }

    return {
        currentPlayer: matchState.players[matchState.turnIndex],
        round: matchState.round
    };
}

/* ============================================================
   KARTENAKTION
============================================================ */

function playCard(playerName, cardId) {
    const card = matchState.decks[playerName].find(c => c.id === cardId);
    matchState.activeCard = card;

    return card;
}

module.exports = {
    matchState,
    startMatch,
    nextTurn,
    playCard
};
