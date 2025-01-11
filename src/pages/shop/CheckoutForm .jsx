import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



const CheckoutForm = ({ cart, price }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [cardError,setCardError]=useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const {user} =useAuth();
  const axiosSecure =useAxiosSecure();
  const navigate=useNavigate();




  useEffect(()=>{
    if(typeof price !=='number' || price <1){
        return;
    }
    axiosSecure.post('/create-payment-intent',{
      price
    }).then(res=>{
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret);
    })

  },[price,axiosSecure])


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
    } else {
      setCardError("success")
      console.log('[PaymentMethod]', paymentMethod);
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email:user?.email || 'unknown',
          },
        },
      },
    );
    if(confirmError){
      console.log(confirmError);
    }
    
      // console.log(paymentIntent)
    if(paymentIntent.status==='succeeded'){
      // console.log(paymentIntent.id);
      setCardError(`your transaction id is ${paymentIntent.id}`)
      // payment info data
      const paymentInformation={
        email:user.email,
        transaction_id:paymentIntent.id,
        price,
        quantity:cart.length,
        status:"Order Pending",
        itemName:cart.map((item)=> item.name),
        cardItem:cart.map((item)=> item._id),
        menuItem:cart.map((item)=> item.menuItemId),
        
      }
      // console.log(paymentInformation);
      // post info to backend
      axiosSecure.post('/payment',paymentInformation)
      .then(res=>{
        // console.log(res.data);
        swal("Good job!", "payment successful!", "success");
        navigate('/order')
      })


    }
  };
  return (
    <div className=' flex flex-col sm:flex-row justify-start items-start gap-8 '>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Order <span className=' text-cusblue'>summery</span></h1>
            <p className="py-6">
              Number of items in your cart:${cart.length}
            </p>
            <p>
              Total amount : ${price}
            </p>
          </div>
          <div className="card bg-base-100 max-w-sm shrink-0 shadow-2xl w-full space-y-3 px-4 py-8 ">
            <h4 className=' text-lg font-semibold'> process your payment</h4>
            <h5 className=' font-medium'>debit/credit card</h5>
            {/* strip form */}
            <br></br>
            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 bg-orange-500 text-white' >
                Pay
              </button>
            </form>
            {
              cardError?<p className=' text-red-500 italic text-sm'>{cardError}</p>:""
            }


          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm 