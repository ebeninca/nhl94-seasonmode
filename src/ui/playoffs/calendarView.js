import { state } from '../../state/gameState.js';
import { abbr, teamNameHtml } from '../../data/teams.js';
import { getCalendarDates } from '../../engine/playoffs/playoffCalendar.js';

export function renderPlayoffCalendarView() {
    const container = document.getElementById('playoffCalendar');
    if (!container || !state.playoffState) return;

    const dateStr = state.playoffCurrentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const todayEntries = state.playoffState.calendar.filter(
        e => e.date.toDateString() === state.playoffCurrentDate.toDateString()
    );

    const shownEntries = todayEntries.filter(e => {
        if (e.played) return true;
        if (e.series.winner) return false;
        return e.gameNum === e.series.games.length;
    });

    const allDates = getCalendarDates();
    const currentIdx = allDates.findIndex(d => d.toDateString() === state.playoffCurrentDate.toDateString());
    const hasPrev = currentIdx > 0;
    const hasNext = currentIdx < allDates.length - 1;

    const userEntryToday = shownEntries.find(
        e => e.series.team1 === state.selectedTeam || e.series.team2 === state.selectedTeam
    );

    let html = `<div class="current-date">${dateStr}</div>`;
    html += `<div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;">`;
    html += `<button class="btn" onclick="playoffPrevDate()" ${!hasPrev ? 'disabled' : ''}>← Previous Date</button>`;
    html += `<button class="btn" onclick="playoffNextDate()" ${userEntryToday && !userEntryToday.played ? 'disabled' : ''}>Next Date →</button>`;
    html += `</div>`;

    if (state.playoffState.champion) {
        html += `<div style="text-align:center; padding:20px; background:rgba(255,215,0,0.2); border:2px solid #FFD700; border-radius:10px; margin-bottom:20px;">
            <h2 style="color:#FFD700;">🏆 Stanley Cup Champion: ${state.playoffState.champion} 🏆</h2></div>`;
    }

    if (shownEntries.length === 0 && !state.playoffState.champion) {
        html += `<p style="text-align:center; color:#ccc;">No games scheduled today.</p>`;
    }

    const roundNames = ['FR', 'CSF', 'CF', 'SCF'];

    shownEntries.forEach((entry, idx) => {
        const s = entry.series;
        const isUser = s.team1 === state.selectedTeam || s.team2 === state.selectedTeam;
        const roundName = roundNames[state.playoffState.rounds.indexOf(
            state.playoffState.rounds.find(r => r.includes(s))
        )] || '';
        const divClass = isUser ? 'game-item user-playoff-game' : 'game-item';

        const homeGames = [0, 1, 4, 6];
        const team1IsHome = homeGames.includes(entry.gameNum);
        const visitor = team1IsHome ? s.team2 : s.team1;
        const home    = team1IsHome ? s.team1 : s.team2;

        const displayGameNum = entry.snapshot ? entry.snapshot.gameNum + 1 : s.games.length + 1;
        const displayWins1   = entry.snapshot ? entry.snapshot.wins1   : s.wins1;
        const displayWins2   = entry.snapshot ? entry.snapshot.wins2   : s.wins2;

        const gameIndex = entry.played ? (entry.gameNum < s.games.length ? entry.gameNum : s.games.length - 1) : -1;
        if (entry.played) {
            html += `<div class="${divClass} played" onclick="showPlayoffGameRawStats('${s.team1}','${s.team2}',${gameIndex})">`;
        } else {
            html += `<div class="${divClass}">`;
        }
        html += `<div><strong>${roundName}</strong> — G${displayGameNum} | S: ${abbr(s.team1)} ${displayWins1}-${displayWins2} ${abbr(s.team2)}</div>`;
        html += `<div style="flex:1; text-align:left;">${teamNameHtml(visitor)} @ ${teamNameHtml(home)}</div>`;

        if (entry.played) {
            const last = s.games[gameIndex];
            if (last) {
                const visitorScore = team1IsHome ? last.score2 : last.score1;
                const homeScore = team1IsHome ? last.score1 : last.score2;
                html += `<div>Final: ${visitorScore} - ${homeScore}</div>`;
            }
            if (s.winner && entry.gameNum === s.games.length - 1) html += `<div style="color:#4CAF50; margin-top:4px;">W: ${abbr(s.winner)}</div>`;
        } else if (isUser) {
            html += `<div style="margin-top:8px;">
                <input type="number" class="score-input" id="pcal-s1-${idx}" min="0" max="20" placeholder="0">
                -
                <input type="number" class="score-input" id="pcal-s2-${idx}" min="0" max="20" placeholder="0">
                <button class="btn" onclick="submitPlayoffCalendarGame(${idx}, '${s.team1}', '${s.team2}')">Submit</button>
                <button class="btn" onclick="simulatePlayoffCalendarGame(${idx}, '${s.team1}', '${s.team2}')">Simulate</button>
            </div>`;
        } else {
            html += `<div><em>Will be simulated</em></div>`;
        }
        html += `</div>`;
    });

    container.innerHTML = html;
}
