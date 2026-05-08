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
            gameDiv.classList.add('played');
            gameDiv.innerHTML = `
                <div>${teamNameHtml(game.visitor)} @ ${teamNameHtml(game.home)}</div>
                <div>Final: ${game.visitorScore} - ${game.homeScore}</div>
            `;
            gameDiv.onclick = () => showGameRawStats(game);
        } else if (!state.viewOnly && isUserGame && !allMyGamesPlayed) {
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
                <div><em>${state.viewOnly ? 'Not played' : 'Will be simulated'}</em></div>
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

    if (state.viewOnly) {
        nextBtn.disabled = false;
        const firstGameDate = state.allGames[0].date;
        prevBtn.disabled = state.currentDate.getTime() <= firstGameDate.getTime();
        // Hide action buttons in view-only mode
        document.querySelectorAll('#gameScreen .main-panel > div:first-child .btn').forEach(btn => {
            if (btn !== prevBtn && btn !== nextBtn) btn.style.display = 'none';
        });
        return;
    }

    // Show all buttons in normal mode
    document.querySelectorAll('#gameScreen .main-panel > div:first-child .btn').forEach(btn => {
        btn.style.display = '';
    });

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

export function showGameRawStats(game) {
    if (!game.rawStats) {
        const modal = document.getElementById('modal');
        document.getElementById('modalContent').innerHTML = `
            <p>No detailed stats available for this game.</p>
            <div class="modal-buttons"><button class="btn" onclick="closeModal()">Close</button></div>
        `;
        modal.classList.add('show');
        return;
    }

    const raw = game.rawStats;
    const renderPlayerStats = (stats) => {
        if (!stats || Object.keys(stats).length === 0) return '<p style="color:#999;">No scoring</p>';
        let html = '<table style="width:100%; font-size:0.85em;"><tr><th style="text-align:left;">Player</th><th>G</th><th>A</th><th>PIM</th></tr>';
        for (const [name, s] of Object.entries(stats)) {
            html += `<tr><td style="text-align:left;">${name}</td><td style="text-align:center;">${s.goals || 0}</td><td style="text-align:center;">${s.assists || 0}</td><td style="text-align:center;">${s.pim || 0}</td></tr>`;
        }
        html += '</table>';
        return html;
    };

    const renderGoalieStats = (side) => {
        if (side.goalie) {
            return `<p><strong>Goalie:</strong> ${side.goalie} — GA: ${side.goalsAgainst}, SA: ${side.shotsAgainst}</p>`;
        }
        if (side.goalies && Object.keys(side.goalies).length > 0) {
            let html = '';
            for (const [name, s] of Object.entries(side.goalies)) {
                html += `<p><strong>${name}:</strong> GA: ${s.ga}, SA: ${s.sa}</p>`;
            }
            return html;
        }
        return '';
    };

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="player-stats-modal">
            <h3>Game stats: ${teamNameHtml(game.visitor)} ${game.visitorScore} - ${game.homeScore} ${teamNameHtml(game.home)}</h3>
            <div class="modal-buttons"><button class="btn" disabled>Submit</button><button class="btn" onclick="closeModal()">Close</button></div>
            <div style="display:flex; justify-content:space-around; flex-wrap:wrap; gap:20px; margin-top:15px;">
                <div style="flex:1; min-width:250px;">
                    <h4>${game.visitor}</h4>
                    ${renderPlayerStats(raw.visitor.playerStats)}
                    ${renderGoalieStats(raw.visitor)}
                </div>
                <div style="flex:1; min-width:250px;">
                    <h4>${game.home}</h4>
                    ${renderPlayerStats(raw.home.playerStats)}
                    ${renderGoalieStats(raw.home)}
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').classList.add('show');
}
