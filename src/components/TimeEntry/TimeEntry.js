import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import styles from './TimeEntry.module.scss';

class TimeEntry extends Component {

  state = {
    currentTime: '',
    editMode: false
  };

  constructor(props) {
    super(props);

    this.state.currentTime = moment().format('h:mm a');
    this.triggerUpdateTimeEvent(this.state.currentTime);

    const timeoutSeconds = 60 - parseInt(moment().format('s'), 10);

    // First update time at next minute change
    setTimeout(this.initTime.bind(this), timeoutSeconds * 1000);

    this.enterEditMode = this.enterEditMode.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    const currentTime = moment().format('h:mm a');

    this.setState({
      currentTime: currentTime,
      editMode: false
    });

    this.triggerUpdateTimeEvent(currentTime);
  }

  initTime() {
    this.updateCurrentTime();

    // Then update every minute
    setInterval(this.updateCurrentTime.bind(this), 60000);
  }

  updateCurrentTime() {
    if (false === this.state.editMode) {
      this.resetForm();
    }
  }

  triggerUpdateTimeEvent(currentTime) {
    if ('function' === typeof this.props.updateTime) {
      currentTime = currentTime.trim().toLowerCase();

      const rxTime = /(\d+):(\d+)\s*(am|pm)?/;
      const timeParts = currentTime.match(rxTime);

      if (null === timeParts) {
        return;
      }

      if (undefined !== timeParts[3]) {
        if (timeParts[1] === '12') {
          timeParts[1] = '0';
        }

        if (timeParts[3] === 'pm') {
          timeParts[1] = (parseInt(timeParts[1], 10) + 12).toString();
        }
      }

      currentTime = timeParts[1].padStart(2, '0') + ':' + timeParts[2].padStart(2, '0');

      this.props.updateTime(currentTime);
    }
  }

  enterEditMode() {
    this.setState({
      editMode: true
    });
  }

  handleChangeTime(event) {
    this.setState({
      currentTime: event.target.value
    });

    this.triggerUpdateTimeEvent(event.target.value);
  }

  get timeIcon() {
    if (this.state.editMode) {
      return 'md-close-circle-outline';
    }

    return 'md-time';
  }

  render() {
    return (
      <div className={ styles.TimeEntry }><div className={ styles.inner }>
        <input
          type="text"
          value={ this.state.currentTime }
          onChange={ this.handleChangeTime }
          onFocus={ this.enterEditMode }
        />
        <ion-icon name={ this.timeIcon } size="large" onClick={ this.resetForm }></ion-icon>
      </div></div>
    )
  }
}

TimeEntry.propTypes = {
  updateTime: PropTypes.func
}

export default TimeEntry;
