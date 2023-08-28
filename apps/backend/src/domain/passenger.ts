import { Email } from "./email.ts";
import { Cpf } from "./cpf.ts";
import { UUID } from "./uuid.ts";

export class Passenger {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: Email,
    readonly document: Cpf,
  ) {}

  static create(name: string, email: string, document: string): Passenger {
    return new Passenger(UUID.create(), name, new Email(email), new Cpf(document));
  }
}
