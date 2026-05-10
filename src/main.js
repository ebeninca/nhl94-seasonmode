// Entry point — imports all modules and exposes functions to global scope for HTML onclick handlers

import { state } from './state/gameState.js';

// Navigation
import { showMainMenu, hideAllScreens, showCredits, showSeasonOverScreen, backToGame, backToMainMenuOrSeasonOver } from './ui/navigation.js';

// Team selection
import { initializeNewGame, renderTeamSelection, selectTeam, startSeason } from './ui/season/teamSelection.js';

// Game screen
import { showGamesToday, updateTeamInfo, updateCurrentDate, updateNavigationButtons, nextDate, previousDate, submitGameWrapper, simulateMyGame, showGameRawStats } from './ui/season/gameScreen.js';

// Standings & Leaders
import { showStandings, showStandingsBy } from './ui/season/standings.js';
import { showLeagueLeaders, renderLeagueLeaders, switchLeaderView } from './ui/season/leagueLeaders.js';
import { showTeamData, switchTeamDataTab, switchTeamDataStatsView, sortTeamData } from './ui/season/teamData.js';

// Modal
import { showModal, closeModal, showPlayerStatsModal, submitPlayerStatsFromModal, showPlayoffPlayerStatsModal, submitPlayoffPlayerStats } from './ui/modal.js';

// Persistence
import { saveGame, exportSave, triggerImport, importSave, continueGame, checkSavedGame } from './persistence/saveLoad.js';

// Playoffs
import { initPlayoffs } from './engine/playoffs/playoffEngine.js';
import { playoffNextDate, playoffPrevDate, submitPlayoffCalendarGame, simulatePlayoffCalendarGame } from './ui/playoffs/playoffCalendarHandlers.js';
import { sortPlayoffLeaders, renderPlayoffLeaders, switchPlayoffLeaderView } from './ui/playoffs/playoffLeadersView.js';
import { showPlayoffScreen, renderPlayoffView, switchPlayoffView, confirmEndSeason, seasonOverAndShow } from './ui/playoffs/playoffScreen.js';
import { showPlayoffTeamData, switchPlayoffTeamDataTab, switchPlayoffTDStatsView, sortPlayoffTD } from './ui/playoffs/playoffTeamData.js';

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

function viewSeasonCalendar() {
    state.viewOnly = true;
    window._backToSeasonOver = true;
    hideAllScreens();
    document.getElementById('gameScreen').classList.add('active');
    updateTeamInfo();
    updateCurrentDate();
    showGamesToday();
    updateNavigationButtons();
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

function continuePlayoffs() {
    if (state.playoffState) showPlayoffScreen();
}

function showPlayoffGameRawStats(team1, team2, gameIndex) {
    if (!state.playoffState) return;
    let series = null;
    for (const round of state.playoffState.rounds) {
        series = round.find(s => s.team1 === team1 && s.team2 === team2);
        if (series) break;
    }
    if (!series || !series.games[gameIndex]) return;
    const gameData = series.games[gameIndex];
    if (!gameData.rawStats) {
        document.getElementById('modalContent').innerHTML = `
            <p>No detailed stats available for this game.</p>
            <div class="modal-buttons"><button class="btn" onclick="closeModal()">Close</button></div>
        `;
        document.getElementById('modal').classList.add('show');
        return;
    }
    // Determine visitor/home based on game number (team1 is home in games 0,1,4,6)
    const homeGames = [0, 1, 4, 6];
    const team1IsHome = homeGames.includes(gameIndex);
    const visitor = team1IsHome ? team2 : team1;
    const home = team1IsHome ? team1 : team2;
    const visitorScore = team1IsHome ? gameData.score2 : gameData.score1;
    const homeScore = team1IsHome ? gameData.score1 : gameData.score2;
    const visitorRaw = team1IsHome ? gameData.rawStats.team2 : gameData.rawStats.team1;
    const homeRaw = team1IsHome ? gameData.rawStats.team1 : gameData.rawStats.team2;

    const fakeGame = {
        visitor, home,
        visitorScore, homeScore,
        rawStats: { visitor: visitorRaw, home: homeRaw }
    };
    showGameRawStats(fakeGame);
}

// Expose all functions to window for HTML onclick handlers
Object.assign(window, {
    showMainMenu, showNewGame, showCredits, showSeasonOverScreen,
    backToGame, backToMainMenuOrSeasonOver, hideAllScreens,
    startSeason, renderTeamSelection, selectTeam,
    showGamesToday, updateTeamInfo, updateCurrentDate, updateNavigationButtons,
    nextDate, previousDate, submitGameWrapper, simulateMyGame, showGameRawStats,
    showStandings, showStandingsBy,
    showLeagueLeaders, renderLeagueLeaders, switchLeaderView,
    showModal, closeModal, showPlayerStatsModal, submitPlayerStatsFromModal,
    showPlayoffPlayerStatsModal, submitPlayoffPlayerStats,
    saveGame, exportSave, triggerImport, importSave, continueGame, checkSavedGame,
    initPlayoffs: initPlayoffsAndShow, continuePlayoffs, showPlayoffScreen, renderPlayoffView, switchPlayoffView, confirmEndSeason, seasonOverAndShow,
    playoffNextDate, playoffPrevDate, submitPlayoffCalendarGame, simulatePlayoffCalendarGame,
    showPlayoffLeaders, sortPlayoffLeaders, renderPlayoffLeaders, switchPlayoffLeaderView,
    showPlayoffGameRawStats, saveAndExportFinal, viewSeasonCalendar,
    showTeamData, switchTeamDataTab, switchTeamDataStatsView, sortTeamData,
    showPlayoffTeamData, switchPlayoffTeamDataTab, switchPlayoffTDStatsView, sortPlayoffTD
});

// On load
window.addEventListener('load', () => {
    checkSavedGame();
});
