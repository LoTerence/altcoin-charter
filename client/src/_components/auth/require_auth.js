import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
    When the component is mounting or updating (because of changes to props or 
    state) there is an if statement that checks if the user is authenticated.
     If the user is not, HOC will make a redirect into ‘/signin’ URL. In 
     any other case, nothing happens and the user can go into current component.
*/

export default function (ComposedComponent) {
    class Authentication extends Component{
        componentWillMount() {
            if(!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        PropTypes = {
            router: PropTypes.object,
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.signin.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
    
}


