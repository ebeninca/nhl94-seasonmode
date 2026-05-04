import { teams } from '../data/teams.js';
import { players } from '../data/players.js';
import { state } from '../state/gameState.js';

export function initializeTeamStats() {
    Object.keys(teams).forEach(team => {
        const totalRating = Object.values(players[team]).flat().reduce((sum, player) => sum + player.rating, 0);
        const numPlayers = Object.values(players[team]).flat().length;
        teams[team].avgRating = totalRating / numPlayers;

        state.teamStats[team] = {
            wins: 0, losses: 0, ties: 0,
            goalsFor: 0, goalsAgainst: 0, points: 0,
            playerStats: {}
        };
        if (players[team]) {
            Object.values(players[team]).flat().forEach(player => {
                state.teamStats[team].playerStats[player.name] = { goals: 0, assists: 0, points: 0, pim: 0, gp: 0 };
            });
        }
    });
}

export function updateTeamStats(visitor, home, visitorScore, homeScore) {
    const visitorStats = state.teamStats[visitor];
    const homeStats = state.teamStats[home];

    visitorStats.goalsFor += visitorScore;
    visitorStats.goalsAgainst += homeScore;
    homeStats.goalsFor += homeScore;
    homeStats.goalsAgainst += visitorScore;

    if (visitorScore > homeScore) {
        visitorStats.wins++;
        visitorStats.points += 2;
        homeStats.losses++;
    } else if (homeScore > visitorScore) {
        homeStats.wins++;
        homeStats.points += 2;
        visitorStats.losses++;
    } else {
        visitorStats.ties++;
        homeStats.ties++;
        visitorStats.points += 1;
        homeStats.points += 1;
    }
}

export function updatePlayerStatsForGame(teamName, playerStats) {
    Object.keys(playerStats).forEach(player => {
        if (state.teamStats[teamName].playerStats[player]) {
            state.teamStats[teamName].playerStats[player].gp++;
            state.teamStats[teamName].playerStats[player].goals += playerStats[player].goals;
            state.teamStats[teamName].playerStats[player].assists += playerStats[player].assists;
            state.teamStats[teamName].playerStats[player].points += playerStats[player].goals + playerStats[player].assists;
            state.teamStats[teamName].playerStats[player].pim += playerStats[player].pim;
        }
    });
}
