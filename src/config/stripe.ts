import Stripe from 'stripe';

export const stripe = new Stripe('sk_test_51NzGfySDvTjA1b0vbXzJ4jQEd4lWeaMqzs9KDCOAU8NUEsoSIGHmeIImn9tdc92xsmSOQARVmtHhwbcOsf2gQOO900HwQVf4J5', {
  apiVersion: '2023-08-16',
});

console.log(stripe);


