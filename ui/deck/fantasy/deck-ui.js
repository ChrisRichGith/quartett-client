/* ============================================================
   DECK UI – CORE MODULE
   ============================================================ */

let currentTheme = null;
let currentDeck = [];
let filteredDeck = [];
let selectedCard = null;

/* ============================================================
   1. LOAD THEME
   ============================================================ */

function applyTheme(theme) {
    currentTheme = theme;

    // Apply background color
    document.body.style.backgroundColor = theme.colors.background;

    // Apply text color
    document.body.style.color = theme.colors.text;

    // Apply highlight color to buttons
    document.querySelectorAll("#detailButtons button").forEach(btn => {
        btn.style.borderColor = theme.colors.highlight;
    });

    // Apply glyphs
    document.getElementById("glyphSTR").src = theme.glyphs.str;
    document.getElementById("glyphDEX").src = theme.glyphs.dex;
    document.getElementById("glyphINT").src = theme.glyphs.int;
    document.getElementById("glyphHP").src = theme.glyphs.hp;
    document.getElementById("glyphCON").src = theme.glyphs.con;
    document.getElementById("glyphWIS").src = theme.glyphs.wis;
    document.getElementById("glyphCHA").src = theme.glyphs.cha;

    renderDeckGrid();
}

/* ============================================================
   2. LOAD DECK DATA
   ============================================================ */

function loadDeck(monsterCards) {
    currentDeck = monsterCards;
    filteredDeck = [...currentDeck];
    renderDeckGrid();
}

/* ============================================================
   3. RENDER GRID (RIGHT SIDE)
   ============================================================ */

