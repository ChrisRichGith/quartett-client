const lobby = {
    players: [],
    gameStarted: false
};

/* ============================================================
   Spieler zur Lobby hinzufügen
   ============================================================ */

function addPlayerToLobby(profile) {
    lobby.players.push({
        playerName: profile.playerName,
        isAdmin: profile.isAdmin,
        isReady: profile.isReady
    });
}

/* ============================================================
   Ready setzen
   ============================================================ */

function setPlayerReady(playerName) {
    const player = lobby.players.find(p => p.playerName === playerName);
    if (player) player.isReady = true;
}

/* ============================================================
   Prüfen ob alle bereit sind
   ============================================================ */

function allPlayersReady() {
    return lobby.players.every(p => p.isReady);
}

/* ============================================================
   Admin finden
   ============================================================ */

function getAdmin() {
    return lobby.players.find(p => p.isAdmin);
}

/* ============================================================
   Spiel starten
   ============================================================ */

function startGame() {
    if (!allPlayersReady()) {
        return { success: false, message: "Nicht alle Spieler sind bereit." };
    }

    lobby.gameStarted = true;
    return { success: true, message: "Spiel gestartet!" };
}

module.exports = {
    lobby,
    addPlayerToLobby,
    setPlayerReady,
    allPlayersReady,
    getAdmin,
    startGame
};
