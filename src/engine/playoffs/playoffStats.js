import { state } from '../../state/gameState.js';

export function updatePlayoffPlayerStats(teamName, playerStats) {
    Object.keys(playerStats).forEach(player => {
        if (state.teamStats[teamName].playoffStats && state.teamStats[teamName].playoffStats[player]) {
            state.teamStats[teamName].playoffStats[player].gp++;
            state.teamStats[teamName].playoffStats[player].goals += playerStats[player].goals;
            state.teamStats[teamName].playoffStats[player].assists += playerStats[player].assists;
            state.teamStats[teamName].playoffStats[player].points += playerStats[player].goals + playerStats[player].assists;
            state.teamStats[teamName].playoffStats[player].pim += playerStats[player].pim;
        }
    });
}

export function updatePlayoffGoalieStats(teamName, goalieStats) {
    if (!state.teamStats[teamName].playoffGoalieStats) state.teamStats[teamName].playoffGoalieStats = {};
    Object.keys(goalieStats).forEach(name => {
        if (!state.teamStats[teamName].playoffGoalieStats[name]) {
            state.teamStats[teamName].playoffGoalieStats[name] = { gp: 0, ga: 0, sa: 0 };
        }
        state.teamStats[teamName].playoffGoalieStats[name].gp += goalieStats[name].gp;
        state.teamStats[teamName].playoffGoalieStats[name].ga += goalieStats[name].ga;
        state.teamStats[teamName].playoffGoalieStats[name].sa += goalieStats[name].sa;
    });
}

export function sortPlayoffLeaders(col) {
    if (state.playoffSortCol === col) {
        state.playoffSortDir = state.playoffSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        state.playoffSortCol = col;
        state.playoffSortDir = 'desc';
    }
    renderPlayoffLeaders();
}

export function switchPlayoffLeaderView(view) {
    state.playoffLeaderView = view;
    if (view === 'goalies') { state.playoffSortCol = 'svPct'; state.playoffSortDir = 'desc'; }
    else { state.playoffSortCol = 'points'; state.playoffSortDir = 'desc'; }
    renderPlayoffLeaders();
}

function getPlayoffTeams() {
    const playoffTeams = new Set();
    if (state.playoffState) {
        state.playoffState.rounds.forEach(round => {
            round.forEach(s => { playoffTeams.add(s.team1); playoffTeams.add(s.team2); });
        });
    }
    return playoffTeams;
}

export function renderPlayoffLeaders() {
    if (!state.playoffLeaderView) state.playoffLeaderView = 'skaters';

    const container = document.getElementById('playoffStatsTable');

    // Toggle buttons
    let toggleHtml = `<div class="leader-view-toggle" style="display:flex; gap:10px; justify-content:center; margin-bottom:20px;">
        <button class="btn ${state.playoffLeaderView === 'skaters' ? 'active' : ''}" onclick="switchPlayoffLeaderView('skaters')">Skaters</button>
        <button class="btn ${state.playoffLeaderView === 'goalies' ? 'active' : ''}" onclick="switchPlayoffLeaderView('goalies')">Goalies</button>
    </div>`;

    if (state.playoffLeaderView === 'goalies') {
        container.innerHTML = toggleHtml + renderPlayoffGoalieTable();
    } else {
        container.innerHTML = toggleHtml + renderPlayoffSkaterTable();
    }
}

