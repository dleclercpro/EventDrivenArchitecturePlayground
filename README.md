# EventDrivenArchitecturePlayground

## Description
This is a small suite of Node applications, meant to be deployed as independent services within an event-driven architecture (EDA). The use case behind this architecture is the implementation of the backend of a simple online shop.

## Services
In this system, every individual service (or app) has a unique responsibility. Services communicate with each other via the emission of events to a broker. The latter is responsible for the notification of every service that's subscribed to a given event, whenever such an event is emitted. Here are the services which are part of the shop's EDA:

### Order
This service takes care of order creation/deletion.

### Payment
This service takes care of order payments.

### Delivery
This services takes care of order shipments.

## Event Flow
Below is a diagram of the event flow implemented in this app. Each square represents the emission of an event. Each diamond represents a process, which takes place in one of the aforementioned services.

<p align="center" width="100%">
  <img alt="Event Flow" src="./Diagrams/EventFlow.drawio.svg" width="75%" />
</p>