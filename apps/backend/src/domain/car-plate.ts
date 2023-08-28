export class CarPlate {
  readonly value: string;

  constructor(value: string) {
    if (!CarPlate.isValid(value)) {
      throw new CarPlateInvalidError(value);
    }

    this.value = value;
  }

  static isValid(value: string): boolean {
    return /^[A-Z]{3}[0-9]{4}$/.test(value);
  }
}

export class CarPlateInvalidError extends Error {
  constructor(value: string) {
    super();
  }
}
