import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

import axios from 'axios'
// import './Checkout.css'

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			meat: 1,
			cheese: 1
		}
	}

	componentDidMount() {
		axios.get('https://burger-builder-3ecd8.firebaseio.com/orders.json')
	}

	render() {
		return(
			<div>
				<CheckoutSummary ingredients={this.state.ingredients} />
			</div>
		)
	}
}

export default Checkout;
