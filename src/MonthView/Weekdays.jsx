import React from 'react';
import PropTypes from 'prop-types';
import {
  getYear,
  getMonth,
  getMonthStart,
} from '@wojtekmaj/date-utils';

import Flex from '../Flex';

import { getDayOfWeek } from '../shared/dates';
import { formatWeekday, formatShortWeekday as defaultFormatShortWeekday } from '../shared/dateFormatter';
import { isCalendarType } from '../shared/propTypes';

const className = 'react-calendar__month-view__weekdays';

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear()
    && d1.getDay() === d2.getDay()
  );
}

export default function Weekdays(props) {
  const {
    calendarType,
    formatShortWeekday = defaultFormatShortWeekday,
    locale,
    onMouseLeave,
    value,
  } = props;

  const anyDate = new Date();
  const beginOfMonth = getMonthStart(anyDate);
  const year = getYear(beginOfMonth);
  const monthIndex = getMonth(beginOfMonth);

  const weekdays = [];

  for (let weekday = 1; weekday <= 7; weekday += 1) {
    const weekdayDate = new Date(
      year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType),
    );

    const abbr = formatWeekday(locale, weekdayDate);

    const isSelected = sameDay(new Date(value), new Date(weekdayDate));

    weekdays.push(
      <div
        key={weekday}
        className={`${className}__weekday ${isSelected && `${className}__weekday--selected`}`}
      >
        <abbr aria-label={abbr} title={abbr}>
          {formatShortWeekday(locale, weekdayDate).replace('.', '')}
        </abbr>
      </div>,
    );
  }

  return (
    <Flex
      className={className}
      count={7}
      onFocus={onMouseLeave}
      onMouseOver={onMouseLeave}
    >
      {weekdays}
    </Flex>
  );
}

Weekdays.propTypes = {
  calendarType: isCalendarType.isRequired,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  onMouseLeave: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any,
  ]),
};
