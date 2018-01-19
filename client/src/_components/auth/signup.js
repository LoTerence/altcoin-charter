import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUpAction } from '../../_store/actions/signup';
import { connect } from 'react-redux';

class Signup extends Component {
    submit = (values) => {
        this.props.signUpAction(values, this.props.history);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="form">
                <div className="container">
                    <h2>Sign in</h2>
                    <form onSubmit={ handleSubmit(this.submit) }>
                        <h1>Please use the following form to register an account:</h1>
                        <Field name="name" component="input" type="text" placeholder="Name" />
                        <Field name="email" component="input" type="text" placeholder="Email" />
                        <Field name="password" component="input" type="password" placeholder="Password" />
                        <button type="submit" >Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        msg: state.signup.msg
     };
}

const reduxFormSignup = reduxForm({
    form:'signup'
})(Signup);

export default connect(mapStateToProps, {signUpAction})(reduxFormSignup);