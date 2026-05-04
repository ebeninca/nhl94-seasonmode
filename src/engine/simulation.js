import { teams } from '../data/teams.js';
import { players } from '../data/players.js';
import { top50Goals, top50Assists, enforcers, allStars, eliteAllStars } from '../data/lists.js';
import { updateTeamStats, updatePlayerStatsForGame } from './stats.js';

export function generatePlayerStats(teamName, goals) {
    const allPlayers = players[teamName].forwards.concat(players[teamName].defensemen).concat(players[teamName].goalies);
    const skaters = players[teamName].forwards.concat(players[teamName].defensemen);
    const goalies = players[teamName].goalies.map(p => p.name);

    const playerStats = {};
    allPlayers.forEach(player => {
        playerStats[player.name] = { goals: 0, assists: 0, pim: 0 };
    });

    const scorerPool = [];
    skaters.forEach(player => {
        let weightedRating = player.rating;
        const isDefenseman = players[teamName].defensemen.some(d => d.name === player.name);
        const isAllStar = allStars.includes(player.name);
        const top50GoalsIndex = top50Goals.indexOf(player.name);
        const isTop50GoalScorer = top50GoalsIndex !== -1;
        const isEnforcer = enforcers.includes(player.name);
        const isEliteAllStar = eliteAllStars.includes(player.name);

        if (isDefenseman) {
            if (isEliteAllStar) weightedRating *= 1.2;
            else if (isAllStar) weightedRating *= 1.0;
            else if (isTop50GoalScorer) weightedRating *= 1.0;
            else weightedRating *= 0.5;
        } else if (isEliteAllStar) {
            weightedRating *= 3.3;
        } else if (isAllStar) {
            weightedRating *= 2.0;
        } else if (isTop50GoalScorer) {
            const rank = top50GoalsIndex + 1;
            if (rank <= 10) weightedRating *= 2.1;
            else if (rank <= 30) weightedRating *= 1.5;
            else weightedRating *= 1.3;
        } else if (isEnforcer) {
            weightedRating *= 0.1;
        } else {
            weightedRating *= 1.3;
        }
        for (let i = 0; i < weightedRating; i++) scorerPool.push(player.name);
    });

    const assisterPool = [];
    skaters.forEach(player => {
        let weightedRating = player.rating;
        const isAllStar = allStars.includes(player.name);
        const top50AssistsIndex = top50Assists.indexOf(player.name);
        const isTop50Assist = top50AssistsIndex !== -1;
        const isEnforcer = enforcers.includes(player.name);

        if (isAllStar) {
            weightedRating *= 4.0;
        } else if (isEnforcer) {
            weightedRating *= 0.15;
        } else if (isTop50Assist) {
            const rank = top50AssistsIndex + 1;
            if (rank <= 10) weightedRating *= 2.5;
            else weightedRating *= (0.5 + (50 - rank) / 50);
        } else {
            if (players[teamName].forwards.map(f => f.name).includes(player.name)) {
                weightedRating *= 1.1;
            } else {
                weightedRating *= 0.8;
            }
        }
        for (let i = 0; i < weightedRating; i++) assisterPool.push(player.name);
    });

    for (let i = 0; i < goals; i++) {
        const scorer = scorerPool[Math.floor(Math.random() * scorerPool.length)];
        playerStats[scorer].goals++;

        const assignedAssists = new Set();
        let potentialAssisters = assisterPool.filter(p => p !== scorer);

        if (potentialAssisters.length > 0 && Math.random() < 0.85) {
            const firstAssister = potentialAssisters[Math.floor(Math.random() * potentialAssisters.length)];
            if (firstAssister) {
                playerStats[firstAssister].assists++;
                assignedAssists.add(firstAssister);
            }
        }

        if (assignedAssists.size > 0 && Math.random() < 0.5) {
            let potentialAssisters2 = potentialAssisters.filter(p => !assignedAssists.has(p));
            if (potentialAssisters2.length > 0) {
                const secondAssister = potentialAssisters2[Math.floor(Math.random() * potentialAssisters2.length)];
                if (secondAssister) playerStats[secondAssister].assists++;
            }
        }
    }

    allPlayers.forEach(player => {
        const isSkater = !goalies.includes(player.name);
        const isTopPlayer = top50Goals.includes(player.name);
        const isEnforcer = enforcers.includes(player.name);

        if (isSkater) {
            let pimChance = 0.1;
            if (isEnforcer) {
                pimChance = (player.name === 'Tie Domi' || player.name === 'Bob Probert') ? 1.0 : 0.75;
            } else if (isTopPlayer) {
                pimChance = 0.05;
            }
            if (Math.random() < pimChance) {
                playerStats[player.name].pim = isEnforcer
                    ? Math.floor(Math.random() * 2) * 2 + 2
                    : Math.floor(Math.random() * 2) + 2;
            }
        } else {
            if (Math.random() < 0.02) playerStats[player.name].pim = 2;
        }
    });

    return playerStats;
}

