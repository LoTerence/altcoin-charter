import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../../_store/actions/signin';
import { connect } from 'react-redux';

class Signin extends Component {
    submit = (values) => {
        this.props.signInAction(values, this.props.history);
    }

    errorMessage() {
        if ( this.props.msg ) {
            return (
                <div className="info-red">
                    {this.props.msg}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="form">
                <div className="container">
                    <h2>Sign in</h2>
                    <form onSubmit={ handleSubmit(this.submit) }>
                        <Field name="email" component="input" type="text" placeholder="Email" />
                        <Field name="password" component="input" type="password" placeholder="Password" />
                        <button type="submit" className="blue">Sign in</button>
                    </form>
                    {this.errorMessage()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        msg: state.signin.msg
     };
}

const reduxFormSignin = reduxForm({
    form:'signin'
})(Signin);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);