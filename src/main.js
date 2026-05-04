// Entry point — imports all modules and exposes functions to global scope for HTML onclick handlers

import { state } from './state/gameState.js';

// Navigation
import { showMainMenu, hideAllScreens, showCredits, showSeasonOverScreen, backToGame, backToMainMenuOrSeasonOver } from './ui/navigation.js';

// Team selection
import { initializeNewGame, renderTeamSelection, selectTeam, startSeason } from './ui/season/teamSelection.js';

// Game screen
import { showGamesToday, updateTeamInfo, updateCurrentDate, updateNavigationButtons, nextDate, previousDate, submitGameWrapper, simulateMyGame } from './ui/season/gameScreen.js';

// Standings & Leaders
import { showStandings, showStandingsBy } from './ui/season/standings.js';
import { showLeagueLeaders, renderLeagueLeaders } from './ui/season/leagueLeaders.js';

// Modal
import { showModal, closeModal, showPlayerStatsModal, submitPlayerStatsFromModal, showPlayoffPlayerStatsModal, submitPlayoffPlayerStats } from './ui/modal.js';

// Persistence
import { saveGame, exportSave, triggerImport, importSave, continueGame, checkSavedGame } from './persistence/saveLoad.js';

// Playoffs
import { initPlayoffs } from './engine/playoffs/playoffEngine.js';
import { playoffNextDate, playoffPrevDate, submitPlayoffCalendarGame, simulatePlayoffCalendarGame } from './engine/playoffs/playoffCalendar.js';
import { sortPlayoffLeaders, renderPlayoffLeaders } from './engine/playoffs/playoffStats.js';
import { showPlayoffScreen, renderPlayoffView, switchPlayoffView, confirmEndSeason, seasonOverAndShow } from './ui/playoffs/playoffScreen.js';

// showNewGame needs initializeNewGame, wired here to avoid circular deps
function showNewGame() {
    hideAllScreens();
    document.getElementById('newGameScreen').classList.add('active');
    initializeNewGame();
}

function showPlayoffLeaders() {
    hideAllScreens();
    document.getElementById('playoffStatsScreen').classList.add('active');
    state.playoffSortCol = 'points';
    state.playoffSortDir = 'desc';
    renderPlayoffLeaders();
}

function saveAndExportFinal() {
    saveGame();
    exportSave();
}

// Expose state fields needed by inline onclick in leagueLeaders table headers
Object.defineProperty(window, 'currentFilter', { get: () => state.currentFilter });
Object.defineProperty(window, 'currentSortColumn', { get: () => state.currentSortColumn });
Object.defineProperty(window, 'sortDirection', { get: () => state.sortDirection });

// Wrap initPlayoffs to also show the playoff screen (original behavior)
function initPlayoffsAndShow() {
    initPlayoffs();
    showPlayoffScreen();
}

// Expose all functions to window for HTML onclick handlers
Object.assign(window, {
    showMainMenu, showNewGame, showCredits, showSeasonOverScreen,
    backToGame, backToMainMenuOrSeasonOver, hideAllScreens,
    startSeason, renderTeamSelection, selectTeam,
    showGamesToday, updateTeamInfo, updateCurrentDate, updateNavigationButtons,
    nextDate, previousDate, submitGameWrapper, simulateMyGame,
    showStandings, showStandingsBy,
    showLeagueLeaders, renderLeagueLeaders,
    showModal, closeModal, showPlayerStatsModal, submitPlayerStatsFromModal,
    showPlayoffPlayerStatsModal, submitPlayoffPlayerStats,
    saveGame, exportSave, triggerImport, importSave, continueGame, checkSavedGame,
    initPlayoffs: initPlayoffsAndShow, showPlayoffScreen, renderPlayoffView, switchPlayoffView, confirmEndSeason, seasonOverAndShow,
    playoffNextDate, playoffPrevDate, submitPlayoffCalendarGame, simulatePlayoffCalendarGame,
    showPlayoffLeaders, sortPlayoffLeaders, renderPlayoffLeaders,
    saveAndExportFinal
});

// On load
window.addEventListener('load', () => {
    checkSavedGame();
});
