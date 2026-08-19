const {
    profileExists,
    loadProfile,
    saveProfile,
    createProfile
} = require("./profileManager");

const {
    lobby,
    addPlayerToLobby,
    setPlayerReady,
    allPlayersReady,
    getAdmin,
    startGame
} = require("./lobbyManager");

/* ============================================================
   Login-Logik
   ============================================================ */

function handleLogin(playerName) {
    let profile;

    if (profileExists(playerName)) {
        profile = loadProfile(playerName);
        profile.lastLogin = new Date().toISOString();
        saveProfile(profile);
    } else {
        const isAdmin = lobby.players.length === 0;
        profile = createProfile(playerName, isAdmin);
    }

    addPlayerToLobby(profile);
    return profile;
}

/* ============================================================
   Ready-Button
   ============================================================ */

function playerReady(playerName) {
    setPlayerReady(playerName);
    return allPlayersReady();
}

/* ============================================================
   Admin startet das Spiel
   ============================================================ */

function adminStart(playerName) {
    const admin = getAdmin();
    if (!admin || admin.playerName !== playerName) {
        return { success: false, message: "Nur der Admin kann das Spiel starten." };
    }

    return startGame();
}

module.exports = {
    handleLogin,
    playerReady,
    adminStart,
    lobby
};
