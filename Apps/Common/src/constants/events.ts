export enum EventName {
    OrderCreated = 'OrderCreated',
    OrderCancelled = 'OrderCancelled',
    OrderCompleted = 'OrderCompleted',
    PaymentAccepted = 'PaymentAccepted',
    PaymentDeclined = 'PaymentDeclined',
    WorkerSearchStarted = 'WorkerSearchStarted',
    WorkerSearchCompleted = 'WorkerSearchCompleted',
    WorkerAcceptedJob = 'WorkerAcceptedJob',
    WorkerDeclinedJob = 'WorkerDeclinedJob',
    DeliveryStarted = 'DeliveryStarted',
    DeliveryAborted = 'DeliveryAborted',
    DeliveryCompleted = 'DeliveryCompleted',
}