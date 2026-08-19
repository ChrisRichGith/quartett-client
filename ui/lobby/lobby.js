// Verbindung zu deinem Server-PlayerManager
import { handleLogin, playerReady, adminStart, lobby } from "/server/playerdata/playerManager.js";

/* ============================================================
   LOGIN
   ============================================================ */

document.getElementById("btnLogin").onclick = () => {
    const name = document.getElementById("playerNameInput").value.trim();
    if (!name) return;

    const profile = handleLogin(name);

    // Login Panel ausblenden
    document.getElementById("loginPanel").style.display = "none";

    // Lobby Panel anzeigen
    document.getElementById("lobbyPanel").style.display = "block";

    renderLobby(profile);
};

/* ============================================================
   LOBBY RENDERING
   ============================================================ */

function renderLobby(profile) {
    const list = document.getElementById("playerList");
    list.innerHTML = "";

    lobby.players.forEach(p => {
        const row = document.createElement("div");
        row.classList.add("playerRow");

        row.innerHTML = `
            <span>${p.playerName}</span>
            <span>${p.isAdmin ? "Admin" : ""}</span>
            <span>${p.isReady ? "Bereit" : "Nicht bereit"}</span>
        `;

        list.appendChild(row);
    });

    // Buttons anzeigen
    if (profile.isAdmin) {
        document.getElementById("btnStartGame").style.display = "inline-block";
    } else {
        document.getElementById("btnReady").style.display = "inline-block";
    }
}

/* ============================================================
   READY BUTTON
   ============================================================ */

document.getElementById("btnReady").onclick = () => {
    const name = document.getElementById("playerNameInput").value.trim();
    playerReady(name);
    renderLobby(loadProfile(name));
};

/* ============================================================
   ADMIN START BUTTON
   ============================================================ */

document.getElementById("btnStartGame").onclick = () => {
    const name = document.getElementById("playerNameInput").value.trim();
    const result = adminStart(name);

    if (!result.success) {
        alert(result.message);
        return;
    }

    alert("Spiel startet!");
    // Hier später: Wechsel ins eigentliche Spiel
};

/* ============================================================
   DECK MANAGEMENT
   ============================================================ */

document.getElementById("btnOpenDeck").onclick = () => {
    window.location.href = "/ui/deck/fantasy/deck-ui.html";
};
