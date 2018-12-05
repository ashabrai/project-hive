import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import * as statusActions from '../../action/status';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

      <p> Welcome to Project Hive</p>
      <React.Fragment>
      <Link to ='/viewstatus' className ="dashboardLinks"> Status </Link>
      <p>You will be able to have more control, with see whose </p>
      </React.Fragment>

    );
  }
}


Dashboard.propTypes = {
  location: PropTypes.object,

};

const mapStateToProps = state => ({
  token: state.token,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  armSystem: accesscode => dispatch(statusActions.armSystem(accesscode)),
  disarmSystem: accesscode => dispatch(statusActions.disarmSystem(accesscode)),
});

export default connect(mapDispatchToProps, mapStateToProps)(Dashboard);
