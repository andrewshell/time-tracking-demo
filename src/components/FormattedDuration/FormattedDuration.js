import {Component} from 'react';
import PropTypes from 'prop-types';

class FormattedDuration extends Component {
  render() {
    const totalMinutes = parseInt(this.props.duration, 10);
    const hours = Math.floor(totalMinutes / 60).toString();
    const minutes = (totalMinutes - (hours * 60)).toString().padStart(2, '0');

    return hours + ':' + minutes;
  }
}

FormattedDuration.propTypes = {
    duration: PropTypes.number
}

export default FormattedDuration;
