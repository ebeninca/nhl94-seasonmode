import { state } from '../../state/gameState.js';
import { simulateRealisticGame } from '../../engine/simulation.js';
import { showModal, showPlayerStatsModal } from '../modal.js';
import { showSeasonOverScreen } from '../navigation.js';
import { teamNameHtml } from '../../data/teams.js';

export function updateTeamInfo() {
    const teamInfo = document.getElementById('teamInfo');
    const stats = state.teamStats[state.selectedTeam];
    teamInfo.innerHTML = `
        <h4>${state.selectedTeam}</h4>
        <p><strong>Record:</strong> ${stats.wins}-${stats.losses}-${stats.ties}</p>
        <p><strong>Points:</strong> ${stats.points}</p>
        <p><strong>GF:</strong> ${stats.goalsFor}</p>
        <p><strong>GA:</strong> ${stats.goalsAgainst}</p>
    `;
}

export function updateCurrentDate() {
    const dateStr = state.currentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('currentDate').textContent = dateStr;
}

export function showGamesToday() {
    const container = document.getElementById('gamesToday');
    container.innerHTML = '';

    const gamesToday = state.allGames.filter(game =>
        game.date.toDateString() === state.currentDate.toDateString()
    );

    if (gamesToday.length === 0) {
        container.innerHTML = '<p>No games today</p>';
        return;
    }

    const allMyGamesPlayed = state.allGames
        .filter(game => game.visitor === state.selectedTeam || game.home === state.selectedTeam)
        .every(game => game.played);

    gamesToday.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-item';
        const isUserGame = game.visitor === state.selectedTeam || game.home === state.selectedTeam;
        if (isUserGame) gameDiv.classList.add('user-game');

        if (game.played) {
            gameDiv.innerHTML = `
                <div>${teamNameHtml(game.visitor)} @ ${teamNameHtml(game.home)}</div>
                <div>Final: ${game.visitorScore} - ${game.homeScore}</div>
            `;
        } else if (isUserGame && !allMyGamesPlayed) {
            gameDiv.innerHTML = `
                <div>${teamNameHtml(game.visitor)} @ ${teamNameHtml(game.home)}</div>
                <div>
                    <input type="number" class="score-input" id="regular-visitor-${index}" min="0" max="20" placeholder="0">
                    -
                    <input type="number" class="score-input" id="regular-home-${index}" min="0" max="20" placeholder="0">
                    <button class="btn" onclick="submitGameWrapper('regular', ${index})">Submit</button>
                    <button class="btn" onclick="simulateMyGame('${game.visitor}', '${game.home}')">Simulate My Game</button>
                </div>
            `;
        } else {
            gameDiv.innerHTML = `
                <div>${teamNameHtml(game.visitor)} @ ${teamNameHtml(game.home)}</div>
                <div><em>Will be simulated</em></div>
            `;
        }
        container.appendChild(gameDiv);
    });
}

export function submitGameWrapper(type, index) {
    const gamesToday = state.allGames.filter(game =>
        game.date.toDateString() === state.currentDate.toDateString()
    );
    const game = gamesToday[index];
    const visitorScore = parseInt(document.getElementById(`${type}-visitor-${index}`).value) || 0;
    const homeScore = parseInt(document.getElementById(`${type}-home-${index}`).value) || 0;

    const userTeamName = state.selectedTeam;
    const opponentTeamName = game.visitor === userTeamName ? game.home : game.visitor;
    const userTeamScore = game.visitor === userTeamName ? visitorScore : homeScore;
    const opponentTeamScore = game.visitor === userTeamName ? homeScore : visitorScore;

    showPlayerStatsModal(game, userTeamScore, opponentTeamScore, userTeamName, opponentTeamName);
}

export function previousDate() {
    let prevGameDate = null;
    for (let i = state.allGames.length - 1; i >= 0; i--) {
        if (state.allGames[i].date.getTime() < state.currentDate.getTime()) {
            prevGameDate = state.allGames[i].date;
            break;
        }
    }
    if (prevGameDate) {
        state.currentDate = new Date(prevGameDate);
        updateCurrentDate();
        showGamesToday();
        updateNavigationButtons();
    }
}

export function nextDate() {
    const userGameToday = state.allGames.find(g =>
        g.date.toDateString() === state.currentDate.toDateString() &&
        !g.played &&
        (g.visitor === state.selectedTeam || g.home === state.selectedTeam)
    );

    if (userGameToday) {
        showModal('Please submit your game result before advancing.');
        return;
    }

    const gamesToSimulate = state.allGames.filter(g => g.date.toDateString() === state.currentDate.toDateString() && !g.played);
    gamesToSimulate.forEach(g => simulateRealisticGame(g));

    const nextGameDate = state.allGames.find(game => game.date.getTime() > state.currentDate.getTime())?.date;

    if (nextGameDate) {
        state.currentDate = new Date(nextGameDate);
        updateCurrentDate();
        showGamesToday();
        updateTeamInfo();
    } else {
        state.seasonOver = true;
        state.currentDate = new Date(state.currentDate.setDate(state.currentDate.getDate() + 1));
        showSeasonOverScreen();
        return;
    }
    updateNavigationButtons();
}

export function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevDateBtn');
    const nextBtn = document.getElementById('nextDateBtn');

    const userGameToday = state.allGames.find(g =>
        g.date.toDateString() === state.currentDate.toDateString() &&
        !g.played &&
        (g.visitor === state.selectedTeam || g.home === state.selectedTeam)
    );
    nextBtn.disabled = !!userGameToday;

    const firstGameDate = state.allGames[0].date;
    prevBtn.disabled = state.currentDate.getTime() <= firstGameDate.getTime();
}

export function simulateMyGame(visitor, home) {
    const game = state.allGames.find(g =>
        g.date.toDateString() === state.currentDate.toDateString() &&
        (g.visitor === visitor || g.home === home)
    );
    if (game) {
        simulateRealisticGame(game);
        const gamesToSimulate = state.allGames.filter(g => g.date.toDateString() === state.currentDate.toDateString() && !g.played);
        gamesToSimulate.forEach(g => simulateRealisticGame(g));
        showGamesToday();
        updateTeamInfo();
        updateNavigationButtons();
    }
}
