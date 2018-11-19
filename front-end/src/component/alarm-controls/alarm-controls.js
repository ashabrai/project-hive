import React from 'react';
import AlarmControlsForm from '../alarm-controls/alarm-controls';

import * as statusActions from '../../action/status';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

class AlarmControls extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.state.status = this.props.status;
}

armOrDisarm = (accesscode) =>{
  if(this.state.status) {
    return this.attemptArmOrDisarm(accesscode, this.props.disarmSystem);
  }
  return this.attemptArmorDisarm(accesscode, this.props.armSystem);
  };

// render () {
//
//  return (
//    <section>
//      <AlarmControlsForm on complete={this.state.armOrDisarm}/>
//    </section>
//  )
// }
//

const mapStateToProps = state => ({
  token: state.token,
  status: state.status,
});

export default AlarmControls;
