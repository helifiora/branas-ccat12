import { CarPlate } from "./car-plate.ts";
import { Cpf } from "./cpf.ts";
import { Email } from "./email.ts";
import { UUID } from "./uuid.ts";

export class Driver {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: Email,
    readonly document: Cpf,
    readonly carPlate: CarPlate,
  ) {}

  static create(name: string, email: string, document: string, carPlate: string): Driver {
    return new Driver(UUID.create(), name, new Email(email), new Cpf(document), new CarPlate(carPlate));
  }
}
