import {Component} from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

class FormattedTime extends Component {

  render() {
    return moment('2018-01-01 ' + this.props.time).format('h:mm a');
  }

}

FormattedTime.propTypes = {
    time: PropTypes.string
}

export default FormattedTime;
