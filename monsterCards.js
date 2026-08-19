// ========================================
// MONSTERKARTEN – Quartett-Werte
// ========================================

globalThis.MONSTER_CARDS = [
    {
        id: 1, name: "Feuerdrache", rarity: "legendary",
        description: "Ein uralter Drache aus der Glut.",
        stats: { str: 95, dex: 40, int: 70, hp: 180, con: 90, wis: 65, cha: 50 }
    },
    {
        id: 2, name: "Frostwolf", rarity: "rare",
        description: "Ein Wolf, der im Eis geboren wurde.",
        stats: { str: 72, dex: 80, int: 40, hp: 120, con: 60, wis: 45, cha: 30 }
    },
    {
        id: 3, name: "Steingolem", rarity: "rare",
        description: "Ein lebender Felsbrocken.",
        stats: { str: 85, dex: 20, int: 30, hp: 200, con: 95, wis: 40, cha: 10 }
    },
    {
        id: 4, name: "Waldgeist", rarity: "common",
        description: "Ein Geist, der den Wald schützt.",
        stats: { str: 40, dex: 60, int: 55, hp: 90, con: 45, wis: 70, cha: 50 }
    },
    {
        id: 5, name: "Schattenpanther", rarity: "epic",
        description: "Ein lautloser Jäger der Nacht.",
        stats: { str: 80, dex: 95, int: 50, hp: 110, con: 55, wis: 45, cha: 35 }
    },
    {
        id: 6, name: "Blutkrieger", rarity: "rare",
        description: "Ein Krieger, der niemals aufgibt.",
        stats: { str: 78, dex: 55, int: 40, hp: 150, con: 80, wis: 35, cha: 25 }
    },
    {
        id: 7, name: "Himmelsgreif", rarity: "epic",
        description: "Ein Greif, der über den Wolken herrscht.",
        stats: { str: 88, dex: 75, int: 60, hp: 130, con: 70, wis: 55, cha: 60 }
    },
    {
        id: 8, name: "Sumpfkröte", rarity: "common",
        description: "Eine schleimige, aber zähe Kreatur.",
        stats: { str: 35, dex: 20, int: 25, hp: 80, con: 50, wis: 30, cha: 10 }
    },
    {
        id: 9, name: "Donnerbär", rarity: "epic",
        description: "Ein Bär, der mit Blitzen kämpft.",
        stats: { str: 90, dex: 50, int: 45, hp: 160, con: 85, wis: 50, cha: 40 }
    },
    {
        id: 10, name: "Sandwurm", rarity: "rare",
        description: "Ein riesiger Wurm aus der Wüste.",
        stats: { str: 75, dex: 30, int: 20, hp: 140, con: 70, wis: 25, cha: 15 }
    },
    {
        id: 11, name: "Kristallfee", rarity: "common",
        description: "Eine Fee mit heilenden Kräften.",
        stats: { str: 25, dex: 70, int: 65, hp: 60, con: 30, wis: 80, cha: 90 }
    },
    {
        id: 12, name: "Höllenhund", rarity: "rare",
        description: "Ein Hund aus den Tiefen der Hölle.",
        stats: { str: 82, dex: 60, int: 35, hp: 120, con: 65, wis: 40, cha: 20 }
    },
    {
        id: 13, name: "Sturmfalke", rarity: "rare",
        description: "Ein Falke, der Stürme kontrolliert.",
        stats: { str: 60, dex: 95, int: 50, hp: 100, con: 45, wis: 55, cha: 40 }
    },
    {
        id: 14, name: "Moosriese", rarity: "common",
        description: "Ein Riese, der mit der Natur verbunden ist.",
        stats: { str: 70, dex: 25, int: 35, hp: 150, con: 80, wis: 50, cha: 30 }
    },
    {
        id: 15, name: "Giftspinne", rarity: "common",
        description: "Eine Spinne mit tödlichem Gift.",
        stats: { str: 30, dex: 85, int: 40, hp: 70, con: 35, wis: 30, cha: 10 }
    },
    {
        id: 16, name: "Runenmagier", rarity: "legendary",
        description: "Ein Meister der uralten Runen.",
        stats: { str: 50, dex: 45, int: 95, hp: 110, con: 60, wis: 90, cha: 70 }
    },
    {
        id: 17, name: "Echsenschamane", rarity: "rare",
        description: "Ein Schamane mit dunklen Ritualen.",
        stats: { str: 55, dex: 50, int: 75, hp: 100, con: 55, wis: 65, cha: 40 }
    },
    {
        id: 18, name: "Phantomritter", rarity: "epic",
        description: "Ein Ritter aus Nebel und Schatten.",
        stats: { str: 87, dex: 70, int: 55, hp: 140, con: 75, wis: 60, cha: 50 }
    },
    {
        id: 19, name: "Lavakäfer", rarity: "common",
        description: "Ein Käfer aus flüssigem Stein.",
        stats: { str: 45, dex: 30, int: 20, hp: 90, con: 50, wis: 25, cha: 10 }
    },
    {
        id: 20, name: "Wasserdrache", rarity: "legendary",
        description: "Ein Drache, der die Meere beherrscht.",
        stats: { str: 93, dex: 55, int: 80, hp: 170, con: 85, wis: 70, cha: 60 }
    },
    {
        id: 21, name: "Schlammmonster", rarity: "common",
        description: "Ein schleimiges Ungetüm.",
        stats: { str: 58, dex: 20, int: 25, hp: 130, con: 70, wis: 30, cha: 15 }
    },
    {
        id: 22, name: "Himmelspriester", rarity: "rare",
        description: "Ein Priester mit himmlischer Macht.",
        stats: { str: 40, dex: 45, int: 85, hp: 100, con: 50, wis: 90, cha: 75 }
    },
    {
        id: 23, name: "Nebelgeist", rarity: "common",
        description: "Ein Geist, der im Nebel lebt.",
        stats: { str: 35, dex: 60, int: 50, hp: 80, con: 40, wis: 65, cha: 55 }
    },
    {
        id: 24, name: "Schreckensoger", rarity: "rare",
        description: "Ein Oger, der Angst verbreitet.",
        stats: { str: 83, dex: 35, int: 30, hp: 160, con: 85, wis: 40, cha: 20 }
    },
    {
        id: 25, name: "Sternenwächter", rarity: "legendary",
        description: "Ein Wächter aus Sternenlicht.",
        stats: { str: 94, dex: 65, int: 90, hp: 150, con: 75, wis: 95, cha: 85 }
    }
];
