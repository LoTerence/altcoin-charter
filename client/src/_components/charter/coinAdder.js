// The block in the coinUList component that lets the user add a new AltCoin

//TODO: add custom styling

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addCoin } from '../../_store/actions/coinList'; 

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" placeholder="Altcoin Symbol, i.e. BTC, LTC..."/>
        </div>
    );
}

class CoinAdder extends Component {
    handleFormSubmit(coin_symbol){
        this.props.addCoin(coin_symbol);
    }

    renderAlert() {
        if ( this.props.errorMessage ) {
            return (
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
            );
        }   
    } 

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="col-md-4 col-sm-6">
                <label>Add a new coin to the list</label>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="input-group">
                        <Field
                            name="symbol"
                            component={renderInput} 
                            type="string"
                            />
                        <span>
                            <button className="btn btn-success" action="submit">Add</button>
                        </span>
                    </fieldset>
                </form>
                {this.renderAlert()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {  
    return { 
        errorMessage: state.coinList.error
     };
};

const mapDispatchToProps = (dispatch) => {
    return{
        addCoin: (coin_symbol) => dispatch(addCoin(coin_symbol))
    };
};

const reduxFormCoinAdder = reduxForm({
    form:'CoinAdder'
})(CoinAdder);


export default connect(mapStateToProps, mapDispatchToProps)(reduxFormCoinAdder);
