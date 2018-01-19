import React, { Component } from 'react'
import { signOutAction } from '../../_store/actions/signin';
import { connect } from 'react-redux';

export class Signout extends Component {

    handleSignout(){
        this.props.signOutAction;
    }

  render() {
    return (
      <div>
        <button onClick={handleSignout()} > Sign Out </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
       // msg: state.signin.msg
     };
}


export default connect(mapStateToProps, {signOutAction})(Signout);
