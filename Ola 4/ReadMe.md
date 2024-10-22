# System Integration - Ola 4

**Authors:** Kristofer, Mads, Michael, and Søren

## Table of Contents
- [Monolith](#monolith)
- [Refactoring/MicroServices](#refactoringmicroservices)
- [Aggregates](#aggregates)
  - [User Aggregate](#user-aggregate)
  - [Booking Aggregate](#booking-aggregate)
- [Entities](#entities)
  - [User](#user)
  - [Trailer](#trailer)
  - [Booking](#booking)
  - [Payment](#payment)
- [Login (Users)](#login-users)
- [Booking](#booking)
- [Payment](#payment)

## Monolith

The first part of the assignment is creating a monolith approach to the trailer booking system. The refactored application can be found in `ola4/projectProto`. This system is purely a client-based monolithic system. The features we decided to implement were done using the bounded contexts we defined in the first part.

We recreated the aggregates from the previous event storming session (see `client/src/types/types.ts`).

## Refactoring/MicroServices

For the second part of the assignment, we refactored the application from a monolithic system to a microservice-oriented system. To do this, we have implemented the login/user and payment bounded contexts to use prebuilt services and created a booking/trailer backend service. The refactored application can be found in `ola4/project`.

## Aggregates

### User Aggregate

Contains the User entity and all related information, such as login and logout. It ensures that user actions are consistent and well-defined within the login bounded context.

### Booking Aggregate

This aggregate contains the Booking entity as the root, along with trailers and payments. It coordinates the entire lifecycle of the booking process, ensuring that trailer availability, user bookings, and payments are all managed consistently.

## Entities

### User

The User entity represents a person who can log in to the system and interact with it. A user has attributes like `name`, `email`, and potentially other data like role or address.

### Trailer

The Trailer entity represents the individual trailers available for booking. Each trailer has attributes like `id`, `type`, `availability`, and `location`. This entity could be complex depending on how trailers are managed in your system.

### Booking

The Booking entity represents a user’s reservation of a trailer. It ties together the User and Trailer entities and may also be linked with payment. The lifecycle of a booking includes creation, update, cancellation, and completion.

### Payment

The Payment entity represents the payment details associated with a booking. It encapsulates the user’s payment information and handles transactions.

## Login (Users)

For login, we chose to use Google's OAuth2 since it provided a quick solution for email-based login and gave us the ability to ask permission from the user to use their information within our application.

From the login, we gather the name of the user and their email. We display this information so that the user can be sure which account is currently logged in.

The login service uses an adapter (`UserAdapter`), which is called from the main `App()` and then makes use of the Google service (`GoogleAuthService`).

## Booking

For booking, we decided to create our own backend microservice, as the booking system is part of our core domain and has the most specific requirements and needs the most flexibility.

The booking service covers three main parts/APIs:
1. Getting a list of all bookings
2. Booking a trailer
3. Returning a trailer/Updating the status of the booking/trailer

These APIs are gathered in a Node.js backend connecting to a dedicated MongoDB database. The bookings are displayed in a table, showing important information such as start/end dates and the status of the booking. Once a booking has been paid for via the payment service, the booking service is called to complete the booking.

## Payment

For payment, we are using [Stripe](https://stripe.com/en-dk). Stripe has many readily available functions related to payment, and it has a free API when used for development/testing.

To follow the flow we have designed, payment can be made only when the user has returned their trailer. Once that is done, payment becomes available for the user.

To implement Stripe, we are using an adapter pattern (see `src/utils/StripeAdapter.tsx`). This has simplified the payment process. The adapter pattern takes the values from our customer entity type so that it can be used seamlessly with the rest of the application.
