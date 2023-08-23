import { Segment } from "./segment.ts";

const overnightFare = 3.9;
const overnightSundayFare = 5.0;
const sundayFare = 2.9;
const fare = 2.1;
const minimumPrice = 10.0;

export class Ride {
  #segments: Segment[] = [];

  addSegment(distance: number, date: Date): void {
    this.#segments.push(new Segment(distance, date));
  }

  calculate(): number {
    let price = 0;

    for (const segment of this.#segments) {
      if (segment.isOvernight()) {
        if (segment.isSunday()) {
          price += segment.distance * overnightSundayFare;
        } else {
          price += segment.distance * overnightFare;
        }
      } else {
        if (segment.isSunday()) {
          price += segment.distance * sundayFare;
        } else {
          price += segment.distance * fare;
        }
      }
    }

    return price < minimumPrice ? minimumPrice : price;
  }
}
