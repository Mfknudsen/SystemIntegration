import {Stripe} from "stripe";
import {Customer} from "../types/types";
import React from "react";
const apiKey = "sk_test_51Q9kMkFpImY9hrD4SNtwYUp8z7y411DmXJ2sA3ahnPxmGcUT34ylDpJSVArqQpRVlkmFHFsXzkwszTi7cJaPEwR500E6HrAWDf"

export class StripeAdapter {
    private stripe: Stripe;

    constructor(_apiKey: string) {
        this.stripe = new Stripe(apiKey);
    }

    async addTestCard(_customer:Customer, setCustomer: React.Dispatch<React.SetStateAction<Customer>>) {
        const customer = await this.stripe.customers.create({ email: _customer.email });
        _customer.customerId = customer.id;
        // Use a test token instead of raw card data
        const paymentMethod = await this.stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: 'tok_visa', // Use a test token provided by Stripe
            },
        });
        await this.stripe.paymentMethods.attach(paymentMethod.id, { customer: customer.id });
        setCustomer(_customer);
        return paymentMethod;
    }

    async pay(amount: number, currency: string, paymentMethodId: string, customerId: string) {
        await this.stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            customer: customerId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,  // Enable automatic payment methods
                allow_redirects: 'never'  // Disable redirects
            }
        });
    }
}