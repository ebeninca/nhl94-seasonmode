import { teams, teamNameHtml } from '../../data/teams.js';
import { state } from '../../state/gameState.js';
import { hideAllScreens } from '../navigation.js';

function getStandingsSorted(teamList) {
    return [...teamList].sort((a, b) => {
        const aS = state.teamStats[a], bS = state.teamStats[b];
        if (bS.points !== aS.points) return bS.points - aS.points;
        if (bS.wins !== aS.wins) return bS.wins - aS.wins;
        return (bS.goalsFor - bS.goalsAgainst) - (aS.goalsFor - aS.goalsAgainst);
    });
}

function getClinchIndicators() {
    const indicators = {};
    const divisions = ['Northeast', 'Atlantic', 'Central', 'Pacific'];

    // Division leaders and playoff qualifiers (top 4 per division)
    const divLeaders = {};
    divisions.forEach(div => {
        const divTeams = Object.keys(teams).filter(t => teams[t].division === div);
        const sorted = getStandingsSorted(divTeams);
        const top4 = sorted.slice(0, 4);
        top4.forEach(t => { indicators[t] = (indicators[t] || '') + 'x'; });
        divLeaders[div] = sorted[0];
        indicators[sorted[0]] = 'y'; // clinched division (overrides x)
    });

    // Conference leaders
    ['Eastern', 'Western'].forEach(conf => {
        const confTeams = Object.keys(teams).filter(t => teams[t].conference === conf);
        const sorted = getStandingsSorted(confTeams);
        if (sorted[0]) {
            indicators[sorted[0]] = 'z'; // clinched conference (overrides y)
        }
    });

    // Presidents' Trophy: best record in the league
    const allSorted = getStandingsSorted(Object.keys(teams));
    if (allSorted[0]) {
        indicators[allSorted[0]] = 'p'; // overrides all
    }

    return indicators;
}

export function showStandings() {
    hideAllScreens();
    document.getElementById('standingsScreen').classList.add('active');
    showStandingsBy('league');
}

export function showStandingsBy(filter) {
    let teamsToShow = [];
    let title = '';

    switch(filter) {
        case 'league': teamsToShow = Object.keys(teams); title = 'Standings'; break;
        case 'eastern': teamsToShow = Object.keys(teams).filter(t => teams[t].conference === 'Eastern'); title = 'Eastern Conference Standings'; break;
        case 'western': teamsToShow = Object.keys(teams).filter(t => teams[t].conference === 'Western'); title = 'Western Conference Standings'; break;
        case 'atlantic': teamsToShow = Object.keys(teams).filter(t => teams[t].division === 'Atlantic'); title = 'Atlantic Division Standings'; break;
        case 'northeast': teamsToShow = Object.keys(teams).filter(t => teams[t].division === 'Northeast'); title = 'Northeast Division Standings'; break;
        case 'central': teamsToShow = Object.keys(teams).filter(t => teams[t].division === 'Central'); title = 'Central Division Standings'; break;
        case 'pacific': teamsToShow = Object.keys(teams).filter(t => teams[t].division === 'Pacific'); title = 'Pacific Division Standings'; break;
    }

    document.querySelectorAll('#standingsScreen .btn').forEach(b => b.classList.remove('active'));
    const activeButton = document.getElementById(`filter-${filter}`);
    if (activeButton) activeButton.classList.add('active');

    teamsToShow.sort((a, b) => {
        const aS = state.teamStats[a], bS = state.teamStats[b];
        if (bS.points !== aS.points) return bS.points - aS.points;
        if (bS.wins !== aS.wins) return bS.wins - aS.wins;
        return (bS.goalsFor - bS.goalsAgainst) - (aS.goalsFor - aS.goalsAgainst);
    });

    const indicators = getClinchIndicators();

    let html = `<h3 style="text-align: center; margin-bottom: 20px;">${title}</h3>
        <table class="standings-table"><thead><tr>
            <th>Rank</th><th>Team</th><th>GP</th><th>W</th><th>L</th><th>T</th><th>PTS</th><th>GF</th><th>GA</th><th>+/-</th>
        </tr></thead><tbody>`;

    teamsToShow.forEach((team, index) => {
        const s = state.teamStats[team];
        const gp = s.wins + s.losses + s.ties;
        const gd = s.goalsFor - s.goalsAgainst;
        const cls = team === state.selectedTeam ? 'user-team-row' : '';
        const ind = indicators[team] ? ` <span style="color:#FFD700; font-weight:bold;">${indicators[team]}</span>` : '';
        html += `<tr class="${cls}"><td>${index+1}</td><td>${teamNameHtml(team)}${ind}</td><td>${gp}</td><td>${s.wins}</td><td>${s.losses}</td><td>${s.ties}</td><td>${s.points}</td><td>${s.goalsFor}</td><td>${s.goalsAgainst}</td><td>${gd >= 0 ? '+' : ''}${gd}</td></tr>`;
    });

    html += `</tbody></table>
    <div style="margin-top:15px; font-size:0.85em; color:#ccc; text-align:center;">
        <strong>p</strong> - Presidents' Trophy &nbsp;|&nbsp; <strong>z</strong> - Clinched Conference &nbsp;|&nbsp; <strong>y</strong> - Clinched Division &nbsp;|&nbsp; <strong>x</strong> - Clinched Playoff Spot
    </div>`;
    document.getElementById('standingsTable').innerHTML = html;
}
