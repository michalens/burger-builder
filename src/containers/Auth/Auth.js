import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import './Auth.css'

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			},
		},
		isSignUp: true
	}

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	checkValidity = (value, rules) => {
		let isValid = true;
		
		if ( !rules ) {
            return true;
        }
		
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		
		if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
		}
		
		return isValid
	}

	inputChangedHandler = (event, controlName) => {
		const eventValue = event.target.value;
	    this.setState(prevState => {
            const updatedControls = {
                ...prevState.controls,
            };
            const updatedFormElement = {
                ...updatedControls[controlName],
            };
            updatedFormElement.value = eventValue;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
	        updatedControls[controlName] = updatedFormElement;

            return { controls: updatedControls };
        });
	}

	sumbitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {isSignUp: !prevState.isSignUp}
		})
	}


	render () {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			})
		}

		let form = formElementsArray.map(formElement => (
			<Input 
				key={formElement.id}
				elementType={formElement.config.elementType} 
				elementConfig={formElement.config.elementConfig} 
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		))

		if (this.props.loading) {
			form = <Spinner />
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message.replace(/_/g, ' ')}</p>
			)
		}

		let authRedirect = null;
		
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}
		
		return (
			<div className='Auth'>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.sumbitHandler}>
					{form}
					<Button btnType='Success'>SUBMIT</Button>
				</form>
				<Button 
					btnType='Danger' 
					clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath

	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
	