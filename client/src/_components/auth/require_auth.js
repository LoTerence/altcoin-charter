import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

/*
    When the component is mounting or updating (because of changes to props or 
    state) there is an if statement that checks if the user is authenticated.
     If the user is not, HOC will make a redirect into homepage URL. In 
     any other case, nothing happens and the user can go into current component.
*/

let bool = true;

export default function (ComposedComponent) {
    class Authentication extends Component{
 /*       static contextTypes = {
            router: PropTypes.object
        }            */

    
        componentWillMount(){
            if(!this.props.authenticated){
                //this.context.router.push('/signin')
                bool=false;
            }
        }
    
        componentWillUpdate(nextProps){
            if(!nextProps.authenticated){
                //this.context.router.push('/signin')
                bool=false;
            }
        }
    
        render(){
            if (bool){
                return <ComposedComponent {...this.props}/>
            }else {
                return <Redirect to='/signin' />
            }
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
    
}





/*

class PrivateRoute extends Component{
    render() {
        <Route {...this.props} >
        </Route> 
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(PrivateRoute); */