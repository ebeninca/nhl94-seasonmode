import { state } from '../../state/gameState.js';
import { hideAllScreens } from '../navigation.js';

let playoffTDStatsView = 'skaters';
let playoffTDSortCol = 'points';
let playoffTDSortDir = 'desc';

export function showPlayoffTeamData() {
    hideAllScreens();
    document.getElementById('playoffTeamDataScreen').classList.add('active');
    switchPlayoffTeamDataTab('games');
}

export function switchPlayoffTeamDataTab(tab) {
    document.getElementById('playoffTeamDataGamesTab').classList.toggle('active', tab === 'games');
    document.getElementById('playoffTeamDataStatsTab').classList.toggle('active', tab === 'stats');
    const content = document.getElementById('playoffTeamDataContent');
    if (tab === 'games') {
        renderPlayoffTeamGames(content);
    } else {
        playoffTDStatsView = 'skaters';
        playoffTDSortCol = 'points';
        playoffTDSortDir = 'desc';
        renderPlayoffTeamStats(content);
    }
}

export function switchPlayoffTDStatsView(view) {
    playoffTDStatsView = view;
    playoffTDSortCol = view === 'skaters' ? 'points' : 'svPct';
    playoffTDSortDir = 'desc';
    renderPlayoffTeamStats(document.getElementById('playoffTeamDataContent'));
}

export function sortPlayoffTD(col) {
    if (playoffTDSortCol === col) {
        playoffTDSortDir = playoffTDSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        playoffTDSortCol = col;
        playoffTDSortDir = 'desc';
    }
    renderPlayoffTeamStats(document.getElementById('playoffTeamDataContent'));
}

