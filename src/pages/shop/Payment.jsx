import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm ';
import useCart from '../../hooks/UseCart';


// .env crteate
const stripePromise = loadStripe('pk_test_51QBBK4Gvh63Q3Un0MG3VvJdoN3TmK53S6UU9br0Wg3rUCAqIHmJIAlBMYkenwOdqbXVrsEm8ylB2V9uaCrMFhHOw00kFTa8VrG');
const Payment = () => {
    // console.log(stripePromise)
  const [cart]=useCart();
  console.log(cart)
  const cartTotal=cart.reduce((sum,item)=>sum+item.price,0)
  const totalPrice=parseFloat(cartTotal.toFixed(2));
  console.log(totalPrice);


  return (
    <div className=' max-w-screen-2xl container mx-auto xl:px-24 py-28 '>
        <Elements stripe={stripePromise}>
      <CheckoutForm cart={cart}  price={totalPrice} />
    </Elements>
    </div>
  )
}

export default Payment