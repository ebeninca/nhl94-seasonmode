# Refactor Plan — NHL94 Season Mode

## Motivation

The original `script.js` had ~2800 lines with completely mixed responsibilities:
- Static data (teams, players, all-star lists)
- Global game state
- Simulation logic
- Playoff logic
- UI rendering
- Screen navigation

Splitting into ES6 modules improves readability, eases maintenance, and isolates responsibilities.

---

## Proposed Folder Structure

```
nhl94-seasonmode/
├── index.html
├── styles.css
└── src/
    ├── main.js                    ← entry point, imports everything and exposes global functions to HTML
    ├── data/
    │   ├── teams.js               ← const teams, const teamAbbr, function abbr()
    │   ├── players.js             ← const players
    │   └── lists.js               ← top50Goals, top50Assists, enforcers, allStars, eliteAllStars
    ├── state/
    │   └── gameState.js           ← global variables: selectedTeam, currentDate, teamStats, allGames, etc.
    ├── engine/
    │   ├── schedule.js            ← initializeSchedule(), scheduleData[]
    │   ├── simulation.js          ← simulateRealisticGame(), generatePlayerStats(), simulatePlayoffGame()
    │   ├── stats.js               ← initializeTeamStats(), updateTeamStats(), updatePlayerStatsForGame()
    │   └── playoffs/
    │       ├── playoffEngine.js   ← initPlayoffs(), createSeries(), advancePlayoffSeries(), getPlayoffSeeds(), buildFirstRound()
    │       ├── playoffCalendar.js ← generatePlayoffCalendar(), addRoundToCalendar(), rebuildCalendarForNewRound(), getCalendarDates(), playoffNextDate(), playoffPrevDate(), submitPlayoffCalendarGame(), simulatePlayoffCalendarGame(), simulateRemainingCalendarGamesToday(), checkAndAdvancePlayoffRound()
    │       └── playoffStats.js    ← updatePlayoffPlayerStats(), playoffSortCol, playoffSortDir, sortPlayoffLeaders(), renderPlayoffLeaders()
    ├── ui/
    │   ├── navigation.js          ← showMainMenu(), showNewGame(), hideAllScreens(), backToGame(), showSeasonOverScreen(), showCredits()
    │   ├── modal.js               ← showModal(), closeModal(), showPlayerStatsModal(), submitPlayerStatsFromModal(), showPlayoffPlayerStatsModal(), submitPlayoffPlayerStats()
    │   ├── season/
    │   │   ├── teamSelection.js   ← renderTeamSelection(), selectTeam(), startSeason()
    │   │   ├── gameScreen.js      ← showGamesToday(), updateTeamInfo(), updateCurrentDate(), updateNavigationButtons(), nextDate(), previousDate(), submitGameWrapper(), simulateMyGame()
    │   │   ├── standings.js       ← showStandings(), showStandingsBy()
    │   │   └── leagueLeaders.js   ← showLeagueLeaders(), renderLeagueLeaders(), currentFilter, currentSortColumn, sortDirection
    │   └── playoffs/
    │       ├── playoffScreen.js   ← showPlayoffScreen(), renderPlayoffView(), switchPlayoffView(), confirmEndSeason()
    │       ├── bracket.js         ← renderPlayoffBracket(), renderSeriesCard(), renderTBDCard(), colHtml()
    │       └── calendarView.js    ← renderPlayoffCalendarView()
    └── persistence/
        └── saveLoad.js            ← saveGame(), exportSave(), importSave(), triggerImport(), continueGame(), checkSavedGame()
```

---

## Module Pattern

Uses **native ES Modules** (`type="module"`) with Vite as bundler for production builds.

```html
<!-- index.html -->
<script type="module" src="/src/main.js"></script>
```

```js
// src/main.js — exposes functions to global scope for HTML onclick handlers
import { showMainMenu, showNewGame } from './ui/navigation.js';
import { startSeason } from './ui/season/teamSelection.js';
// ...

window.showMainMenu = showMainMenu;
window.showNewGame = showNewGame;
window.startSeason = startSeason;
// ...
```

Each module exports only what needs to be used by other modules or by `main.js`.

---

## Shared State

The biggest challenge is the global state (`selectedTeam`, `teamStats`, `allGames`, `playoffState`, etc.) that is read and written by multiple modules.

**Solution:** `src/state/gameState.js` exports a single mutable object:

```js
// src/state/gameState.js
export const state = {
    selectedTeam: null,
    currentDate: new Date('1993-10-05'),
    teamStats: {},
    allGames: [],
    playoffState: null,
    playoffView: 'calendar',
    playoffCurrentDate: null,
    currentSortColumn: 'points',
    sortDirection: 'desc',
    currentFilter: 'league'
};
```

All modules import `state` and read/write to it directly — simple, no overhead, preserves existing behavior.

---

## Implementation Order

1. ✅ Create folder structure
2. ✅ Extract `src/data/` — no dependencies, easiest to start
3. ✅ Extract `src/state/gameState.js`
4. ✅ Extract `src/engine/` — depends only on data and state
5. ✅ Extract `src/persistence/saveLoad.js`
6. ✅ Extract `src/ui/` from inside out (start with leaves: standings, leagueLeaders, bracket)
7. ✅ Create `main.js` and update `index.html`
8. Remove `script.js` (kept as backup until full validation)

---

## What Does NOT Change

- No business logic is altered
- No CSS is altered
- Inline HTML templates (inside JS functions) remain the same
- No bundler or external dependency is added (Vite is dev-only)
