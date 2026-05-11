import { state } from '../../state/gameState.js';

export function updatePlayoffPlayerStats(teamName, playerStats) {
    Object.keys(playerStats).forEach(player => {
        if (state.teamStats[teamName].playoffStats && state.teamStats[teamName].playoffStats[player]) {
            state.teamStats[teamName].playoffStats[player].gp++;
            state.teamStats[teamName].playoffStats[player].goals += playerStats[player].goals;
            state.teamStats[teamName].playoffStats[player].assists += playerStats[player].assists;
            state.teamStats[teamName].playoffStats[player].points += playerStats[player].goals + playerStats[player].assists;
            state.teamStats[teamName].playoffStats[player].pim += playerStats[player].pim;
        }
    });
}

export function updatePlayoffGoalieStats(teamName, goalieStats) {
    if (!state.teamStats[teamName].playoffGoalieStats) state.teamStats[teamName].playoffGoalieStats = {};
    Object.keys(goalieStats).forEach(name => {
        if (!state.teamStats[teamName].playoffGoalieStats[name]) {
            state.teamStats[teamName].playoffGoalieStats[name] = { gp: 0, ga: 0, sa: 0 };
        }
        state.teamStats[teamName].playoffGoalieStats[name].gp += goalieStats[name].gp;
        state.teamStats[teamName].playoffGoalieStats[name].ga += goalieStats[name].ga;
        state.teamStats[teamName].playoffGoalieStats[name].sa += goalieStats[name].sa;
    });
}
