// ========================================
// LOGIN LOGIK – Nur für login.html
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const joinBtn = document.querySelector("button");

    joinBtn.addEventListener("click", () => {
        const code = document.getElementById("code").value.trim();
        const name = document.getElementById("name").value.trim();

        if (!code || !name) {
            alert("Bitte Name und Einladungscode eingeben.");
            return;
        }

        // Daten speichern
        localStorage.setItem("playerName", name);
        localStorage.setItem("sessionCode", code);

        // Weiter zur Hauptseite
        window.location.href = "index.html";
    });

});
