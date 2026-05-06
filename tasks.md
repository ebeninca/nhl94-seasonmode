# Tasks

## v006

- [x] modal score/assists goalies
- [x] modal submit button on top
- [] team selection in multiple columns
- [] modal in view data mode
- [] saves statistics for goalies

## v005
- [x] Exported file considers end of season status
- [x] Continue playoffs accepts next game input but next button now works
- [x] Separate Start Playoffs and Continue Playoffs buttons
- [x] Visual and date adjustments in playoffs
- [x] Text alignment, expand spacing in playoff calendar
- [x] GitHub Actions

## v004
- [x] Full refactoring

## v003
- [x] Fix sorting on leaders screens
- [x] Fix screen sequence at end of season

## v002
- [x] Copy the calendar screen concept from season mode to playoffs, where games can be simulated day by day, following the real NHL model where games of the same playoff round happen on the same day.
- [x] Add a button on the playoff screen to toggle between the bracket/tree view and the calendar view.
- [x] Fix brackets — pre-render the full tree before knowing results, with brackets going from the edges toward the center Stanley Cup bracket.
- [x] Playoffs use @ instead of versus, alternate home and away games like in real life.

## v001
- [x] Add playoff functionality at the end of the season, following the real classification rules of the era — 16 teams qualify and play in a best-of-7 elimination format up to the Stanley Cup Final.
- [x] Build a playoff bracket screen with the Stanley Cup in the center.
- [x] Following the same logic that already exists, teams not chosen by the player must have their games and stats simulated. Keep a stats screen for the playoffs as well.
- [x] Add an "End Season Now" button with a confirmation message, which ends the season and starts the playoffs using the current team standings.

# Future

- Allow building a tournament with fewer, selected teams
- Improve team selection screen layout — more side by side, start button more accessible
- Keep history in a file associated with the application without needing to import/export JSON
