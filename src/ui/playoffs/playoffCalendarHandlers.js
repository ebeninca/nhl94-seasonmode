import { state } from '../../state/gameState.js';
import { simulatePlayoffGame } from '../../engine/simulation.js';
import { advancePlayoffSeries, checkAndAdvancePlayoffRound } from '../../engine/playoffs/playoffEngine.js';
import { getCalendarDates, getVisibleEntriesForDate } from '../../engine/playoffs/playoffCalendar.js';
import { showModal, showPlayoffPlayerStatsModal } from '../modal.js';
import { renderPlayoffView } from './playoffScreen.js';

export function playoffNextDate() {
    const userEntry = getVisibleEntriesForDate(state.playoffCurrentDate).find(
        e => (e.series.team1 === state.selectedTeam || e.series.team2 === state.selectedTeam) && !e.played
    );
    if (userEntry) { showModal('Please submit or simulate your game before advancing.'); return; }

    simulateRemainingCalendarGamesToday();
    const newRound = checkAndAdvancePlayoffRound();
    if (newRound) { renderPlayoffView(); return; }

    const allDates = getCalendarDates();
    const idx = allDates.findIndex(d => d.toDateString() === state.playoffCurrentDate.toDateString());
    if (idx < allDates.length - 1) state.playoffCurrentDate = allDates[idx + 1];
    renderPlayoffView();
}

export function playoffPrevDate() {
    const allDates = getCalendarDates();
    const idx = allDates.findIndex(d => d.toDateString() === state.playoffCurrentDate.toDateString());
    if (idx > 0) { state.playoffCurrentDate = allDates[idx - 1]; renderPlayoffView(); }
}

export function submitPlayoffCalendarGame(idx, team1, team2) {
    const entries = getVisibleEntriesForDate(state.playoffCurrentDate);
    const entry = team1
        ? entries.find(e => e.series.team1 === team1 && e.series.team2 === team2)
        : entries[idx];
    if (!entry) return;

    const sVisitor = parseInt(document.getElementById(`pcal-s1-${idx}`)?.value) || 0;
    const sHome    = parseInt(document.getElementById(`pcal-s2-${idx}`)?.value) || 0;
    if (sVisitor === sHome) { showModal('Playoff games cannot end in a tie!'); return; }

    const homeGames = [0, 1, 4, 6];
    const team1IsHome = homeGames.includes(entry.gameNum);
    const scoreTeam1 = team1IsHome ? sHome : sVisitor;
    const scoreTeam2 = team1IsHome ? sVisitor : sHome;

    const isUserTeam1 = entry.series.team1 === state.selectedTeam;
    const oppTeam = isUserTeam1 ? entry.series.team2 : entry.series.team1;

    showPlayoffPlayerStatsModal(entry.series, scoreTeam1, scoreTeam2, state.selectedTeam, oppTeam, entry.series.team1, entry.series.team2, () => {
        entry.snapshot = { gameNum: entry.gameNum, wins1: entry.series.wins1, wins2: entry.series.wins2 };
        entry.played = true;
        simulateRemainingCalendarGamesToday();
        checkAndAdvancePlayoffRound();
        renderPlayoffView();
    });
}

export function simulatePlayoffCalendarGame(idx, team1, team2) {
    const entries = getVisibleEntriesForDate(state.playoffCurrentDate);
    const entry = team1
        ? entries.find(e => e.series.team1 === team1 && e.series.team2 === team2)
        : entries[idx];
    if (!entry) return;
    const { score1, score2 } = simulatePlayoffGame(entry.series);
    advancePlayoffSeries(entry.series, score1, score2);
    entry.snapshot = { gameNum: entry.gameNum, wins1: entry.series.wins1, wins2: entry.series.wins2 };
    entry.played = true;
    simulateRemainingCalendarGamesToday();
    checkAndAdvancePlayoffRound();
    renderPlayoffView();
}

export function simulateRemainingCalendarGamesToday() {
    const entries = getVisibleEntriesForDate(state.playoffCurrentDate);
    entries.forEach(e => {
        if (!e.played && !e.series.winner &&
            e.series.team1 !== state.selectedTeam && e.series.team2 !== state.selectedTeam) {
            const { score1, score2 } = simulatePlayoffGame(e.series);
            advancePlayoffSeries(e.series, score1, score2);
            e.snapshot = { gameNum: e.gameNum, wins1: e.series.wins1, wins2: e.series.wins2 };
            e.played = true;
        }
    });
}
