import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import { tileProps } from './shared/propTypes';

function getValue(nextProps, prop) {
  const {
    activeStartDate, date, view, value,
  } = nextProps;

  return typeof prop === 'function'
    ? prop({
      activeStartDate, date, view, value,
    })
    : prop;
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
  );
}

export default class Tile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { tileClassName, tileContent } = nextProps;

    const nextState = {};

    if (tileClassName !== prevState.tileClassNameProps) {
      nextState.tileClassName = getValue(nextProps, tileClassName);
      nextState.tileClassNameProps = tileClassName;
    }

    if (tileContent !== prevState.tileContentProps) {
      nextState.tileContent = getValue(nextProps, tileContent);
      nextState.tileContentProps = tileContent;
    }

    return nextState;
  }

  state = {};

  render() {
    const {
      activeStartDate,
      children,
      classes,
      date,
      enabledDates,
      formatAbbr,
      locale,
      maxDate,
      maxDateTransform,
      minDate,
      minDateTransform,
      onClick,
      onMouseOver,
      style,
      tileDisabled,
      view,

    } = this.props;
    const { tileClassName, tileContent } = this.state;

    return (
      <button
        className={mergeClassNames(classes, tileClassName)}
        disabled={
          (minDate && minDateTransform(minDate) > date)
          || (maxDate && maxDateTransform(maxDate) < date)
          || (tileDisabled && tileDisabled({ activeStartDate, date, view }))
        }
        onClick={onClick && (event => onClick(date, event))}
        onFocus={onMouseOver && (() => onMouseOver(date))}
        onMouseOver={onMouseOver && (() => onMouseOver(date))}
        style={style}
        type="button"
      >
        {formatAbbr
          ? (
            <div>
              <abbr aria-label={formatAbbr(locale, date)} className={sameDay(new Date(), date) && 'react-calendar__tile--today-indicator--now'}>
                {children}
              </abbr>
            </div>
          )
          : children}
        {tileContent}
      </button>
    );
  }
}

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  formatAbbr: PropTypes.func,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
};
