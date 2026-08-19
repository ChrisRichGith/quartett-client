const socket = new WebSocket("ws://localhost:8080");
const profile = JSON.parse(sessionStorage.getItem("currentPlayer"));

let matchState = null;

/* ============================================================
   SERVER → CLIENT EVENTS
============================================================ */

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.action === "matchStarted") {
        matchState = data.state;
        renderTurnInfo();
        renderHand();
    }

    if (data.action === "cardPlayed") {
        renderActiveCard(data.card, data.playerName);
    }

    if (data.action === "nextTurn") {
        matchState.round = data.turn.round;
        matchState.turnIndex = matchState.players.indexOf(data.turn.currentPlayer);
        renderTurnInfo();
    }
};

/* ============================================================
   HAND RENDERING
============================================================ */

function renderHand() {
    const hand = document.getElementById("playerHand");
    hand.innerHTML = "";

    const deck = matchState.decks[profile.playerName];

    deck.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${card.image}">
            <div>${card.name}</div>
        `;

        div.onclick = () => {
            socket.send(JSON.stringify({
                action: "playCard",
                playerName: profile.playerName,
                cardId: card.id
            }));
        };

        hand.appendChild(div);
    });
}

/* ============================================================
   ACTIVE CARD
============================================================ */

function renderActiveCard(card, playerName) {
    const active = document.getElementById("activeCard");

    active.innerHTML = `
        <h3>${playerName} spielt:</h3>
        <img src="${card.image}">
        <div>${card.name}</div>
        <div>STR: ${card.str} | HP: ${card.hp}</div>
    `;
}

/* ============================================================
   TURN INFO
============================================================ */

function renderTurnInfo() {
    const turn = document.getElementById("turnInfo");

    const currentPlayer = matchState.players[matchState.turnIndex];

    turn.innerHTML = `
        <h3>Runde ${matchState.round}</h3>
        <div>Aktueller Spieler: ${currentPlayer}</div>
    `;
}
