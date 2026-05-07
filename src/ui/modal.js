import { players } from '../data/players.js';
import { goalieStarters } from '../data/goalieStarters.js';
import { state } from '../state/gameState.js';
import { updateTeamStats, updatePlayerStatsForGame, updateGoalieStatsForGame } from '../engine/stats.js';
import { simulateRealisticGame } from '../engine/simulation.js';
import { advancePlayoffSeries } from '../engine/playoffs/playoffEngine.js';
import { updatePlayoffPlayerStats, updatePlayoffGoalieStats } from '../engine/playoffs/playoffStats.js';
import { showGamesToday, updateTeamInfo, updateNavigationButtons } from './season/gameScreen.js';
import { renderPlayoffView } from './playoffs/playoffScreen.js';

export function showModal(message, callback) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const modalButtons = document.getElementById('modalButtons');
    if (modalMessage) modalMessage.textContent = message;
    if (modalButtons) modalButtons.innerHTML = '';

    const okBtn = document.createElement('button');
    okBtn.className = 'btn';
    okBtn.textContent = 'OK';
    okBtn.onclick = () => { closeModal(); if (callback) callback(); };
    if (modalButtons) modalButtons.appendChild(okBtn);
    if (modal) modal.classList.add('show');
}

export function closeModal(event) {
    const modal = document.getElementById('modal');
    if (event && event.target === modal) {
        if (modal) modal.classList.remove('show');
    } else if (!event) {
        if (modal) modal.classList.remove('show');
    }
    setTimeout(() => {
        const modalContent = document.getElementById('modalContent');
        if (modalContent) {
            modalContent.innerHTML = `
                <p id="modalMessage">Message goes here.</p>
                <div id="modalButtons" class="modal-buttons">
                    <button class="btn" onclick="closeModal()">OK</button>
                </div>
            `;
        }
    }, 300);
}

function goalieInputHtml(teamName, prefix) {
    const goalies = players[teamName].goalies;
    let html = `<div id="${prefix}-goalieInputs" style="margin-top: 20px;"><h5>Goalies</h5>`;
    goalies.forEach(g => {
        html += `<div class="player-input-row"><span>${g.name} GA:</span><input type="number" id="${prefix}-ga-${g.name}" min="0" value="0"></div>`;
        html += `<div class="player-input-row"><span>${g.name} SA:</span><input type="number" id="${prefix}-sa-${g.name}" min="0" value="0"></div>`;
    });
    html += `</div>`;
    return html;
}

