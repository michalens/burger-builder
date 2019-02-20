import React, { Component } from 'react';
import Button from '../../UI/Button/Button'

//can turn back to functional
class OrderSummary extends Component {
	// componentWillUpdate() {
	// 	console.log()
	// }

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
			  .map(igKey => (
			  	<li key={igKey}>
			  		<span style={{textTransform: 'capitalize'}}>
			  			{igKey}:
			  		</span> 
			  		{this.props.ingredients[igKey]}
			  	</li>
			  	))
		return (
			<>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button clicked={this.props.purchaseCanceled} btnType={'Danger'}>CANCEL</Button>
				<Button clicked={this.props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
			</>
		) 	
	}
}

export default OrderSummary;
	