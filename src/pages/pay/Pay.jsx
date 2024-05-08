import React, { useEffect, useState } from 'react';
import './Pay.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const stripePromise = loadStripe(
  "pk_test_51P3uwhSG8Anw27tbweiaQMhy3vgSrUmavEx0DHlWmVQBBLkyTQ5K0cL8X1pqSawwUr2nILOET84unMhI2hR7i3Pq00mqlVwnAd"
);

const Pay = () => {

  const [clientSecret, setClientSecret] = useState("");

  const {id} = useParams();

  useEffect(()=>{
    const makeRequest = async ()=> {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay