export class Segment {
  constructor(
    readonly distance: number,
    readonly date: Date,
  ) {
    if (!this.isValidDate()) {
      throw new Error("Invalid Date");
    }

    if (!this.isValidDistance()) {
      throw new Error("Invalid Distance");
    }
  }

  isOvernight(): boolean {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6;
  }

  isSunday(): boolean {
    return this.date.getDay() === 0;
  }

  isValidDistance(): boolean {
    return this.distance > 0;
  }

  isValidDate(): boolean {
    return this.date.toString() !== "Invalid Date";
  }
}