function renderPlayoffTeamGames(container) {
    if (!state.selectedTeam || !state.playoffState) {
        container.innerHTML = '<p style="text-align:center; color:#ccc;">No playoff data available.</p>';
        return;
    }

    const team = state.selectedTeam;
    const roundNames = ['First Round', 'Conf. Semifinals', 'Conf. Finals', 'Stanley Cup Final'];
    const homeGames = [0, 1, 4, 6];
    const calendar = state.playoffState.calendar;

    // Helper to find date for a specific series + gameNum from calendar
    function getGameDate(series, gameNum) {
        const entry = calendar.find(e => e.series === series && e.gameNum === gameNum);
        return entry ? entry.date : null;
    }

    let html = `<h3 style="text-align:center; margin-bottom:10px;">${team} Playoff Game Log</h3>
        <table class="player-stats-table"><thead><tr>
            <th>#</th><th>Date</th><th>Round</th><th></th><th>Opponent</th><th>GF</th><th>GA</th><th>Result</th><th>Series</th>
        </tr></thead><tbody>`;

    let gameNum = 0;
    state.playoffState.rounds.forEach((round, ri) => {
        const series = round.find(s => s.team1 === team || s.team2 === team);
        if (!series) return;

        const isTeam1 = series.team1 === team;
        const opponent = isTeam1 ? series.team2 : series.team1;
        let seriesWins = 0, seriesLosses = 0;

        series.games.forEach((g, gi) => {
            gameNum++;
            const team1IsHome = homeGames.includes(gi);
            const isHome = isTeam1 ? team1IsHome : !team1IsHome;
            const atVs = isHome ? 'vs' : '@';
            const gf = isTeam1 ? g.score1 : g.score2;
            const ga = isTeam1 ? g.score2 : g.score1;
            const date = getGameDate(series, gi);
            const dateStr = date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';

            let result;
            if (gf > ga) { result = 'W'; seriesWins++; }
            else { result = 'L'; seriesLosses++; }

            const resultClass = result === 'W' ? 'color:#4CAF50;' : 'color:#e53935;';

            html += `<tr>
                <td style="text-align:center;">${gameNum}</td>
                <td>${dateStr}</td>
                <td>${roundNames[ri]}</td>
                <td style="text-align:center;">${atVs}</td>
                <td>${opponent}</td>
                <td style="text-align:center;">${gf}</td>
                <td style="text-align:center;">${ga}</td>
                <td style="text-align:center; font-weight:bold; ${resultClass}">${result}</td>
                <td style="text-align:center;">${seriesWins}-${seriesLosses}</td>
            </tr>`;
        });

        // Show remaining unplayed games in the series (if not finished)
        if (!series.winner) {
            const remaining = 7 - series.games.length;
            for (let gi = series.games.length; gi < series.games.length + remaining; gi++) {
                gameNum++;
                const team1IsHome = homeGames.includes(gi);
                const isHome = isTeam1 ? team1IsHome : !team1IsHome;
                const atVs = isHome ? 'vs' : '@';
                const date = getGameDate(series, gi);
                const dateStr = date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
                html += `<tr>
                    <td style="text-align:center;">${gameNum}</td>
                    <td>${dateStr}</td>
                    <td>${roundNames[ri]}</td>
                    <td style="text-align:center;">${atVs}</td>
                    <td>${opponent}</td>
                    <td></td><td></td><td></td><td></td>
                </tr>`;
            }
        }
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function renderPlayoffTeamStats(container) {
    if (!state.selectedTeam) return;
    const arrow = col => col === playoffTDSortCol ? (playoffTDSortDir === 'desc' ? ' ▼' : ' ▲') : '';

    let html = `<div style="display:flex; gap:10px; margin-bottom:15px; justify-content:center;">
        <button class="btn ${playoffTDStatsView === 'skaters' ? 'active' : ''}" onclick="switchPlayoffTDStatsView('skaters')">Skaters</button>
        <button class="btn ${playoffTDStatsView === 'goalies' ? 'active' : ''}" onclick="switchPlayoffTDStatsView('goalies')">Goalies</button>
    </div>`;

    if (playoffTDStatsView === 'skaters') {
        const stats = state.teamStats[state.selectedTeam].playoffStats || {};
        let players = [];
        Object.keys(stats).forEach(name => { players.push({ player: name, ...stats[name] }); });
        const dir = playoffTDSortDir === 'asc' ? -1 : 1;
        players.sort((a, b) => {
            if (playoffTDSortCol === 'points') {
                if (b.points !== a.points) return (b.points - a.points) * dir;
                if (b.goals !== a.goals) return (b.goals - a.goals) * dir;
                return (b.assists - a.assists) * dir;
            }
            return ((b[playoffTDSortCol] || 0) - (a[playoffTDSortCol] || 0)) * dir;
        });

        html += `<h3 style="text-align:center; margin-bottom:10px;">${state.selectedTeam} Playoff Skaters</h3>
            <table class="player-stats-table"><thead><tr>
                <th>#</th>
                <th style="text-align:left;">Player</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('gp')">GP${arrow('gp')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('goals')">G${arrow('goals')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('assists')">A${arrow('assists')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('points')">P${arrow('points')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('pim')">PIM${arrow('pim')}</th>
            </tr></thead><tbody>`;
        players.forEach((p, i) => {
            html += `<tr><td style="text-align:center;">${i+1}</td><td style="text-align:left;">${p.player}</td><td style="text-align:center;">${p.gp}</td><td style="text-align:center;">${p.goals}</td><td style="text-align:center;">${p.assists}</td><td style="text-align:center;">${p.points}</td><td style="text-align:center;">${p.pim}</td></tr>`;
        });
        html += `</tbody></table>`;
    } else {
        const goalieStats = state.teamStats[state.selectedTeam].playoffGoalieStats || {};
        let goalies = [];
        Object.keys(goalieStats).forEach(name => {
            const s = goalieStats[name];
            const svPct = s.sa > 0 ? ((s.sa - s.ga) / s.sa * 100) : 0;
            goalies.push({ player: name, ...s, svPct });
        });
        const dir = playoffTDSortDir === 'asc' ? -1 : 1;
        goalies.sort((a, b) => ((b[playoffTDSortCol] || 0) - (a[playoffTDSortCol] || 0)) * dir);

        html += `<h3 style="text-align:center; margin-bottom:10px;">${state.selectedTeam} Playoff Goalies</h3>
            <table class="player-stats-table"><thead><tr>
                <th>#</th>
                <th style="text-align:left;">Goalie</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('gp')">GP${arrow('gp')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('ga')">GA${arrow('ga')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('sa')">SA${arrow('sa')}</th>
                <th style="cursor:pointer;" onclick="sortPlayoffTD('svPct')">SV%${arrow('svPct')}</th>
            </tr></thead><tbody>`;
        goalies.forEach((g, i) => {
            html += `<tr><td style="text-align:center;">${i+1}</td><td style="text-align:left;">${g.player}</td><td style="text-align:center;">${g.gp}</td><td style="text-align:center;">${g.ga}</td><td style="text-align:center;">${g.sa}</td><td style="text-align:center;">${g.svPct.toFixed(1)}%</td></tr>`;
        });
        html += `</tbody></table>`;
    }
    container.innerHTML = html;
}
