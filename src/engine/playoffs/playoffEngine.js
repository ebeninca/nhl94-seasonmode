import { teams } from '../../data/teams.js';
import { players } from '../../data/players.js';
import { goalieStarters } from '../../data/goalieStarters.js';
import { state } from '../../state/gameState.js';
import { generatePlayerStats, generateShotsAgainst, pickGameGoalie } from '../simulation.js';
import { updatePlayoffPlayerStats, updatePlayoffGoalieStats } from './playoffStats.js';
import { generatePlayoffCalendar, rebuildCalendarForNewRound } from './playoffCalendar.js';

export function getPlayoffSeeds() {
    // 1993-94 format: top 4 from each division qualify
    const divisions = ['Northeast', 'Atlantic', 'Central', 'Pacific'];
    const seeds = {};
    divisions.forEach(div => {
        const divTeams = Object.keys(teams).filter(t => teams[t].division === div);
        divTeams.sort((a, b) => {
            const as = state.teamStats[a], bs = state.teamStats[b];
            if (bs.points !== as.points) return bs.points - as.points;
            if (bs.wins !== as.wins) return bs.wins - as.wins;
            return (bs.goalsFor - bs.goalsAgainst) - (as.goalsFor - as.goalsAgainst);
        });
        seeds[div] = divTeams.slice(0, 4);
    });
    return seeds;
}

export function buildFirstRound(seeds) {
    // Intra-division matchups: 1v4, 2v3
    const matchups = [];
    const divisions = ['Northeast', 'Atlantic', 'Central', 'Pacific'];
    divisions.forEach(div => {
        const s = seeds[div];
        const conf = teams[s[0]].conference;
        matchups.push({ conf, div, high: s[0], low: s[3], highSeed: 1, lowSeed: 4 });
        matchups.push({ conf, div, high: s[1], low: s[2], highSeed: 2, lowSeed: 3 });
    });
    return matchups;
}

export function createSeries(team1, team2, conf, div) {
    return { team1, team2, conf, div: div || null, wins1: 0, wins2: 0, games: [], winner: null };
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

    const round1Series = firstRoundMatchups.map(m => createSeries(m.high, m.low, m.conf, m.div));

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

    const roundIdx = state.playoffState.rounds.length - 1;

    if (roundIdx === 3) {
        state.playoffState.champion = currentRound[0].winner;
        return false;
    }

    let nextSeries = [];

    if (roundIdx === 0) {
        // Round 1 -> Round 2 (Division Semifinals): winners from same division face each other
        const divisions = ['Northeast', 'Atlantic', 'Central', 'Pacific'];
        divisions.forEach(div => {
            const divSeries = currentRound.filter(s => s.div === div);
            if (divSeries.length === 2) {
                const conf = divSeries[0].conf;
                nextSeries.push(createSeries(divSeries[0].winner, divSeries[1].winner, conf, div));
            }
        });
    } else if (roundIdx === 1) {
        // Round 2 -> Round 3 (Conference Finals): division champions from same conference
        const eastDivs = currentRound.filter(s => s.conf === 'Eastern');
        const westDivs = currentRound.filter(s => s.conf === 'Western');
        if (eastDivs.length === 2) nextSeries.push(createSeries(eastDivs[0].winner, eastDivs[1].winner, 'Eastern'));
        if (westDivs.length === 2) nextSeries.push(createSeries(westDivs[0].winner, westDivs[1].winner, 'Western'));
    } else if (roundIdx === 2) {
        // Round 3 -> Round 4 (Stanley Cup Final): conference champions
        const eastChamp = currentRound.find(s => s.conf === 'Eastern')?.winner;
        const westChamp = currentRound.find(s => s.conf === 'Western')?.winner;
        if (eastChamp && westChamp) nextSeries.push(createSeries(eastChamp, westChamp, 'Final'));
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
