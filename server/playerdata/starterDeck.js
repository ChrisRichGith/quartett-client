// Beispiel-Starterkarten (du kannst sie ersetzen)
const starterCards = [
    { id: 1, name: "Feuerwolf", str: 80, dex: 40, int: 20, hp: 150, con: 50, wis: 30, cha: 20, rarity: "common", image: "/img/feuerwolf.png" },
    { id: 2, name: "Eisdrache", str: 60, dex: 30, int: 70, hp: 180, con: 40, wis: 50, cha: 25, rarity: "rare", image: "/img/eisdrache.png" }
    // … bis 25 Karten
];

function createStarterDeck() {
    return starterCards.slice(0, 25);
}

module.exports = { createStarterDeck };
