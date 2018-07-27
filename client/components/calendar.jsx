import React from 'react';
import moment from 'moment';

import styles from '../styles/calendar.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
    };
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa'];
  }

  prevMonth() {
    this.setState(prevState => ({ month: prevState.month.add(-1, 'months') }));
  }

  nextMonth() {
    this.setState(prevState => ({ month: prevState.month.add(1, 'months') }));
  }

  renderTitle() {
    const { month } = this.state;
    return (
      <div className={styles.titleGrid}>
        <button className={styles.button} onClick={this.prevMonth} type="button">
          ←
        </button>
        <span className={styles.title}>
          {month.format('MMMM YYYY')}
        </span>
        <button className={styles.button} onClick={this.nextMonth} type="button">
          →
        </button>
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        {this.days.map((day, i) => (<span key={i}>{day}</span>))}
      </div>
    );
  }

  renderCalendar() {
    const { month } = this.state;
    const firstDayIndex = month.startOf('month').day();
    const daysInMonth = month.daysInMonth();

    console.log(firstDayIndex, daysInMonth);

    const maxWeeks = Math.ceil((firstDayIndex + daysInMonth) / 7);

    const calendar = [];
    for (let i = 0; i < maxWeeks; i += 1) {
      let weekArr = [];
      for (let j = 0; j < 7; j += 1) {
        weekArr.push(j);
      }
      calendar.push(weekArr);
    }

    return (
      <table>
        <tbody>
          {calendar.map((week => {
            return (
              <tr>
                {week.map((day, i) => {
                  return (
                    <td key={i}>{day}</td>
                  );
                })}
              </tr>
            )
          }))}
        </tbody>
      </table>
    );


  }

  render() {
    return (
      <div className={styles.wrapper} id="calendar">
        {this.renderTitle()}
        {this.renderHeader()}
        {this.renderCalendar()}
      </div>
    );
  }
}

export default Calendar;
