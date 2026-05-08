import { checkSavedGame } from '../persistence/saveLoad.js';
import { state } from '../state/gameState.js';

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
    const btn = document.getElementById('continuePlayoffsBtn');
    if (btn) btn.disabled = !state.playoffState;
}

export function backToGame() {
    if (window._backToSeasonOver) {
        window._backToSeasonOver = false;
        state.viewOnly = false;
        showSeasonOverScreen();
    } else {
        hideAllScreens();
        document.getElementById('gameScreen').classList.add('active');
    }
}

export function backToMainMenuOrSeasonOver() {
    state.viewOnly = false;
    if (window._backToSeasonOver) {
        window._backToSeasonOver = false;
        showSeasonOverScreen();
    } else {
        showMainMenu();
    }
}
