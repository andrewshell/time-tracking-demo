import PropTypes from 'prop-types';

function FormattedDuration ({ duration }) {
  const totalMinutes = parseInt(duration, 10);
  const hours = Math.floor(totalMinutes / 60).toString();
  const minutes = (totalMinutes - (hours * 60)).toString().padStart(2, '0');

  return hours + ':' + minutes;
}

FormattedDuration.propTypes = {
  duration: PropTypes.number.isRequired
};

export default FormattedDuration;