function renderPlayoffSkaterTable() {
    let allPlayers = [];
    const playoffTeams = getPlayoffTeams();

    playoffTeams.forEach(teamName => {
        if (!state.teamStats[teamName].playoffStats) return;
        Object.keys(state.teamStats[teamName].playoffStats).forEach(playerName => {
            const stats = state.teamStats[teamName].playoffStats[playerName];
            if (stats.gp > 0) allPlayers.push({ player: playerName, team: teamName, ...stats });
        });
    });

    allPlayers.sort((a, b) => {
        const dir = state.playoffSortDir === 'asc' ? -1 : 1;
        if (state.playoffSortCol === 'points') {
            if (b.points !== a.points) return (b.points - a.points) * dir;
            if (b.goals !== a.goals) return (b.goals - a.goals) * dir;
            return (b.assists - a.assists) * dir;
        }
        return (b[state.playoffSortCol] - a[state.playoffSortCol]) * dir;
    });

    const arrow = col => col === state.playoffSortCol ? (state.playoffSortDir === 'desc' ? ' ▼' : ' ▲') : '';

    let html = `<h3 style="text-align:center; margin-bottom:20px;">Playoff Leaders</h3>
        <table class="player-stats-table"><thead><tr>
            <th>Player</th><th>Team</th>
            <th onclick="sortPlayoffLeaders('gp')" style="cursor:pointer;">GP${arrow('gp')}</th>
            <th onclick="sortPlayoffLeaders('goals')" style="cursor:pointer;">G${arrow('goals')}</th>
            <th onclick="sortPlayoffLeaders('assists')" style="cursor:pointer;">A${arrow('assists')}</th>
            <th onclick="sortPlayoffLeaders('points')" style="cursor:pointer;">P${arrow('points')}</th>
            <th onclick="sortPlayoffLeaders('pim')" style="cursor:pointer;">PIM${arrow('pim')}</th>
        </tr></thead><tbody>`;
    allPlayers.forEach(p => {
        html += `<tr><td>${p.player}</td><td>${p.team}</td><td>${p.gp}</td><td>${p.goals}</td><td>${p.assists}</td><td>${p.points}</td><td>${p.pim}</td></tr>`;
    });
    html += `</tbody></table>`;
    return html;
}

function renderPlayoffGoalieTable() {
    let allGoalies = [];
    const playoffTeams = getPlayoffTeams();

    playoffTeams.forEach(teamName => {
        if (!state.teamStats[teamName].playoffGoalieStats) return;
        Object.keys(state.teamStats[teamName].playoffGoalieStats).forEach(name => {
            const s = state.teamStats[teamName].playoffGoalieStats[name];
            if (s.gp > 0) {
                const svPct = s.sa > 0 ? ((s.sa - s.ga) / s.sa) : 0;
                allGoalies.push({ player: name, team: teamName, gp: s.gp, ga: s.ga, sa: s.sa, svPct });
            }
        });
    });

    allGoalies.sort((a, b) => {
        const dir = state.playoffSortDir === 'asc' ? -1 : 1;
        if (state.playoffSortCol === 'svPct') return (b.svPct - a.svPct) * dir;
        return (b[state.playoffSortCol] - a[state.playoffSortCol]) * dir;
    });

    const arrow = col => col === state.playoffSortCol ? (state.playoffSortDir === 'desc' ? ' ▼' : ' ▲') : '';

    let html = `<h3 style="text-align:center; margin-bottom:20px;">Playoff Goalie Leaders</h3>
        <table class="player-stats-table"><thead><tr>
            <th>Goalie</th><th>Team</th>
            <th onclick="sortPlayoffLeaders('gp')" style="cursor:pointer;">GP${arrow('gp')}</th>
            <th onclick="sortPlayoffLeaders('ga')" style="cursor:pointer;">GA${arrow('ga')}</th>
            <th onclick="sortPlayoffLeaders('sa')" style="cursor:pointer;">SA${arrow('sa')}</th>
            <th onclick="sortPlayoffLeaders('svPct')" style="cursor:pointer;">SV%${arrow('svPct')}</th>
        </tr></thead><tbody>`;
    allGoalies.forEach(p => {
        html += `<tr><td>${p.player}</td><td>${p.team}</td><td>${p.gp}</td><td>${p.ga}</td><td>${p.sa}</td><td>${p.svPct.toFixed(3)}</td></tr>`;
    });
    html += `</tbody></table>`;
    return html;
}
