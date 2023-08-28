import { UseCase } from "./use-case.ts";
import { Ride } from "../../ride.ts";

type SegmentInput = { distance: string; date: string };

type Input = { segments: SegmentInput[] };

type Output = { price: number };

export class CalculateRide implements UseCase<Input, Output> {
  async execute(input: Input): Promise<Output> {
    const ride = new Ride();

    for (const rawSegment of input.segments) {
      ride.addSegment(Number(rawSegment.distance), new Date(rawSegment.date));
    }

    const price = ride.calculate();

    return { price };
  }
}
