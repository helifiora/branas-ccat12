import { beforeEach, expect, test } from "vitest";
import { Ride } from "../src/ride.ts";

let ride: Ride;

beforeEach(() => {
  ride = new Ride();
});

test("Should calculate price of a ride", () => {
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(21);
});

test("Should calculate price of a ride at night", () => {
  ride.addSegment(10, new Date("2021-03-01T23:00:00"));
  expect(ride.calculate()).toBe(39);
});

test("Should calculate price of a ride in sunday", async () => {
  ride.addSegment(10, new Date("2021-03-07T10:00:00"));
  expect(ride.calculate()).toBe(29);
});

test("Should calculate price of a ride in sunday at night", () => {
  ride.addSegment(10, new Date("2021-03-07T23:00:00"));
  expect(ride.calculate()).toBe(50);
});

test("Should return -1 if distance is invalid", () => {
  expect(() => ride.addSegment(-10, new Date("2021-03-07T23:00:00"))).toThrowError();
});

test("Should return -1 if date is invalid", () => {
  expect(() => ride.addSegment(10, new Date("213javascript"))).toThrowError();
});

test("Should calculate price when value is lower than minimum", () => {
  ride.addSegment(3, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(10);
});

test("Should calculate price with multiple segments", () => {
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(42);
});
