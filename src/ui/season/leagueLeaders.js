import { teams } from '../../data/teams.js';
import { state } from '../../state/gameState.js';
import { hideAllScreens } from '../navigation.js';

export function showLeagueLeaders(filter = 'league', sortColumn = 'points', direction = 'desc') {
    hideAllScreens();
    document.getElementById('playerStatsScreen').classList.add('active');
    state.currentFilter = filter;
    state.currentSortColumn = sortColumn;
    state.sortDirection = direction;
    renderLeagueLeaders();
}

export function renderLeagueLeaders() {
    let allPlayers = [];
    const filter = state.currentFilter;

    if (filter === 'league') {
        Object.keys(teams).forEach(teamName => {
            Object.keys(state.teamStats[teamName].playerStats).forEach(playerName => {
                allPlayers.push({ player: playerName, team: teamName, ...state.teamStats[teamName].playerStats[playerName] });
            });
        });
    } else if (filter === 'eastern' || filter === 'western') {
        Object.keys(teams).filter(t => teams[t].conference.toLowerCase() === filter).forEach(teamName => {
            Object.keys(state.teamStats[teamName].playerStats).forEach(playerName => {
                allPlayers.push({ player: playerName, team: teamName, ...state.teamStats[teamName].playerStats[playerName] });
            });
        });
    } else if (filter === 'team' && state.selectedTeam) {
        Object.keys(state.teamStats[state.selectedTeam].playerStats).forEach(playerName => {
            allPlayers.push({ player: playerName, team: state.selectedTeam, ...state.teamStats[state.selectedTeam].playerStats[playerName] });
        });
    } else {
        Object.keys(teams).filter(t => teams[t].division.toLowerCase() === filter).forEach(teamName => {
            Object.keys(state.teamStats[teamName].playerStats).forEach(playerName => {
                allPlayers.push({ player: playerName, team: teamName, ...state.teamStats[teamName].playerStats[playerName] });
            });
        });
    }

    allPlayers.sort((a, b) => {
        const dir = state.sortDirection === 'asc' ? -1 : 1;
        if (state.currentSortColumn === 'points') {
            if (b.points !== a.points) return (b.points - a.points) * dir;
            if (b.goals !== a.goals) return (b.goals - a.goals) * dir;
            return (b.assists - a.assists) * dir;
        }
        return (b[state.currentSortColumn] - a[state.currentSortColumn]) * dir;
    });

    let title = 'League Leaders';
    if (filter === 'eastern' || filter === 'western') {
        title = `${teams[Object.keys(teams).find(t => teams[t].conference.toLowerCase() === filter)]?.conference} Conference Leaders`;
    } else if (filter === 'team' && state.selectedTeam) {
        title = `${state.selectedTeam} Player Stats`;
    } else if (filter !== 'league') {
        title = `${filter.charAt(0).toUpperCase() + filter.slice(1)} Division Leaders`;
    }

    document.querySelectorAll('.player-stats-filters button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`filter-${filter}`);
    if (activeBtn) activeBtn.classList.add('active');

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
