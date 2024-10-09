import {PaymentDetails} from "./PaymentDetails";

export class Customer{
    id: number;
    name: string;
    email: string;
    phoneNumber: number;
    paymentDetails: PaymentDetails;
}