import { teams } from '../../data/teams.js';
import { players } from '../../data/players.js';
import { goalieStarters } from '../../data/goalieStarters.js';
import { state } from '../../state/gameState.js';
import { generatePlayerStats, generateShotsAgainst, pickGameGoalie } from '../simulation.js';
import { updatePlayoffPlayerStats, updatePlayoffGoalieStats } from './playoffStats.js';
import { generatePlayoffCalendar, rebuildCalendarForNewRound } from './playoffCalendar.js';

export function getPlayoffSeeds() {
    const conferences = ['Eastern', 'Western'];
    const seeds = {};
    conferences.forEach(conf => {
        const confTeams = Object.keys(teams).filter(t => teams[t].conference === conf);
        confTeams.sort((a, b) => {
            const as = state.teamStats[a], bs = state.teamStats[b];
            if (bs.points !== as.points) return bs.points - as.points;
            if (bs.wins !== as.wins) return bs.wins - as.wins;
            return (bs.goalsFor - bs.goalsAgainst) - (as.goalsFor - as.goalsAgainst);
        });
        seeds[conf] = confTeams.slice(0, 8);
    });
    return seeds;
}

export function buildFirstRound(seeds) {
    const matchups = [];
    ['Eastern', 'Western'].forEach(conf => {
        const s = seeds[conf];
        [[0,7],[1,6],[2,5],[3,4]].forEach(([hi, lo]) => {
            matchups.push({ conf, high: s[hi], low: s[lo], highSeed: hi+1, lowSeed: lo+1 });
        });
    });
    return matchups;
}

export function createSeries(team1, team2, conf) {
    return { team1, team2, conf, wins1: 0, wins2: 0, games: [], winner: null };
}

export function initPlayoffs() {
    const seeds = getPlayoffSeeds();
    const firstRoundMatchups = buildFirstRound(seeds);

    Object.keys(teams).forEach(team => {
        if (!state.teamStats[team].playoffStats) {
            state.teamStats[team].playoffStats = {};
            Object.values(players[team]).flat().forEach(p => {
                state.teamStats[team].playoffStats[p.name] = { goals: 0, assists: 0, points: 0, pim: 0, gp: 0 };
            });
        }
    });

    const round1Series = firstRoundMatchups.map(m => createSeries(m.high, m.low, m.conf));

    state.playoffState = {
        seeds,
        rounds: [round1Series],
        champion: null,
        calendar: []
    };

    generatePlayoffCalendar();
    state.playoffCurrentDate = state.playoffState.calendar[0]?.date || new Date('1994-04-18');
    state.playoffView = 'calendar';
}

export function advancePlayoffSeries(series, score1, score2, skipSimStats = false) {
    const gameEntry = { score1, score2 };

    if (!skipSimStats) {
        const stats1 = generatePlayerStats(series.team1, score1);
        const stats2 = generatePlayerStats(series.team2, score2);
        updatePlayoffPlayerStats(series.team1, stats1);
        updatePlayoffPlayerStats(series.team2, stats2);

        const goalie1 = pickGameGoalie(series.team1);
        const goalie2 = pickGameGoalie(series.team2);
        const sa1 = generateShotsAgainst(score2);
        const sa2 = generateShotsAgainst(score1);
        updatePlayoffGoalieStats(series.team1, { [goalie1]: { gp: 1, ga: score2, sa: sa1 } });
        updatePlayoffGoalieStats(series.team2, { [goalie2]: { gp: 1, ga: score1, sa: sa2 } });

        const filterStats = (stats) => {
            const filtered = {};
            for (const [name, s] of Object.entries(stats)) {
                if (s.goals || s.assists || s.pim) filtered[name] = s;
            }
            return filtered;
        };
        gameEntry.rawStats = {
            team1: { playerStats: filterStats(stats1), goalie: goalie1, goalsAgainst: score2, shotsAgainst: sa1 },
            team2: { playerStats: filterStats(stats2), goalie: goalie2, goalsAgainst: score1, shotsAgainst: sa2 }
        };
    }

    series.games.push(gameEntry);
    if (score1 > score2) series.wins1++; else series.wins2++;

    if (series.wins1 === 4) series.winner = series.team1;
    else if (series.wins2 === 4) series.winner = series.team2;
}

export function checkAndAdvancePlayoffRound() {
    const currentRound = state.playoffState.rounds[state.playoffState.rounds.length - 1];
    if (!currentRound.every(s => s.winner)) return false;

    const winners = currentRound.map(s => s.winner);
    const roundIdx = state.playoffState.rounds.length - 1;

    if (roundIdx === 3) {
        state.playoffState.champion = winners[0];
        return false;
    }

    let nextSeries = [];
    if (roundIdx < 2) {
        const eastWinners = winners.filter((_, i) => currentRound[i].conf === 'Eastern');
        const westWinners = winners.filter((_, i) => currentRound[i].conf === 'Western');
        for (let i = 0; i < eastWinners.length; i += 2)
            nextSeries.push(createSeries(eastWinners[i], eastWinners[i+1], 'Eastern'));
        for (let i = 0; i < westWinners.length; i += 2)
            nextSeries.push(createSeries(westWinners[i], westWinners[i+1], 'Western'));
    } else {
        const eastChamp = winners.find((_, i) => currentRound[i].conf === 'Eastern');
        const westChamp = winners.find((_, i) => currentRound[i].conf === 'Western');
        nextSeries.push(createSeries(eastChamp, westChamp, 'Final'));
    }

    nextSeries.forEach(s => {
        [s.team1, s.team2].forEach(team => {
            if (!state.teamStats[team].playoffStats) {
                state.teamStats[team].playoffStats = {};
                Object.values(players[team]).flat().forEach(p => {
                    state.teamStats[team].playoffStats[p.name] = { goals: 0, assists: 0, points: 0, pim: 0, gp: 0 };
                });
            }
        });
    });

    state.playoffState.rounds.push(nextSeries);
    rebuildCalendarForNewRound();
    return true;
}
