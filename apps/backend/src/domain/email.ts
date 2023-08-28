export class Email {
  readonly value: string;

  constructor(value: string) {
    if (!Email.isValid(value)) {
      throw new EmailInvalidError(value);
    }

    this.value = value;
  }

  static isValid(value: string): boolean {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }
}

export class EmailInvalidError extends Error {
  constructor(readonly value: string) {
    super();
  }
}
