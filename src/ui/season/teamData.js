import { state } from '../../state/gameState.js';
import { hideAllScreens } from '../navigation.js';

let teamDataStatsView = 'skaters';
let teamDataSortCol = 'points';
let teamDataSortDir = 'desc';

export function showTeamData() {
    hideAllScreens();
    document.getElementById('teamDataScreen').classList.add('active');
    switchTeamDataTab('stats');
}

export function switchTeamDataTab(tab) {
    document.getElementById('teamDataGamesTab').classList.toggle('active', tab === 'games');
    document.getElementById('teamDataStatsTab').classList.toggle('active', tab === 'stats');
    const content = document.getElementById('teamDataContent');
    if (tab === 'games') {
        content.innerHTML = '<p style="text-align:center; color:#ccc;">Coming soon.</p>';
    } else {
        teamDataStatsView = 'skaters';
        teamDataSortCol = 'points';
        teamDataSortDir = 'desc';
        renderTeamPlayerStats();
    }
}

export function switchTeamDataStatsView(view) {
    teamDataStatsView = view;
    teamDataSortCol = view === 'skaters' ? 'points' : 'svPct';
    teamDataSortDir = 'desc';
    renderTeamPlayerStats();
}

export function sortTeamData(col) {
    if (teamDataSortCol === col) {
        teamDataSortDir = teamDataSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        teamDataSortCol = col;
        teamDataSortDir = 'desc';
    }
    renderTeamPlayerStats();
}

function renderTeamPlayerStats() {
    if (!state.selectedTeam) return;
    const container = document.getElementById('teamDataContent');
    const arrow = col => col === teamDataSortCol ? (teamDataSortDir === 'desc' ? ' ▼' : ' ▲') : '';

    let html = `<div style="display:flex; gap:10px; margin-bottom:15px; justify-content:center;">
        <button class="btn ${teamDataStatsView === 'skaters' ? 'active' : ''}" onclick="switchTeamDataStatsView('skaters')">Skaters</button>
        <button class="btn ${teamDataStatsView === 'goalies' ? 'active' : ''}" onclick="switchTeamDataStatsView('goalies')">Goalies</button>
    </div>`;

    if (teamDataStatsView === 'skaters') {
        const stats = state.teamStats[state.selectedTeam].playerStats;
        let players = [];
        Object.keys(stats).forEach(name => { players.push({ player: name, ...stats[name] }); });
        const dir = teamDataSortDir === 'asc' ? -1 : 1;
        players.sort((a, b) => {
            if (teamDataSortCol === 'points') {
                if (b.points !== a.points) return (b.points - a.points) * dir;
                if (b.goals !== a.goals) return (b.goals - a.goals) * dir;
                return (b.assists - a.assists) * dir;
            }
            return ((b[teamDataSortCol] || 0) - (a[teamDataSortCol] || 0)) * dir;
        });

        html += `<h3 style="text-align:center; margin-bottom:10px;">${state.selectedTeam} Skaters</h3>
            <table class="player-stats-table"><thead><tr>
                <th>#</th>
                <th style="text-align:left;">Player</th>
                <th style="cursor:pointer;" onclick="sortTeamData('gp')">GP${arrow('gp')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('goals')">G${arrow('goals')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('assists')">A${arrow('assists')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('points')">P${arrow('points')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('pim')">PIM${arrow('pim')}</th>
            </tr></thead><tbody>`;
        players.forEach((p, i) => {
            html += `<tr><td style="text-align:center;">${i+1}</td><td style="text-align:left;">${p.player}</td><td style="text-align:center;">${p.gp}</td><td style="text-align:center;">${p.goals}</td><td style="text-align:center;">${p.assists}</td><td style="text-align:center;">${p.points}</td><td style="text-align:center;">${p.pim}</td></tr>`;
        });
        html += `</tbody></table>`;
    } else {
        const goalieStats = state.teamStats[state.selectedTeam].goalieStats || {};
        let goalies = [];
        Object.keys(goalieStats).forEach(name => {
            const s = goalieStats[name];
            const svPct = s.sa > 0 ? ((s.sa - s.ga) / s.sa * 100) : 0;
            goalies.push({ player: name, ...s, svPct });
        });
        const dir = teamDataSortDir === 'asc' ? -1 : 1;
        goalies.sort((a, b) => ((b[teamDataSortCol] || 0) - (a[teamDataSortCol] || 0)) * dir);

        html += `<h3 style="text-align:center; margin-bottom:10px;">${state.selectedTeam} Goalies</h3>
            <table class="player-stats-table"><thead><tr>
                <th>#</th>
                <th style="text-align:left;">Goalie</th>
                <th style="cursor:pointer;" onclick="sortTeamData('gp')">GP${arrow('gp')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('ga')">GA${arrow('ga')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('sa')">SA${arrow('sa')}</th>
                <th style="cursor:pointer;" onclick="sortTeamData('svPct')">SV%${arrow('svPct')}</th>
            </tr></thead><tbody>`;
        goalies.forEach((g, i) => {
            html += `<tr><td style="text-align:center;">${i+1}</td><td style="text-align:left;">${g.player}</td><td style="text-align:center;">${g.gp}</td><td style="text-align:center;">${g.ga}</td><td style="text-align:center;">${g.sa}</td><td style="text-align:center;">${g.svPct.toFixed(1)}%</td></tr>`;
        });
        html += `</tbody></table>`;
    }
    container.innerHTML = html;
}