export function showPlayerStatsModal(game, userScore, opponentScore, userTeamName, opponentTeamName) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="player-stats-modal">
            <h3>Game stats: ${game.visitor} @ ${game.home}</h3>
            <div class="modal-buttons">
                <button class="btn" onclick="submitPlayerStatsFromModal(${userScore}, ${opponentScore}, '${userTeamName}', '${opponentTeamName}', '${game.visitor}', '${game.home}', 'regular')">Submit</button>
                <button class="btn" onclick="closeModal()">Cancel</button>
            </div>
            <div style="display:flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <h4>${userTeamName}s stats</h4>
                    <p>Goal: ${userScore}</p>
                    <div id="userGoalInputs"></div>
                    ${goalieInputHtml(userTeamName, 'user')}
                    <div id="userPimInputs" style="margin-top: 20px;"><h5>Penalty Minutes</h5></div>
                </div>
                <div style="flex: 1; min-width: 250px;">
                    <h4>${opponentTeamName}s stats</h4>
                    <p>Goal: ${opponentScore}</p>
                    <div id="opponentGoalInputs"></div>
                    ${goalieInputHtml(opponentTeamName, 'opponent')}
                    <div id="opponentPimInputs" style="margin-top: 20px;"><h5>Penalty Minutes</h5></div>
                </div>
            </div>
            </div>
        </div>
    `;

    const userSkaters = Object.values(players[userTeamName]).flat().map(p => p.name);
    const oppSkaters = Object.values(players[opponentTeamName]).flat().map(p => p.name);

    const userGoalDiv = document.getElementById('userGoalInputs');
    const userPimDiv = document.getElementById('userPimInputs');
    const oppGoalDiv = document.getElementById('opponentGoalInputs');
    const oppPimDiv = document.getElementById('opponentPimInputs');

    for (let i = 0; i < userScore; i++) {
        userGoalDiv.innerHTML += `<div class="goal-entry"><p>Goal ${i+1}:</p>
            <div class="player-input-row"><span>Scorer:</span><select id="user-goal-scorer-${i}">${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 1:</span><select id="user-assist1-${i}"><option value="">None</option>${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 2:</span><select id="user-assist2-${i}"><option value="">None</option>${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
        </div>`;
    }
    Object.values(players[userTeamName]).flat().forEach(p => {
        userPimDiv.innerHTML += `<div class="player-input-row"><span>${p.name}:</span><input type="number" id="user-pim-${p.name}" min="0" value="0"></div>`;
    });

    for (let i = 0; i < opponentScore; i++) {
        oppGoalDiv.innerHTML += `<div class="goal-entry"><p>Goal ${i+1}:</p>
            <div class="player-input-row"><span>Scorer:</span><select id="opponent-goal-scorer-${i}">${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 1:</span><select id="opponent-assist1-${i}"><option value="">None</option>${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 2:</span><select id="opponent-assist2-${i}"><option value="">None</option>${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
        </div>`;
    }
    Object.values(players[opponentTeamName]).flat().forEach(p => {
        oppPimDiv.innerHTML += `<div class="player-input-row"><span>${p.name}:</span><input type="number" id="opponent-pim-${p.name}" min="0" value="0"></div>`;
    });

    document.getElementById('modal').classList.add('show');
}

export function submitPlayerStatsFromModal(userScore, opponentScore, userTeamName, opponentTeamName, visitorTeam, homeTeam) {
    const userPlayerStats = {};
    Object.values(players[userTeamName]).flat().forEach(p => { userPlayerStats[p.name] = { goals: 0, assists: 0, pim: 0 }; });
    const opponentPlayerStats = {};
    Object.values(players[opponentTeamName]).flat().forEach(p => { opponentPlayerStats[p.name] = { goals: 0, assists: 0, pim: 0 }; });

    for (let i = 0; i < userScore; i++) {
        const scorer = document.getElementById(`user-goal-scorer-${i}`).value;
        const a1 = document.getElementById(`user-assist1-${i}`).value;
        const a2 = document.getElementById(`user-assist2-${i}`).value;
        if (scorer) {
            userPlayerStats[scorer].goals++;
            if (a1 && a1 !== scorer) userPlayerStats[a1].assists++;
            if (a2 && a2 !== scorer && a2 !== a1) userPlayerStats[a2].assists++;
        }
    }
    Object.values(players[userTeamName]).flat().forEach(p => {
        userPlayerStats[p.name].pim = parseInt(document.getElementById(`user-pim-${p.name}`).value) || 0;
    });

    for (let i = 0; i < opponentScore; i++) {
        const scorer = document.getElementById(`opponent-goal-scorer-${i}`).value;
        const a1 = document.getElementById(`opponent-assist1-${i}`).value;
        const a2 = document.getElementById(`opponent-assist2-${i}`).value;
        if (scorer) {
            opponentPlayerStats[scorer].goals++;
            if (a1 && a1 !== scorer) opponentPlayerStats[a1].assists++;
            if (a2 && a2 !== scorer && a2 !== a1) opponentPlayerStats[a2].assists++;
        }
    }
    Object.values(players[opponentTeamName]).flat().forEach(p => {
        opponentPlayerStats[p.name].pim = parseInt(document.getElementById(`opponent-pim-${p.name}`).value) || 0;
    });

    const gamesToday = state.allGames.filter(g => g.date.toDateString() === state.currentDate.toDateString());
    const game = gamesToday.find(g =>
        (g.home === homeTeam && g.visitor === visitorTeam) ||
        (g.home === visitorTeam && g.visitor === homeTeam)
    );

    if (game) {
        game.played = true;
        game.visitorScore = (game.visitor === userTeamName) ? userScore : opponentScore;
        game.homeScore = (game.home === userTeamName) ? userScore : opponentScore;
        updateTeamStats(game.visitor, game.home, game.visitorScore, game.homeScore);
        updatePlayerStatsForGame(userTeamName, userPlayerStats);
        updatePlayerStatsForGame(opponentTeamName, opponentPlayerStats);

        // Goalie stats from user input
        players[userTeamName].goalies.forEach(g => {
            const ga = parseInt(document.getElementById(`user-ga-${g.name}`)?.value) || 0;
            const sa = parseInt(document.getElementById(`user-sa-${g.name}`)?.value) || 0;
            if (ga > 0 || sa > 0) updateGoalieStatsForGame(userTeamName, g.name, ga, sa);
        });
        players[opponentTeamName].goalies.forEach(g => {
            const ga = parseInt(document.getElementById(`opponent-ga-${g.name}`)?.value) || 0;
            const sa = parseInt(document.getElementById(`opponent-sa-${g.name}`)?.value) || 0;
            if (ga > 0 || sa > 0) updateGoalieStatsForGame(opponentTeamName, g.name, ga, sa);
        });
    }

    closeModal();

    const gamesToSimulate = state.allGames.filter(g => g.date.toDateString() === state.currentDate.toDateString() && !g.played);
    gamesToSimulate.forEach(g => simulateRealisticGame(g));

    showGamesToday();
    updateTeamInfo();
    updateNavigationButtons();
}

export function showPlayoffPlayerStatsModal(series, score1, score2, userTeamName, oppTeamName, t1, t2, callback) {
    const userScore = userTeamName === t1 ? score1 : score2;
    const oppScore = userTeamName === t1 ? score2 : score1;
    window._playoffStatsCallback = callback || null;
    window._playoffCurrentSeries = series;

    const homeGames = [0, 1, 4, 6];
    const team1IsHome = homeGames.includes(series.games.length);
    const visitor = team1IsHome ? t2 : t1;
    const home    = team1IsHome ? t1 : t2;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="player-stats-modal">
            <h3>Game stats: ${visitor} @ ${home}</h3>
            <div class="modal-buttons">
                <button class="btn" onclick="submitPlayoffPlayerStats(${score1}, ${score2}, '${userTeamName}', '${oppTeamName}', '${t1}', '${t2}')">Submit</button>
                <button class="btn" onclick="closeModal()">Cancel</button>
            </div>
            <div style="display:flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <h4>${userTeamName} (${userScore})</h4>
                    <div id="playoff-userGoalInputs"></div>
                    ${goalieInputHtml(userTeamName, 'pu-goalie')}
                    <div id="playoff-userPimInputs" style="margin-top: 20px;"><h5>Penalty Minutes</h5></div>
                </div>
                <div style="flex: 1; min-width: 250px;">
                    <h4>${oppTeamName} (${oppScore})</h4>
                    <div id="playoff-oppGoalInputs"></div>
                    ${goalieInputHtml(oppTeamName, 'po-goalie')}
                    <div id="playoff-oppPimInputs" style="margin-top: 20px;"><h5>Penalty Minutes</h5></div>
                </div>
            </div>
            </div>
        </div>
    `;

    const userSkaters = Object.values(players[userTeamName]).flat().map(p => p.name);
    const oppSkaters = Object.values(players[oppTeamName]).flat().map(p => p.name);

    const userGoalDiv = document.getElementById('playoff-userGoalInputs');
    const oppGoalDiv = document.getElementById('playoff-oppGoalInputs');
    const userPimDiv = document.getElementById('playoff-userPimInputs');
    const oppPimDiv = document.getElementById('playoff-oppPimInputs');

    for (let i = 0; i < userScore; i++) {
        userGoalDiv.innerHTML += `<div class="goal-entry"><p>Goal ${i+1}:</p>
            <div class="player-input-row"><span>Scorer:</span><select id="pu-scorer-${i}">${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 1:</span><select id="pu-a1-${i}"><option value="">None</option>${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 2:</span><select id="pu-a2-${i}"><option value="">None</option>${userSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
        </div>`;
    }
    Object.values(players[userTeamName]).flat().forEach(p => {
        userPimDiv.innerHTML += `<div class="player-input-row"><span>${p.name}:</span><input type="number" id="pu-pim-${p.name}" min="0" value="0"></div>`;
    });

    for (let i = 0; i < oppScore; i++) {
        oppGoalDiv.innerHTML += `<div class="goal-entry"><p>Goal ${i+1}:</p>
            <div class="player-input-row"><span>Scorer:</span><select id="po-scorer-${i}">${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 1:</span><select id="po-a1-${i}"><option value="">None</option>${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
            <div class="player-input-row"><span>Assist 2:</span><select id="po-a2-${i}"><option value="">None</option>${oppSkaters.map(p=>`<option>${p}</option>`).join('')}</select></div>
        </div>`;
    }
    Object.values(players[oppTeamName]).flat().forEach(p => {
        oppPimDiv.innerHTML += `<div class="player-input-row"><span>${p.name}:</span><input type="number" id="po-pim-${p.name}" min="0" value="0"></div>`;
    });

    document.getElementById('modal').classList.add('show');
}

export function submitPlayoffPlayerStats(score1, score2, userTeamName, oppTeamName, t1, t2) {
    const userScore = userTeamName === t1 ? score1 : score2;
    const oppScore = userTeamName === t1 ? score2 : score1;

    const userStats = {};
    Object.values(players[userTeamName]).flat().forEach(p => { userStats[p.name] = { goals: 0, assists: 0, pim: 0 }; });
    const oppStats = {};
    Object.values(players[oppTeamName]).flat().forEach(p => { oppStats[p.name] = { goals: 0, assists: 0, pim: 0 }; });

    for (let i = 0; i < userScore; i++) {
        const sc = document.getElementById(`pu-scorer-${i}`)?.value;
        const a1 = document.getElementById(`pu-a1-${i}`)?.value;
        const a2 = document.getElementById(`pu-a2-${i}`)?.value;
        if (sc && userStats[sc]) userStats[sc].goals++;
        if (a1 && userStats[a1] && a1 !== sc) userStats[a1].assists++;
        if (a2 && userStats[a2] && a2 !== sc && a2 !== a1) userStats[a2].assists++;
    }
    Object.values(players[userTeamName]).flat().forEach(p => {
        if (userStats[p.name]) userStats[p.name].pim = parseInt(document.getElementById(`pu-pim-${p.name}`)?.value) || 0;
    });

    for (let i = 0; i < oppScore; i++) {
        const sc = document.getElementById(`po-scorer-${i}`)?.value;
        const a1 = document.getElementById(`po-a1-${i}`)?.value;
        const a2 = document.getElementById(`po-a2-${i}`)?.value;
        if (sc && oppStats[sc]) oppStats[sc].goals++;
        if (a1 && oppStats[a1] && a1 !== sc) oppStats[a1].assists++;
        if (a2 && oppStats[a2] && a2 !== sc && a2 !== a1) oppStats[a2].assists++;
    }
    Object.values(players[oppTeamName]).flat().forEach(p => {
        if (oppStats[p.name]) oppStats[p.name].pim = parseInt(document.getElementById(`po-pim-${p.name}`)?.value) || 0;
    });

    const series = window._playoffCurrentSeries;
    window._playoffCurrentSeries = null;
    advancePlayoffSeries(series, score1, score2, true);
    updatePlayoffPlayerStats(userTeamName, userStats);
    updatePlayoffPlayerStats(oppTeamName, oppStats);

    // Goalie stats from user input for playoffs
    players[userTeamName].goalies.forEach(g => {
        const ga = parseInt(document.getElementById(`pu-goalie-ga-${g.name}`)?.value) || 0;
        const sa = parseInt(document.getElementById(`pu-goalie-sa-${g.name}`)?.value) || 0;
        if (ga > 0 || sa > 0) updatePlayoffGoalieStats(userTeamName, { [g.name]: { gp: 1, ga, sa } });
    });
    players[oppTeamName].goalies.forEach(g => {
        const ga = parseInt(document.getElementById(`po-goalie-ga-${g.name}`)?.value) || 0;
        const sa = parseInt(document.getElementById(`po-goalie-sa-${g.name}`)?.value) || 0;
        if (ga > 0 || sa > 0) updatePlayoffGoalieStats(oppTeamName, { [g.name]: { gp: 1, ga, sa } });
    });

    closeModal();
    if (window._playoffStatsCallback) {
        window._playoffStatsCallback();
        window._playoffStatsCallback = null;
    } else {
        renderPlayoffView();
    }
}
