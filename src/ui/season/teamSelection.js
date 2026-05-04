import { teams } from '../../data/teams.js';
import { state } from '../../state/gameState.js';
import { initializeTeamStats } from '../../engine/stats.js';
import { initializeSchedule } from '../../engine/schedule.js';
import { checkSavedGame } from '../../persistence/saveLoad.js';
import { hideAllScreens } from '../navigation.js';
import { updateTeamInfo, updateCurrentDate, showGamesToday, updateNavigationButtons } from './gameScreen.js';

export function initializeNewGame() {
    state.selectedTeam = null;
    state.currentDate = new Date('1993-10-05');
    initializeTeamStats();
    initializeSchedule();
    renderTeamSelection();
    checkSavedGame();
}

export function renderTeamSelection() {
    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = '';
    Object.keys(teams).forEach(teamName => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <h3>${teamName}</h3>
            <p>${teams[teamName].division} Division</p>
            <p>${teams[teamName].conference} Conference</p>
        `;
        teamCard.onclick = () => selectTeam(teamName, teamCard);
        teamGrid.appendChild(teamCard);
    });
}

export function selectTeam(teamName, cardElement) {
    state.selectedTeam = teamName;
    document.querySelectorAll('.team-card').forEach(card => card.classList.remove('selected'));
    cardElement.classList.add('selected');
    document.getElementById('startSeason').disabled = false;
}

export function startSeason() {
    if (!state.selectedTeam) return;
    hideAllScreens();
    document.getElementById('gameScreen').classList.add('active');
    updateTeamInfo();
    updateCurrentDate();
    showGamesToday();
    updateNavigationButtons();
}
