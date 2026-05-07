import { teams } from '../../data/teams.js';
import { goalieStarters } from '../../data/goalieStarters.js';
import { state } from '../../state/gameState.js';
import { hideAllScreens } from '../navigation.js';

export function showLeagueLeaders(filter = 'league', sortColumn, direction) {
    hideAllScreens();
    document.getElementById('playerStatsScreen').classList.add('active');
    state.currentFilter = filter;
    if (!state.leaderView) state.leaderView = 'skaters';
    if (sortColumn) {
        state.currentSortColumn = sortColumn;
        state.sortDirection = direction || 'desc';
    } else if (state.leaderView === 'goalies' && !['gp','ga','sa','svPct'].includes(state.currentSortColumn)) {
        state.currentSortColumn = 'svPct';
        state.sortDirection = 'desc';
    } else if (state.leaderView === 'skaters' && !['gp','goals','assists','points','pim'].includes(state.currentSortColumn)) {
        state.currentSortColumn = 'points';
        state.sortDirection = 'desc';
    }
    renderLeagueLeaders();
}

export function switchLeaderView(view) {
    state.leaderView = view;
    if (view === 'goalies') { state.currentSortColumn = 'svPct'; state.sortDirection = 'desc'; }
    else { state.currentSortColumn = 'points'; state.sortDirection = 'desc'; }
    renderLeagueLeaders();
}

export function renderLeagueLeaders() {
    const filter = state.currentFilter;

    // Update filter buttons
    document.querySelectorAll('.player-stats-filters button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`filter-${filter}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (state.leaderView === 'goalies') {
        renderGoalieLeaders(filter);
    } else {
        renderSkaterLeaders(filter);
    }

    // Update view toggle buttons
    document.querySelectorAll('.leader-view-toggle button').forEach(b => b.classList.remove('active'));
    const viewBtn = document.getElementById(`view-${state.leaderView}`);
    if (viewBtn) viewBtn.classList.add('active');
}

function getTeamsForFilter(filter) {
    if (filter === 'league') return Object.keys(teams);
    if (filter === 'eastern' || filter === 'western') return Object.keys(teams).filter(t => teams[t].conference.toLowerCase() === filter);
    if (filter === 'team' && state.selectedTeam) return [state.selectedTeam];
    return Object.keys(teams).filter(t => teams[t].division.toLowerCase() === filter);
}

function renderSkaterLeaders(filter) {
    let allPlayers = [];
    getTeamsForFilter(filter).forEach(teamName => {
        Object.keys(state.teamStats[teamName].playerStats).forEach(playerName => {
            allPlayers.push({ player: playerName, team: teamName, ...state.teamStats[teamName].playerStats[playerName] });
        });
    });

    allPlayers.sort((a, b) => {
        const dir = state.sortDirection === 'asc' ? -1 : 1;
        if (state.currentSortColumn === 'points') {
            if (b.points !== a.points) return (b.points - a.points) * dir;
            if (b.goals !== a.goals) return (b.goals - a.goals) * dir;
            return (b.assists - a.assists) * dir;
        }
        return (b[state.currentSortColumn] - a[state.currentSortColumn]) * dir;
    });

    const title = getTitle(filter);
    const sc = state.currentSortColumn;
    const sd = state.sortDirection;
    const arrow = col => col === sc ? (sd === 'desc' ? ' ▼' : ' ▲') : '';

    let html = `<h3 style="text-align: center; margin-bottom: 20px;">${title}</h3>
        <table class="player-stats-table"><thead><tr>
            <th>Player</th><th>Team</th>
            <th onclick="showLeagueLeaders(currentFilter, 'gp', currentSortColumn === 'gp' && sortDirection === 'desc' ? 'asc' : 'desc')">GP${arrow('gp')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'goals', currentSortColumn === 'goals' && sortDirection === 'desc' ? 'asc' : 'desc')">G${arrow('goals')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'assists', currentSortColumn === 'assists' && sortDirection === 'desc' ? 'asc' : 'desc')">A${arrow('assists')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'points', currentSortColumn === 'points' && sortDirection === 'desc' ? 'asc' : 'desc')">P${arrow('points')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'pim', currentSortColumn === 'pim' && sortDirection === 'desc' ? 'asc' : 'desc')">PIM${arrow('pim')}</th>
        </tr></thead><tbody>`;

    allPlayers.forEach(p => {
        html += `<tr><td>${p.player}</td><td>${p.team}</td><td>${p.gp}</td><td>${p.goals}</td><td>${p.assists}</td><td>${p.points}</td><td>${p.pim}</td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('playerStatsTable').innerHTML = html;
}

function renderGoalieLeaders(filter) {
    let allGoalies = [];
    getTeamsForFilter(filter).forEach(teamName => {
        if (!state.teamStats[teamName].goalieStats) return;
        Object.keys(state.teamStats[teamName].goalieStats).forEach(name => {
            const s = state.teamStats[teamName].goalieStats[name];
            if (s.gp > 0) {
                const svPct = s.sa > 0 ? ((s.sa - s.ga) / s.sa) : 0;
                allGoalies.push({ player: name, team: teamName, gp: s.gp, ga: s.ga, sa: s.sa, svPct });
            }
        });
    });

    allGoalies.sort((a, b) => {
        const dir = state.sortDirection === 'asc' ? -1 : 1;
        if (state.currentSortColumn === 'svPct') {
            return (b.svPct - a.svPct) * dir;
        }
        return (b[state.currentSortColumn] - a[state.currentSortColumn]) * dir;
    });

    const title = getTitle(filter).replace('Leaders', 'Goalie Leaders');
    const sc = state.currentSortColumn;
    const sd = state.sortDirection;
    const arrow = col => col === sc ? (sd === 'desc' ? ' ▼' : ' ▲') : '';

    let html = `<h3 style="text-align: center; margin-bottom: 20px;">${title}</h3>
        <table class="player-stats-table"><thead><tr>
            <th>Goalie</th><th>Team</th>
            <th onclick="showLeagueLeaders(currentFilter, 'gp', currentSortColumn === 'gp' && sortDirection === 'desc' ? 'asc' : 'desc')">GP${arrow('gp')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'ga', currentSortColumn === 'ga' && sortDirection === 'desc' ? 'asc' : 'desc')">GA${arrow('ga')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'sa', currentSortColumn === 'sa' && sortDirection === 'desc' ? 'asc' : 'desc')">SA${arrow('sa')}</th>
            <th onclick="showLeagueLeaders(currentFilter, 'svPct', currentSortColumn === 'svPct' && sortDirection === 'desc' ? 'asc' : 'desc')">SV%${arrow('svPct')}</th>
        </tr></thead><tbody>`;

    allGoalies.forEach(p => {
        html += `<tr><td>${p.player}</td><td>${p.team}</td><td>${p.gp}</td><td>${p.ga}</td><td>${p.sa}</td><td>${p.svPct.toFixed(3)}</td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('playerStatsTable').innerHTML = html;
}

function getTitle(filter) {
    if (filter === 'eastern' || filter === 'western') {
        const t = Object.keys(teams).find(t => teams[t].conference.toLowerCase() === filter);
        return `${teams[t]?.conference} Conference Leaders`;
    }
    if (filter === 'team' && state.selectedTeam) return `${state.selectedTeam} Player Stats`;
    if (filter !== 'league') return `${filter.charAt(0).toUpperCase() + filter.slice(1)} Division Leaders`;
    return 'League Leaders';
}
