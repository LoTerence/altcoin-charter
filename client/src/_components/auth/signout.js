import React, { Component } from 'react'
import { signOutAction } from '../../_store/actions/auth';
import { connect } from 'react-redux';

class Signout extends Component {

  componentWillMount(){
    this.props.signOutAction();
  }

  render(){
    return(
      <div>
      good bye
      </div>
    )
  }
}

export default connect(null, {signOutAction})(Signout);
