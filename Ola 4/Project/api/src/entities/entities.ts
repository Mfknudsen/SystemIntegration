import { Entity, ObjectId, ObjectIdColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class OtherInfo {

  @PrimaryColumn()
  id!: number;

  @Column()
  size!: string;

  @Column()
  type!: string;
}

@Entity()
export class Trailer {
  @ObjectIdColumn()
  trailerId!: ObjectId;

  @Column()
  locationId!: string;

  @Column(() => OtherInfo)
  otherInfo!: OtherInfo;
}

@Entity()
export class PaymentDetails {
  @ObjectIdColumn()
  paymentId!: ObjectId;

  @Column()
  paymentMethod!: string;

  @Column()
  cardNumber!: number;
}

@Entity()
export class Customer {
  @ObjectIdColumn()
  customerId!: ObjectId;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: number;

  @Column(() => PaymentDetails)
  paymentDetails!: PaymentDetails;
}


@Entity()
export class Booking {
  @ObjectIdColumn()
  bookingId!: ObjectId;

  @Column()
  trailerId!: string;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
  status!: string;

  @Column(() => Insurance)
  insurance!: Insurance | null;

  @Column()
  lateFee!: number;
}

@Entity()
export class Insurance {
  @ObjectIdColumn()
  insuranceId!: ObjectId;

  @Column()
  fee!: number;

  @Column()
  coverageDetails!: string;

  @Column()
  endTime!: string;
}

@Entity()
export class Address {
  @ObjectIdColumn()
  addressId!: ObjectId;

  @Column()
  street!: string;

  @Column()
  number!: number;

  @Column()
  postalCode!: string;

  @Column()
  city!: string;
}

@Entity()
export class Location {
  @ObjectIdColumn()
  locationId!: ObjectId;

  @Column()
  name!: string;

  @Column(() => Address)
  address!: Address;
}

