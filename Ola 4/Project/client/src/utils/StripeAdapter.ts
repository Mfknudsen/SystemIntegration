import {Stripe} from "stripe";

const apiKey = "sk_test_51Q9kMkFpImY9hrD4SNtwYUp8z7y411DmXJ2sA3ahnPxmGcUT34ylDpJSVArqQpRVlkmFHFsXzkwszTi7cJaPEwR500E6HrAWDf"

export class StripeAdapter {
    private stripe: Stripe;

    constructor(secretKey: string) {
        this.stripe = new Stripe(apiKey);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async createCustomer(email: string) {
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email address");
        }

        const customer = await this.stripe.customers.create({
            email,
        });

        return customer;
    }

    async createPayment(amount: number, currency: string, source: string) {
        const payment = await this.stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
            payment_method: source,
            confirm: true,
        });

        return payment;
    }

    async confirmPayment(paymentId: string) {
        const payment = await this.stripe.paymentIntents.confirm(paymentId);
        return payment;
    }

    async pay(amount: number, currency: string, source: string) {
        let payment = await this.createPayment(amount, currency, source)
        payment = await this.confirmPayment(payment.id)
        return payment;
    }

    async addTestCard(email: string) {
        const customer = await this.createCustomer(email);
        const testToken = 'tok_visa'; // Stripe's test token for the card 4242424242424242

        const paymentMethod = await this.stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: testToken,
            },
        });

        await this.stripe.paymentMethods.attach(paymentMethod.id, {
            customer: customer.id,
        });

        return paymentMethod;
    }
}