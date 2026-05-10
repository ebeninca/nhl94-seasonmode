import { state } from '../../state/gameState.js';

export function generatePlayoffCalendar() {
    const roundStartDates = [
        new Date('1994-04-18'), new Date('1994-05-02'),
        new Date('1994-05-16'), new Date('1994-05-26')
    ];
    state.playoffState.calendar = [];
    addRoundToCalendar(0, roundStartDates[0]);
}

export function addRoundToCalendar(roundIdx, startDate) {
    const round = state.playoffState.rounds[roundIdx];
    if (!round) return;
    for (let gameNum = 0; gameNum < 7; gameNum++) {
        const gameDate = new Date(startDate);
        gameDate.setDate(startDate.getDate() + gameNum * 2);
        round.forEach(series => {
            state.playoffState.calendar.push({ date: gameDate, series, gameNum, played: false });
        });
    }
    state.playoffState.calendar.sort((a, b) => a.date - b.date);
}

export function rebuildCalendarForNewRound() {
    const newRoundIdx = state.playoffState.rounds.length - 1;

    let lastPlayedDate = null;
    state.playoffState.calendar.forEach(e => {
        if (e.played && (!lastPlayedDate || e.date > lastPlayedDate)) {
            lastPlayedDate = e.date;
        }
    });
    const startDate = new Date(lastPlayedDate || new Date('1994-04-18'));
    startDate.setDate(startDate.getDate() + 3);

    addRoundToCalendar(newRoundIdx, startDate);
    const next = state.playoffState.calendar.find(e =>
        !e.played && !e.series.winner &&
        state.playoffState.rounds[newRoundIdx].includes(e.series)
    );
    if (next) state.playoffCurrentDate = next.date;
}

export function getCalendarDates() {
    const dates = [];
    const seen = new Set();
    state.playoffState.calendar.forEach(e => {
        const relevant = e.played || (!e.series.winner && e.gameNum === e.series.games.length);
        if (!relevant) return;
        const key = e.date.toDateString();
        if (!seen.has(key)) { seen.add(key); dates.push(e.date); }
    });
    return dates.sort((a, b) => a - b);
}

export function getVisibleEntriesForDate(date) {
    return state.playoffState.calendar.filter(e =>
        e.date.toDateString() === date.toDateString() &&
        !e.series.winner &&
        e.gameNum === e.series.games.length
    );
}