export function simulateRealisticGame(game) {
    if (!teams[game.visitor] || !teams[game.home]) {
        console.error('Invalid teams in game:', game);
        return;
    }

    let visitorRating = teams[game.visitor].avgRating || 65;
    let homeRating = teams[game.home].avgRating || 65;
    homeRating += 10;

    if (homeRating > visitorRating) homeRating *= 1.1;
    else visitorRating *= 1.1;

    const totalRating = visitorRating + homeRating;

    const avgRatingLeague = Object.values(teams).reduce((sum, team) => sum + team.avgRating, 0) / Object.keys(teams).length;
    const combinedRating = visitorRating + homeRating;
    const ratingRatio = combinedRating / (avgRatingLeague * 2);

    let r = Math.random();
    let totalGoals;
    if (r < 0.02) totalGoals = 2;
    else if (r < 0.10) totalGoals = 3;
    else if (r < 0.30) totalGoals = 4;
    else if (r < 0.55) totalGoals = 5;
    else if (r < 0.75) totalGoals = 6;
    else if (r < 0.90) totalGoals = 7;
    else totalGoals = Math.floor(Math.random() * 3) + 8;

    totalGoals = Math.round(totalGoals * ratingRatio);
    if (totalGoals < 2) totalGoals = 2;

    let visitorGoals = 0;
    let homeGoals = 0;

    const isTie = Math.random() < 0.15;

    if (isTie) {
        if (totalGoals % 2 !== 0) totalGoals++;
        visitorGoals = totalGoals / 2;
        homeGoals = totalGoals / 2;
    } else {
        for (let i = 0; i < totalGoals; i++) {
            if (Math.random() < (visitorRating / totalRating)) visitorGoals++;
            else homeGoals++;
        }
        if (visitorGoals === homeGoals) {
            if (Math.random() < 0.5) visitorGoals++;
            else homeGoals++;
        }
    }

    game.played = true;
    game.visitorScore = visitorGoals;
    game.homeScore = homeGoals;

    updateTeamStats(game.visitor, game.home, visitorGoals, homeGoals);
    const visitorStats = generatePlayerStats(game.visitor, game.visitorScore);
    const homeStats = generatePlayerStats(game.home, game.homeScore);
    updatePlayerStatsForGame(game.visitor, visitorStats);
    updatePlayerStatsForGame(game.home, homeStats);
}

export function simulatePlayoffGame(series) {
    const r1 = teams[series.team1].avgRating || 65;
    const r2 = teams[series.team2].avgRating || 65;
    const total = r1 + r2;

    let goals;
    const r = Math.random();
    if (r < 0.10) goals = 3;
    else if (r < 0.30) goals = 4;
    else if (r < 0.55) goals = 5;
    else if (r < 0.75) goals = 6;
    else goals = 7;

    let g1 = 0, g2 = 0;
    for (let i = 0; i < goals; i++) {
        if (Math.random() < r1 / total) g1++; else g2++;
    }
    if (g1 === g2) Math.random() < 0.5 ? g1++ : g2++;

    return { score1: g1, score2: g2 };
}
