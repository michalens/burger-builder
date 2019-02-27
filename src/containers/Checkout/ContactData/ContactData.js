import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import './ContactData.css'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'email',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Email'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: ''
			},
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false})	
				this.props.history.push('/')
			})
			.catch(err => {
				this.setState({loading: false})	
			})
	}

	render() {
		let form = (
			<form>
				<Input elementType='...' elementConfig='...' value= '...' />
				<Input elementType='...' elementConfig='...' value= '...' />
				<Input elementType='...' elementConfig='...' value= '...' />
				<Input elementType='...' elementConfig='...' value= '...' />
				<Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
			</form>
		);
		if (this.state.loading === true) {
			form = <Spinner />
		}
		return (
			<div className='ContactData'>
				<h4>Enter your contact data</h4>
				{form}	
			</div>
		)
	}
}

export default ContactData;
	