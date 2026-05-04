# Refactor Plan — NHL94 Season Mode

## Motivação

O `script.js` atual tem ~2800 linhas com responsabilidades completamente misturadas:
- Dados estáticos (times, jogadores, listas de all-stars)
- Estado global do jogo
- Lógica de simulação
- Lógica de playoffs
- Renderização de UI
- Navegação entre telas

Separar em módulos ES6 melhora legibilidade, facilita manutenção e isola responsabilidades.

---

## Estrutura de Pastas Proposta

```
nhl94-seasonmode/
├── index.html
├── styles.css
├── main.js                        ← entry point, importa tudo e expõe funções globais ao HTML
└── src/
    ├── data/
    │   ├── teams.js               ← const teams, const teamAbbr, function abbr()
    │   ├── players.js             ← const players
    │   └── lists.js               ← top50Goals, top50Assists, enforcers, allStars, eliteAllStars
    ├── state/
    │   └── gameState.js           ← variáveis globais: selectedTeam, currentDate, teamStats, allGames, etc.
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

## Padrão de Módulos

Usar **ES Modules nativos** (`type="module"`) — sem bundler, sem build step, funciona direto no browser.

```html
<!-- index.html -->
<script type="module" src="main.js"></script>
```

```js
// main.js — expõe funções ao escopo global para os onclick do HTML
import { showMainMenu, showNewGame } from './src/ui/navigation.js';
import { startSeason } from './src/ui/season/teamSelection.js';
// ...

window.showMainMenu = showMainMenu;
window.showNewGame = showNewGame;
window.startSeason = startSeason;
// ...
```

Cada módulo exporta apenas o que precisa ser usado por outros módulos ou pelo `main.js`.

---

## Estado Compartilhado

O maior desafio é o estado global (`selectedTeam`, `teamStats`, `allGames`, `playoffState`, etc.) que é lido e escrito por múltiplos módulos.

**Solução:** `src/state/gameState.js` exporta um objeto mutável único:

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

Todos os módulos importam `state` e leem/escrevem nele diretamente — simples, sem overhead, mantém o comportamento atual.

---

## Ordem de Implementação

1. ✅ Criar estrutura de pastas
2. ✅ Extrair `src/data/` — sem dependências, mais fácil de começar
3. ✅ Extrair `src/state/gameState.js`
4. ✅ Extrair `src/engine/` — depende só de data e state
5. ✅ Extrair `src/persistence/saveLoad.js`
6. ✅ Extrair `src/ui/` de dentro para fora (começar pelas folhas: standings, leagueLeaders, bracket)
7. ✅ Criar `main.js` e atualizar `index.html`
8. Remover `script.js` (manter como backup até validação completa)

---

## O que NÃO muda

- Nenhuma lógica de negócio é alterada
- Nenhum CSS é alterado
- O HTML dos templates inline (dentro das funções JS) permanece igual
- Nenhum bundler ou dependência externa é adicionada
