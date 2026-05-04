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

export function sortPlayoffLeaders(col) {
    if (state.playoffSortCol === col) {
        state.playoffSortDir = state.playoffSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        state.playoffSortCol = col;
        state.playoffSortDir = 'desc';
    }
    renderPlayoffLeaders();
}

export function renderPlayoffLeaders() {
    let allPlayers = [];
    const playoffTeams = new Set();
    if (state.playoffState) {
        state.playoffState.rounds.forEach(round => {
            round.forEach(s => { playoffTeams.add(s.team1); playoffTeams.add(s.team2); });
        });
    }

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
    document.getElementById('playoffStatsTable').innerHTML = html;
}
