import { state } from '../../state/gameState.js';
import { hideAllScreens, showSeasonOverScreen } from '../navigation.js';
import { closeModal } from '../modal.js';
import { renderPlayoffBracket } from './bracket.js';
import { renderPlayoffCalendarView } from './calendarView.js';

export function showPlayoffScreen() {
    hideAllScreens();
    document.getElementById('playoffScreen').classList.add('active');
    renderPlayoffView();
}

export function renderPlayoffView() {
    if (state.playoffView === 'bracket') {
        document.getElementById('playoffBracket').style.display = 'block';
        document.getElementById('playoffCalendar').style.display = 'none';
        document.getElementById('btnViewBracket').classList.add('active');
        document.getElementById('btnViewCalendar').classList.remove('active');
        renderPlayoffBracket();
    } else {
        document.getElementById('playoffBracket').style.display = 'none';
        document.getElementById('playoffCalendar').style.display = 'block';
        document.getElementById('btnViewCalendar').classList.add('active');
        document.getElementById('btnViewBracket').classList.remove('active');
        renderPlayoffCalendarView();
    }
}

export function switchPlayoffView(view) {
    state.playoffView = view;
    renderPlayoffView();
}

export function confirmEndSeason() {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <p>Are you sure you want to end the season now and start the playoffs?</p>
        <p style="color:#ccc; font-size:0.9em;">The playoffs will use the current standings.</p>
        <div class="modal-buttons">
            <button class="btn" style="background: linear-gradient(135deg, #e53935, #b71c1c);" onclick="closeModal(); seasonOverAndShow();">Yes, End Season</button>
            <button class="btn" onclick="closeModal()">Cancel</button>
        </div>
    `;
    document.getElementById('modal').classList.add('show');
}

export function seasonOverAndShow() {
    state.seasonOver = true;
    showSeasonOverScreen();
}
