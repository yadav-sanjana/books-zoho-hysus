import { razorpay } from "../../config/razorpay";
import { stripe } from "../../config/stripe";
import { CartModel, CustomerModel } from "../../models/customer/customerModel";

export const CheckoutController = {
    async checkout(req, res) {

        const id = req.params.customer_id
        const cart_details = await CartModel.findOne({
            where: {
                customer_id: id
            }
        })

        if (!cart_details) {
            res.status(404).send({
                message: "Not Exists"
            })

            return
        }
        const customer = await CustomerModel.findOne({
            where: {
                id
            }
        })
        try {
            // Replace 'cust_Mm74QnH8UiGFVV' with the actual Razorpay customer ID
            const razorpayCustomerId = customer?.dataValues?.razorpay_id

            const paymentData = {
                amount: cart_details?.dataValues?.payableAmount,
                currency: 'INR',
                customer_id: razorpayCustomerId,
            };

            console.log(razorpay.payments);
            

            // // Create the payment
            // razorpay.payments.createUpi(paymentData, (error, payment) => {
            //     if (error) {
            //         console.error('Error creating payment:', error);
            //         res.status(500).json({ error: 'Unable to create payment' });
            //     } else {
            //         res.status(200).json(payment);
            //     }
            // });
        } catch (error) {
            console.error('Error creating payment:', error);
            res.status(500).json({ error: 'Unable to create payment' });
        }
    }
}