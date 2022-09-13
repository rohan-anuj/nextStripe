// ./utils/get-stripejs.ts
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC);
  }
  return stripePromise;
};

export default getStripe;