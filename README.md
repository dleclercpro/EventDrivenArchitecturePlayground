# EventDrivenArchitecturePlayground

## Description
This is a small suite of Node applications, meant to be deployed as independent services within an event-driven architecture (EDA). The use case behind this architecture is the implementation of the backend of a simple online shop.

## How do I run it?
In order to bring the system up, ensure you have Docker installed, as well as its Compose feature. Then, inside the root directory of the project, run the following command in your terminal:

```
docker compose up
```

This should create containers for all services within the app. In order to test the latter, go to the following URL in your browser:

```
http://localhost:4000/scenario/1
```

This will launch a cascade of events, which will:
- Create a dummy order for you
- Try and cash in your payment
- Dispatch your order to a worker, until one completes the job and the order is delivered to your door

You can have a look at the logs in your terminal to see this happen in real time. :-)

## Microservices
In this system, every individual microservice (or app) has a unique domain of responsibilities. Services communicate with each other via the emission of events to a broker. Here is a list of short descriptions for said services:

- <strong>Broker:</strong> This service takes care of relaying events in-between service.
- <strong>Order:</strong> This service takes care of order creation/deletion.
- <strong>Payment:</strong> This service takes care of order payments.
- <strong>Delivery:</strong> This services takes care of order shipments.

## Architecture
Below is a diagram of the architecture of this app. For now, the broker is responsible of the communication with the browser. There is no frontend, per se, that's part of this prototype.

<p align="center" width="100%">
  <img alt="Event-Driven Architecture" src="./Diagrams/EventDrivenArchitecture.drawio.svg" width="75%" />
</p>

## Event Flow
Below is a diagram of the event flow implemented in this app. Each square represents the emission of an event. Each diamond represents a process, which takes place in one of the aforementioned services.

<p align="center" width="100%">
  <img alt="Event Flow" src="./Diagrams/EventFlow.drawio.svg" width="75%" />
</p>