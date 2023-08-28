export class Cpf {
  readonly value: string;

  constructor(value: string) {
    if (!Cpf.isValid(value)) {
      throw new CpfInvalidError(value);
    }

    this.value = this.#format(value);
  }

  #format(raw: string): string {
    const onlyDigits = raw.replace(/\D/g, "");
    const firstPart = onlyDigits.slice(0, 3);
    const secondPart = onlyDigits.slice(3, 6);
    const thirdPart = onlyDigits.slice(6, 9);
    const digits = onlyDigits.slice(9);
    return `${firstPart}.${secondPart}.${thirdPart}-${digits}`;
  }

  static isValid(value: string): boolean {
    const digits = Cpf.#parseToDigits(value);
    if (!Cpf.#hasCorrectSize(digits) || Cpf.#isDigitsEqual(digits)) {
      return false;
    }

    const calculatedFirstCheckDigit = Cpf.#calculateCheckDigit(digits);
    const calculatedSecondCheckDigit = Cpf.#calculateCheckDigit(digits, calculatedFirstCheckDigit);

    const calculatedCheckDigits = `${calculatedFirstCheckDigit}${calculatedSecondCheckDigit}`;
    const checkDigits = `${digits[9]}${digits[10]}`;

    return checkDigits === calculatedCheckDigits;
  }

  static #calculateCheckDigit(digits: number[], firstDigit: number | null = null): number {
    const factor = firstDigit === null ? 10 : 11;
    const initial = firstDigit === null ? 0 : firstDigit * 2;

    const sumDigits = digits
      .slice(0, 9)
      .reduce((previous, value, index) => previous + value * (factor - index), initial);

    const rest = sumDigits % 11;

    return rest < 2 ? 0 : 11 - rest;
  }

  static #hasCorrectSize(value: number[]): boolean {
    return value.length === 11;
  }

  static #isDigitsEqual(value: number[]): boolean {
    return value.every((d) => d === value[0]);
  }

  static #parseToDigits(value: string): number[] {
    return value
      .replace(/\D/g, "")
      .split("")
      .map((s) => parseInt(s));
  }
}

export class CpfInvalidError extends Error {
  constructor(readonly value: string) {
    super();
  }
}
