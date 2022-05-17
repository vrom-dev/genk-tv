import { html, css, LitElement } from 'lit';

class TMDBCalendar extends LitElement {
  static get properties () {
    return {
      year: {
        type: Number,
        state: true
      },
      month: {
        type: Number,
        state: true
      },
      calendar: {
        type: Object,
        state: true
      },
      events: {
        type: Array
      }
    };
  }

  static get styles () {
    return css`
    *, *::after, *::before {
      box-sizing: border-box;
    }
    .calendar__controls {
      display: flex;
      justify-content: space-between;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    .calendar__controls button {
      color:  var(--text-color-secondary);
      background-color: var(--bg-color-50);
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
      padding: .5rem;
      border: none;
    }
    .calendar__list {
      text-align: center;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin: 0;
      padding: 0;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    .calendar__list-item {
      font-size: 1.5ch;
      padding: 1rem .25rem;
      color: var(--text-color-primary);
    }

    .calendar__month {
      text-align: center;
      padding: 1rem;
      color: var(--text-color-primary);
    }
    
    .day-name {
      color: var(--text-color-secondary);
      font-weight: 700;
      font-size: 0.9rem;
      text-align: center;
    }
    .event__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-left: 0;
      padding: .2rem;
    }
    .event__list-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 2px;
      background-color: #000;
    }
    .event__list-item:hover {
      background-color: #eee;
      position: relative
    }
    [data-hint]::before {
      content: attr(data-hint);
      pointer-events: none;
      white-space: pre;
      position: absolute;
      color: #fff;
      background: #555;
      padding: 0.3rem 2rem;
      border-radius: 0.3rem;
      opacity: 0;
      visibility: none;
      bottom: calc(0.5rem + 100%);
      right: 50%;
      transform: translateX(50%);
    }
    [data-hint]::after {
      content: "";
      pointer-events: none;
      width: 0;
      height: 0;
      position: absolute;
      border-color: #555;
      border-width: 0;
      border-style: solid;
      opacity: 0;
      visibility: none;
      border-top-width: 0.5rem;
      border-right-width: 0.5rem;
      border-right-color: #0000;
      border-left-width: 0.5rem;
      border-left-color: #0000;
      bottom: 100%;
      right: 50%;
      transform: translateX(50%);
    }
    [data-hint]:hover::before,
    [data-hint]:hover::after {
      visibility: visible;
      opacity: 1;
      transition-property: opacity;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }
    `;
  }

  constructor () {
    super();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
  }

  updateToPreviousMonth () {
    this.year = this.month === 0 ? this.year - 1 : this.year;
    this.month = this.month === 0 ? 11 : this.month - 1;
    this.buildCalendar();
  }

  updateToNextMonth () {
    this.year = this.month === 11 ? this.year + 1 : this.year;
    this.month = this.month === 11 ? 0 : this.month + 1;
    this.buildCalendar();
  }

  buildCalendar () {
    const locale = 'es';

    const monthsFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
    const weekDayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });

    this.weekDays = [...Array(7).keys()].map((dayIndex) =>
      weekDayFormatter.format(new Date(2022, 4, dayIndex + 2)) // 2 of May 2022 is Monday
    );
    const monthName = monthsFormatter.format(new Date(this.year, this.month));
    const nextMonthIndex = (this.month + 1) % 12;
    const daysOfMonth = new Date(this.year, nextMonthIndex, 0).getDate();
    const startsOn = new Date(this.year, this.month, 1).getDay();
    this.calendar = {
      daysOfMonth,
      monthName,
      startsOn
    };
  }

  connectedCallback () {
    super.connectedCallback();
    this.buildCalendar();
  }

  render () {
    const { daysOfMonth, startsOn, monthName } = this.calendar;

    return this.events && html`
      <div class='calendar__controls'>
        <button @click=${this.updateToPreviousMonth}><</button>
        <button @click=${this.updateToNextMonth}>></button>
      </div>      
      <h2 class='calendar__month'>${monthName} ${this.year}</h2>
      <ol class='calendar__list'>
        ${this.weekDays.map((dayName) => html`<li class='day-name calendar__list-item'>${dayName}</li>`)}
        ${[...Array(daysOfMonth).keys()].map((day, index) => {
          const dayString = `${this.year}-${this.month > 9 ? this.month + 1 : '0' + (this.month + 1)}-${day > 9 ? day + 1 : '0' + (day + 1)}`;
          const styles = index === 0 ? `grid-column-start: ${startsOn !== 0 ? startsOn : 7}` : '';
          const events = this.events.filter(event => event.release_date === dayString);
          return html`
            <li class='calendar__list-item' style=${styles}>
              ${day + 1}
              <ul class='event__list'>
                ${events.map(event => html`<span class='event__list-item' data-hint=${event.title} style='background-color: grey'></span>`)}
              </ul>
            </li>`;
        })}
      </ol>`;
  }
}

customElements.define('tmdb-calendar', TMDBCalendar);
