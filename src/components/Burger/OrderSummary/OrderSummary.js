import React from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients)
		  .map(igKey => (
		  	<li key={igKey}>
		  		<span style={{textTransform: 'capitalize'}}>
		  			{igKey}:
		  		</span> 
		  		{props.ingredients[igKey]}
		  	</li>
		  	))
	return (
		<>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Continue to Checkout?</p>
			<Button clicked={props.purchaseCanceled} btnType={'Danger'}>CANCEL</Button>
			<Button clicked={props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
		</>
	) 
}

export default OrderSummary;
	