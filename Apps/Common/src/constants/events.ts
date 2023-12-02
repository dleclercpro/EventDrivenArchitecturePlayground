export enum EventName {
    OrderCreated = 'OrderCreated',
    OrderCancelled = 'OrderCancelled',
    OrderCompleted = 'OrderCompleted',
    PaymentSuccess = 'PaymentSuccess',
    PaymentFailure = 'PaymentFailure',
    WorkerSearchStarted = 'WorkerSearchStarted',
    WorkerSearchCompleted = 'WorkerSearchCompleted',
    WorkerAcceptedJob = 'WorkerAcceptedJob',
    WorkerRefusedJob = 'WorkerRefusedJob',
    DeliveryStarted = 'DeliveryStarted',
    DeliveryAborted = 'DeliveryAborted',
    DeliveryCompleted = 'DeliveryCompleted',
}