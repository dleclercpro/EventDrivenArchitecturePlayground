import { EventName } from '../constants/events';

export enum Environment {
    Development = 'development',
    Test = 'test',
    Production = 'production',
}

export enum TimeUnit {
    Days = 'd',
    Hours = 'h',
    Minutes = 'm',
    Seconds = 's',
    Milliseconds = 'ms',
}

export enum MemoryUnit {
    Terabytes = 'TB',
    Gigabytes = 'GB',
    Megabytes = 'MB',
    Kilobytes = 'KB',
    Bytes = 'B',
}

export interface VersionedData <Data> {
    version: number,
    data: Data,
}

export interface Comparable {
    compare(other: Comparable): -1 | 0 | 1;
    smallerThan(other: Comparable): boolean;
    smallerThanOrEquals(other: Comparable): boolean;
    equals(other: Comparable): boolean;
    greaterThanOrEquals(other: Comparable): boolean;
    greaterThan(other: Comparable): boolean;
}

export type Event<Data = any> = {
    id: string,
    name: EventName,
    data?: Data,
};

export type User = {
    email: string,
}

export type Order = {
    id: string,
    userId: string,
    productId: string,
    startTime: Date,
    endTime?: Date,
}

export type Delivery = {
    id: string,
    orderId: string,
    workerId: string,
    startTime: Date,
    endTime?: Date,
}