function renderDeckGrid() {
    const grid = document.getElementById("cardGrid");
    grid.innerHTML = "";

    filteredDeck.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <div class="cardName">${card.name}</div>
            <div class="cardStats">
                STR: ${card.str} | HP: ${card.hp} | INT: ${card.int}
            </div>
        `;

        div.onclick = () => showDetail(card);

        grid.appendChild(div);
    });
}

/* ============================================================
   4. SHOW DETAIL CARD (LEFT SIDE)
   ============================================================ */

function showDetail(card) {
    selectedCard = card;

    // Artwork
    document.getElementById("detailArtwork").src = card.image;

    // Name + rarity
    document.getElementById("detailName").textContent = card.name;
    document.getElementById("detailRarity").textContent = card.rarity;

    // Rarity frame
    document.getElementById("detailRarityFrame").style.backgroundImage =
        `url(${currentTheme.frames[card.rarity]})`;

    // Stats
    document.getElementById("valueSTR").textContent = card.str;
    document.getElementById("valueDEX").textContent = card.dex;
    document.getElementById("valueINT").textContent = card.int;
    document.getElementById("valueHP").textContent = card.hp;
    document.getElementById("valueCON").textContent = card.con;
    document.getElementById("valueWIS").textContent = card.wis;
    document.getElementById("valueCHA").textContent = card.cha;

    // Description
    document.getElementById("detailDescription").textContent = card.description;

    updateDeckPower();
}

/* ============================================================
   5. SORTING
   ============================================================ */

document.getElementById("sortSelect").onchange = function () {
    const sortBy = this.value;

    filteredDeck.sort((a, b) => {
        if (typeof a[sortBy] === "string") {
            return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy] - a[sortBy];
    });

    renderDeckGrid();
};

/* ============================================================
   6. FILTERING
   ============================================================ */

document.getElementById("filterSelect").onchange = function () {
    const filter = this.value;

    if (filter === "all") {
        filteredDeck = [...currentDeck];
    } else if (filter === "legendary" || filter === "epic" || filter === "rare" || filter === "common") {
        filteredDeck = currentDeck.filter(c => c.rarity === filter);
    } else if (filter === "str80") {
        filteredDeck = currentDeck.filter(c => c.str > 80);
    } else if (filter === "hp150") {
        filteredDeck = currentDeck.filter(c => c.hp > 150);
    }

    renderDeckGrid();
};

/* ============================================================
   7. DECK POWER METER
   ============================================================ */

function updateDeckPower() {
    const avgSTR = Math.round(currentDeck.reduce((a, c) => a + c.str, 0) / currentDeck.length);
    const avgHP = Math.round(currentDeck.reduce((a, c) => a + c.hp, 0) / currentDeck.length);

    const rarityCount = {
        legendary: currentDeck.filter(c => c.rarity === "legendary").length,
        epic: currentDeck.filter(c => c.rarity === "epic").length,
        rare: currentDeck.filter(c => c.rarity === "rare").length,
        common: currentDeck.filter(c => c.rarity === "common").length
    };

    const deckPower = avgSTR + avgHP;

    document.getElementById("avgSTR").textContent = avgSTR;
    document.getElementById("avgHP").textContent = avgHP;
    document.getElementById("rarityDistribution").textContent =
        `L:${rarityCount.legendary} E:${rarityCount.epic} R:${rarityCount.rare} C:${rarityCount.common}`;
    document.getElementById("deckPower").textContent = deckPower;
}

/* ============================================================
   8. BUTTONS
   ============================================================ */

document.getElementById("btnBackToDeck").onclick = () => {
    selectedCard = null;
    document.getElementById("detailArtwork").src = "";
    document.getElementById("detailName").textContent = "";
    document.getElementById("detailRarity").textContent = "";
    document.getElementById("detailDescription").textContent = "";
};

document.getElementById("btnUpgrade").onclick = () => {
    if (!selectedCard) return;
    selectedCard.str += 5;
    selectedCard.hp += 10;
    showDetail(selectedCard);
    renderDeckGrid();
};

document.getElementById("btnCompare").onclick = () => {
    alert("Vergleichsmodus wird später implementiert.");
};
const socket = new WebSocket("ws://localhost:8080");

// Profil aus der Lobby laden
const profile = JSON.parse(sessionStorage.getItem("currentPlayer"));
let deck = [];

/* ============================================================
   SERVER → CLIENT EVENTS
   ============================================================ */

socket.onopen = () => {
    socket.send(JSON.stringify({
        action: "loadDeck",
        playerName: profile.playerName
    }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Deck vom Server erhalten
    if (data.action === "deckData") {
        deck = data.deck;
        renderDeckGrid();
    }

    // Deck wurde gespeichert
    if (data.action === "deckSaved") {
        alert("Deck gespeichert!");
    }
};

/* ============================================================
   DECK RENDERING
   ============================================================ */

function renderDeckGrid() {
    const grid = document.getElementById("cardGrid");
    grid.innerHTML = "";

    deck.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${card.image}">
            <div class="cardName">${card.name}</div>
            <div class="cardStats">STR: ${card.str} | HP: ${card.hp}</div>
        `;

        div.onclick = () => showDetail(card);

        grid.appendChild(div);
    });
}

/* ============================================================
   DETAIL VIEW
   ============================================================ */

function showDetail(card) {
    document.getElementById("detailName").textContent = card.name;
    document.getElementById("detailArtwork").src = card.image;

    document.getElementById("valueSTR").textContent = card.str;
    document.getElementById("valueHP").textContent = card.hp;

    document.getElementById("btnUpgrade").onclick = () => {
        card.str += 5;
        card.hp += 10;
        renderDeckGrid();
        showDetail(card);
    };
}

/* ============================================================
   DECK SPEICHERN
   ============================================================ */

document.getElementById("btnSaveDeck").onclick = () => {
    socket.send(JSON.stringify({
        action: "saveDeck",
        playerName: profile.playerName,
        deck
    }));
};

/* ============================================================
   ZURÜCK ZUR LOBBY
   ============================================================ */

document.getElementById("btnBackToLobby").onclick = () => {
    socket.send(JSON.stringify({
        action: "deckFinished",
        playerName: profile.playerName
    }));

    window.location.href = "/ui/lobby/lobby.html";
};
