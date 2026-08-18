export function renderGame(state, myId) {
    const playersDiv = document.getElementById("players");
    playersDiv.innerHTML = "";

    for (const p of Object.values(state.players)) {
        const div = document.createElement("div");
        div.className = "player";
        div.innerHTML = `
        <h3>Spieler ${p.id}</h3>
        <p>Karten: ${p.deck.length}</p>
        ${p.revealed ? renderCard(p.revealed) : "<p>Verdeckt</p>"}
        `;
        playersDiv.appendChild(div);
    }
}

export function renderCard(card) {
    return `
    <div class="card">
    <strong>${card.name}</strong><br>
    STR: ${card.str}<br>
    BEW: ${card.bew}<br>
    INT: ${card.int}<br>
    HP: ${card.hp}
    </div>
    `;
}
