import { checkSavedGame } from '../persistence/saveLoad.js';

export function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(el => {
        el.classList.remove('active');
        el.style.display = '';
    });
}

export function showMainMenu() {
    hideAllScreens();
    document.getElementById('mainMenu').classList.add('active');
    checkSavedGame();
}

export function showCredits() {
    hideAllScreens();
    document.getElementById('creditsScreen').classList.add('active');
}

export function showSeasonOverScreen() {
    hideAllScreens();
    document.getElementById('seasonOverScreen').classList.add('active');
}

export function backToGame() {
    if (window._backToSeasonOver) {
        window._backToSeasonOver = false;
        showSeasonOverScreen();
    } else {
        hideAllScreens();
        document.getElementById('gameScreen').classList.add('active');
    }
}

export function backToMainMenuOrSeasonOver() {
    showMainMenu();
}
