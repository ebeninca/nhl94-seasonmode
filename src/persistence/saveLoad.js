import { teams } from '../data/teams.js';
import { players } from '../data/players.js';
import { state } from '../state/gameState.js';
import { showModal } from '../ui/modal.js';
import { hideAllScreens, showSeasonOverScreen } from '../ui/navigation.js';
import { updateTeamInfo, updateCurrentDate, showGamesToday, updateNavigationButtons } from '../ui/season/gameScreen.js';
import { showPlayoffScreen } from '../ui/playoffs/playoffScreen.js';

export function saveGame() {
    try {
        const gameState = {
            selectedTeam: state.selectedTeam,
            currentDate: state.currentDate.toISOString(),
            teamStats: state.teamStats,
            allGames: state.allGames,
            seasonOver: state.seasonOver,
            playoffState: state.playoffState,
            playoffView: state.playoffView,
            playoffCurrentDate: state.playoffCurrentDate ? state.playoffCurrentDate.toISOString() : null,
            savedAt: new Date().toISOString()
        };
        const json = JSON.stringify(gameState);
        window.nhl94SaveData = json;
        try { localStorage.setItem('nhl94SaveData', json); } catch (_) {}
        showModal('Game Saved!');
    } catch (error) {
        showModal('Game could not be saved: ' + error.message);
    }
}

export function exportSave() {
    try {
        saveGame();
        const savedData = window.nhl94SaveData || (typeof localStorage !== 'undefined' && localStorage.getItem('nhl94SaveData'));
        if (!savedData) { showModal('No saved data found. Save your game before exporting'); return; }
        const gameState = JSON.parse(savedData);
        const saveDate = new Date().toISOString().split('T')[0];
        const teamName = (gameState.selectedTeam || 'TEAM').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        const fileName = `NHL94_${teamName}_${saveDate}.json`;

        const blob = new Blob([savedData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showModal('Save file exported!');
    } catch (error) {
        showModal('Something went wrong: ' + error.message);
    }
}

export function triggerImport() {
    const input = document.getElementById('importFile');
    if (!input) { console.error('Import file input element not found.'); return; }
    input.value = '';
    input.click();
}

export function importSave(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            const data = JSON.parse(text);
            if (!data.selectedTeam || !data.currentDate || !data.teamStats || !data.allGames) {
                throw new Error('Ogiltigt sparfilsformat');
            }
            window.nhl94SaveData = text;
            try { localStorage.setItem('nhl94SaveData', text); } catch (_) {}
            const btn = document.getElementById('continueBtn');
            if (btn) btn.disabled = false;
            showModal('Sparfilen importerades framgångsrikt! Välj "Continue Game".');
        } catch (err) {
            showModal('Ogiltig sparfil: ' + err.message);
        }
    };
    reader.readAsText(file);
}

export function continueGame() {
    try {
        const savedData = window.nhl94SaveData || (typeof localStorage !== 'undefined' && localStorage.getItem('nhl94SaveData'));
        if (!savedData) { showModal('Inget sparat spel hittades!'); return; }
        const gameState = JSON.parse(savedData);

        state.selectedTeam = gameState.selectedTeam;
        state.currentDate  = new Date(gameState.currentDate);
        state.teamStats    = gameState.teamStats;
        state.seasonOver   = gameState.seasonOver || false;
        state.playoffState = gameState.playoffState || null;
        if (state.playoffState) {
            // Rebuild calendar series references to point to the actual round objects
            // JSON.parse breaks object identity — calendar entries and rounds must share the same series objects
            const seriesMap = new Map();
            state.playoffState.rounds.forEach(round => {
                round.forEach(s => {
                    seriesMap.set(s.team1 + '|' + s.team2 + '|' + s.conf, s);
                });
            });
            if (state.playoffState.calendar) {
                state.playoffState.calendar = state.playoffState.calendar.map(e => {
                    const key = e.series.team1 + '|' + e.series.team2 + '|' + e.series.conf;
                    const realSeries = seriesMap.get(key) || e.series;
                    return { ...e, date: new Date(e.date), series: realSeries };
                });
            }
        }
        state.playoffView  = gameState.playoffView || 'calendar';
        state.playoffCurrentDate = gameState.playoffCurrentDate ? new Date(gameState.playoffCurrentDate) : null;

        Object.keys(teams).forEach(teamName => {
            if (!teams[teamName].avgRating) {
                const totalRating = Object.values(players[teamName]).flat().reduce((sum, player) => sum + player.rating, 0);
                const numPlayers = Object.values(players[teamName]).flat().length;
                teams[teamName].avgRating = totalRating / numPlayers;
            }
        });

        state.allGames = gameState.allGames.map(g => ({ ...g, date: new Date(g.date) }));

        if (state.playoffState) {
            showPlayoffScreen();
        } else if (state.seasonOver) {
            showSeasonOverScreen();
        } else {
            hideAllScreens();
            document.getElementById('gameScreen').classList.add('active');
            updateTeamInfo();
            updateCurrentDate();
            showGamesToday();
            updateNavigationButtons();
        }
    } catch (error) {
        showModal('Det gick inte att ladda spelet: ' + error.message);
    }
}

export function checkSavedGame() {
    const cont = document.getElementById('continueBtn');
    if (!cont) return;
    const has = (typeof window !== 'undefined' && window.nhl94SaveData)
             || (typeof localStorage !== 'undefined' && localStorage.getItem('nhl94SaveData'));
    cont.disabled = !has;
}
