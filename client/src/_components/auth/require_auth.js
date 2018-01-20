import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
    When the component is mounting or updating (because of changes to props or 
    state) there is an if statement that checks if the user is authenticated.
     If the user is not, HOC will make a redirect into homepage URL. In 
     any other case, nothing happens and the user can go into current component.
*/

export default function (ComposedComponent) {
    class Authentication extends Component{
        static contextTypes = {
            router: React.PropTypes.object
        }
    
        componentWillMount(){
            if(!this.props.authenticated){
                this.context.router.push('/')
            }
        }
    
        componentWillUpdate(nextProps){
            if(!nextProps.authenticated){
                this.context.router.push('/')
            }
        }
    
        render(){
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
    
}


