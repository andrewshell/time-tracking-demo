import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function FormattedTime({ time }) {
  return dayjs('2018-01-01 ' + time).format('h:mm a');
}

FormattedTime.propTypes = {
  time: PropTypes.string.isRequired,
};

export default FormattedTime;
