const fs = require("fs");
const path = require("path");
const { createStarterDeck } = require("./starterDeck");

const INDEX_PATH = path.join(__dirname, "index.json");
const PLAYER_DIR = path.join(__dirname);

/* ============================================================
   Hilfsfunktionen
   ============================================================ */

function loadIndex() {
    return JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
}

function saveIndex(index) {
    fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
}

function getPlayerFile(playerName) {
    return path.join(PLAYER_DIR, `${playerName}.json`);
}

function profileExists(playerName) {
    const index = loadIndex();
    return index.players.includes(playerName);
}

/* ============================================================
   Profil laden
   ============================================================ */

function loadProfile(playerName) {
    const file = getPlayerFile(playerName);
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

/* ============================================================
   Profil speichern
   ============================================================ */

function saveProfile(profile) {
    const file = getPlayerFile(profile.playerName);
    fs.writeFileSync(file, JSON.stringify(profile, null, 2));
}

/* ============================================================
   Neues Profil erstellen
   ============================================================ */

function createProfile(playerName, isAdmin) {
    const profile = {
        playerName,
        deck: createStarterDeck(),
        isAdmin,
        isReady: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };

    // Spieler in index.json eintragen
    const index = loadIndex();
    index.players.push(playerName);
    saveIndex(index);

    // Spielerdatei speichern
    saveProfile(profile);

    return profile;
}

module.exports = {
    profileExists,
    loadProfile,
    saveProfile,
    createProfile
};
