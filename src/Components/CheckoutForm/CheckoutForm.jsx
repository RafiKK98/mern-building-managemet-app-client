import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useAgreement from "../../Hooks/useAgreement";
import moment from 'moment';
import Swal from "sweetalert2"

const CheckoutForm = () => {

    const [ error, setError ] = useState('');
    const [ clientSecret, setClientSecret ] = useState('');
    const [ transactionId, setTransactionId ] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [ agreement, ] = useAgreement();

    useEffect(() => {
        const rent = agreement.rent;
        if (rent > 0) {
            axiosSecure.post('/create-payment-intent', { price: rent })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }

    }, [axiosSecure, agreement.rent]);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(`Payment error: ${error}`);
            setError(error.message);
        } else {
            console.log(`Payment method: ${paymentMethod}`);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log(`Confirm error: ${confirmError}`);
        } else {
            console.log(`Payment intent: ${paymentIntent}`);
            if (paymentIntent.status === 'succeeded') {
                console.log(`Transaction ID: ${paymentIntent.id}`);
                setTransactionId(paymentIntent.id);

                // Save payment data in the database 
                const paymentData = {
                    email: user.email,
                    amount: agreement.rent,
                    transactionId: paymentIntent.id,
                    date: moment().format('Do-MMM-YYYY'),
                }

                const res = await axiosSecure.post('/payments', paymentData);
                console.log(`Payment saved: ${res.data.paymentResult}`);

                if (res.data) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment confirmed!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }
    }

    return (
        <form onSubmit={handlePayment}>
            <div className="flex flex-col gap-4 mb-4">
                <input type="text" name="" id="" value={`Email: ${agreement.email}`} className="input input-disabled rounded-md p-4" />
                <input type="text" name="" id="" value={`Floor no: ${agreement.floor_no}`} className="input input-disabled rounded-md p-4" />
                <input type="text" name="" id="" value={`Block name: ${agreement.block_name}`} className="input input-disabled rounded-md p-4" />
                <input type="text" name="" id="" value={`Apartment no: ${agreement.apartment_no}`} className="input input-disabled rounded-md p-4" />
            </div>
            <div className="mb-4">
                <p className="text-[#899694] text-base font-normal">Pay with Credit Card: </p>
            </div>
            <CardElement
                className="border rounded-md p-4"
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
            <div className="flex justify-between items-center">
                <div className="text-[#16322E] text-base font-normal">
                    Your Service  charged will be <span className="font-bold">${agreement.rent}</span>
                </div>
                <button className="btn btn-info btn-md lg:btn-wide my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay 
                </button>
            </div>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    )
}

export default CheckoutForm