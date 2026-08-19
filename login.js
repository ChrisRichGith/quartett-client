document.addEventListener("DOMContentLoaded", () => {
    const joinBtn = document.querySelector("button");

    joinBtn.addEventListener("click", () => {
        const code = document.getElementById("code").value.trim();
        const name = document.getElementById("name").value.trim();

        if (!code || !name) {
            alert("Bitte Name und Einladungscode eingeben.");
            return;
        }

        localStorage.setItem("playerName", name);
        localStorage.setItem("sessionCode", code);

        window.location.href = "index.html";
    });
});
