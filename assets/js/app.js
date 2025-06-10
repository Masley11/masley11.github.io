// Mode plein écran pour PWA
const setFullscreenMode = () => {
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone ||
        /Android/.test(navigator.userAgent)) {
        document.documentElement.style.backgroundColor = "#1a1a1a";
        setTimeout(() => window.scrollTo(0, 1), 100);
    }
};

// Enregistrement du Service Worker
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW enregistré:', reg))
            .catch(err => console.error('Erreur SW:', err));
    }
};

// Gestion de l'installation PWA
const setupPWAInstall = () => {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installBtn = document.getElementById('installBtn');
        if (installBtn) installBtn.style.display = 'block';
    });

    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Installation acceptée');
                    }
                    deferredPrompt = null;
                });
            }
        });
    }
};

// Calcul de la rentabilité
const calculateProfitability = () => {
    const form = document.getElementById('calcForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const getValue = id => parseFloat(document.getElementById(id).value) || 0;
        
        const fuelPrice = getValue('fuelPrice');
        const distance = getValue('distance');
        const revenue = getValue('revenue');
        const consumption = getValue('consumption');

        const fuelCost = (distance / consumption) * fuelPrice;
        const profit = revenue - fuelCost;
        const profitPercent = (profit / revenue) * 100;

        const resultDiv = document.getElementById('result');
        if (!resultDiv) return;

        let message = `Coût carburant: €${fuelCost.toFixed(2)}<br>`;
        message += `Profit net: €${profit.toFixed(2)}<br>`;
        message += `Rentabilité: ${profitPercent.toFixed(2)}%`;

        // Détermination du niveau de rentabilité
        let profitClass = '';
        if (profitPercent < 80) {
            profitClass = 'profit-low';
            message += `<br><br><strong>Attention: Rentabilité faible</strong>`;
        } else if (profitPercent < 90) {
            profitClass = 'profit-medium';
            message += `<br><br><strong>Rentabilité moyenne</strong>`;
        } else if (profitPercent < 95) {
            profitClass = 'profit-high';
            message += `<br><br><strong>Bonne rentabilité</strong>`;
        } else {
            profitClass = 'profit-excellent';
            message += `<br><br><strong>Excellente rentabilité</strong>`;
        }

        resultDiv.className = profitClass;
        resultDiv.innerHTML = message;
        resultDiv.style.display = 'block';
    });
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setFullscreenMode();
    registerServiceWorker();
    setupPWAInstall();
    calculateProfitability();
});