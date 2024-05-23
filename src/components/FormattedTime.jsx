import {Component} from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';

class FormattedTime extends Component {

  render() {
    return dayjs('2018-01-01 ' + this.props.time).format('h:mm a');
  }

}

FormattedTime.propTypes = {
    time: PropTypes.string.isRequired
}

export default FormattedTime;
