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
  trailer: Trailer;
  startTime: Date;
  endTime: Date;
  insurance: Insurance | null;
  lateFee: number;

};

export type BookTrailerForm = {
  trailerId: string;
  insurance: boolean;
}

export type Insurance = {
  insuranceId: string;
  fee: number;
  coverageDetails: string;
  endTime: string;
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
  postalCode: string;
  city: string;
};
