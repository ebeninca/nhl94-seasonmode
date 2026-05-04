import { state } from '../../state/gameState.js';
import { abbr } from '../../data/teams.js';

export function renderPlayoffBracket() {
    if (!state.playoffState) return;
    const container = document.getElementById('playoffBracket');
    if (!container) return;

    const allRounds = [[], [], [], []];
    state.playoffState.rounds.forEach((round, ri) => { allRounds[ri] = round; });

    const roundNames = ['First Round', 'Conf. Semifinals', 'Conf. Finals'];

    function colHtml(conf, ri) {
        const round = allRounds[ri];
        const confSeries = round ? round.filter(s => s.conf === conf) : [];
        const slots = [4, 2, 1][ri];
        const label = roundNames[ri];
        let html = `<div class="bracket-col"><div class="bracket-col-label">${label}</div>`;
        for (let si = 0; si < slots; si++) {
            const s = confSeries[si] || null;
            html += s ? renderSeriesCard(s) : renderTBDCard();
        }
        html += `</div>`;
        return html;
    }

    let html = '';
    if (state.playoffState.champion) {
        html += `<div style="text-align:center; padding:15px; background:rgba(255,215,0,0.2); border:2px solid #FFD700; border-radius:10px; margin-bottom:20px;">
            <h2 style="color:#FFD700;">🏆 Stanley Cup Champion: ${state.playoffState.champion} 🏆</h2></div>`;
    }

    html += `<div class="bracket-container">`;
    html += colHtml('Western', 0);
    html += colHtml('Western', 1);
    html += colHtml('Western', 2);

    const finalSeries = allRounds[3] && allRounds[3][0];
    html += `<div class="bracket-col bracket-col-final"><div class="bracket-col-label" style="color:#FFD700;">🏆 Stanley Cup Final</div>`;
    html += finalSeries ? renderSeriesCard(finalSeries) : renderTBDCard();
    html += `</div>`;

    html += colHtml('Eastern', 2);
    html += colHtml('Eastern', 1);
    html += colHtml('Eastern', 0);
    html += `</div>`;

    container.innerHTML = html;
}

function renderTBDCard() {
    return `<div class="matchup">
        <div class="team bracket-team" style="color:#555;">TBD</div>
        <div class="series-score">- : -</div>
        <div class="team bracket-team" style="color:#555;">TBD</div>
    </div>`;
}

function renderSeriesCard(series) {
    const isUserSeries = series.team1 === state.selectedTeam || series.team2 === state.selectedTeam;
    let cls = 'matchup';
    if (isUserSeries) cls += ' user-team';

    const t1cls = series.winner === series.team1 ? 'team bracket-team winner' : (series.winner ? 'team bracket-team eliminated' : 'team bracket-team');
    const t2cls = series.winner === series.team2 ? 'team bracket-team winner' : (series.winner ? 'team bracket-team eliminated' : 'team bracket-team');

    return `<div class="${cls}">
        <div class="${t1cls}">${abbr(series.team1)}</div>
        <div class="series-score">${series.wins1} - ${series.wins2}</div>
        <div class="${t2cls}">${abbr(series.team2)}</div>
    </div>`;
}
