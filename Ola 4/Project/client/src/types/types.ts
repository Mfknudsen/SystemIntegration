export type Customer = {
  customerId: string;
  name: string;
  email: string;
  phoneNumber: number;
  paymentDetails: PaymentDetails;
};

export type PaymentDetails = {
  paymentId: string;
  paymentMethod: string;
  cardNumber: number;
};

export type Booking = {
  bookingId: string;
  trailerId: string;
  startTime: Date;
  endTime: Date;
  insurance: Insurance | null;
  lateFee: boolean;
};

export type Insurance = {
  insuranceId: string;
  fee: number;
  coverageDetails: string;
  endTime: Date;
};

export type Trailer = {
  trailerId: string;
  locationId: string;
  status: string;
  otherInfo: {
    size: string;
    type: string;
  };
};

export type Location = {
  locationId: string;
  name: string;
  address: Address;
};

export type Address = {
  addressId: string;
  street: string;
  number: number;
  postalCode: number;
  city: string;
};

/* eslint-disable no-unused-vars */
export enum TASK_CATEGORIES {
  NONE = 0,
  WORK = 1,
  CHORES = 2,
  LEISURE = 3
}