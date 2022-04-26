import { connect } from 'react-redux'
import { putTime } from '../actions'
import EntryForm from '../components/EntryForm'

const mapStateToProps = (state, ownProps) => ({
  currentTime: state.currentTime
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  recordTimeEntry: (timeEntry) => dispatch(putTime(
    timeEntry.recordedTime,
    timeEntry.taskName
  ))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryForm)
