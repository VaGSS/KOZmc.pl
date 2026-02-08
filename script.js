const SERVER_IP = "mc308.boxtoplay.com:26237"; 

// Kopiowanie IP
function copyIp() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        alert("Skopiowano IP: " + SERVER_IP);
    }).catch(err => console.error("Błąd kopiowania", err));
}

// Sprawdzanie statusu serwera
async function checkStatus() {
    const countEl = document.getElementById("player-count");
    if(!countEl) return;

    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();
        
        if(data.online) {
            countEl.innerHTML = `<span style="color:#2ecc71">●</span> ${data.players.online} graczy online`;
        } else {
            countEl.innerHTML = `<span style="color:#e74c3c">●</span> Offline`;
        }
    } catch {
        countEl.innerHTML = "Serwer niedostępny";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkStatus();
    // Jeśli na stronie jest element z ID 'server-ip-text', wpisz tam IP
    const ipText = document.getElementById("server-ip-text");
    if(ipText) ipText.innerText = SERVER_IP;

});
