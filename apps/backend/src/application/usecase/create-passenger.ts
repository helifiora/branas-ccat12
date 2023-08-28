import { UseCase } from "./use-case.ts";
import { PassengerRepository } from "../repository/passenger-repository.ts";
import { Passenger } from "../../domain/passenger.ts";

type Input = { name: string; email: string; document: string };
type Output = { id: string };

export class CreatePassenger implements UseCase<Input, Output> {
  #passengerRepo: PassengerRepository;

  constructor(passengerRepo: PassengerRepository) {
    this.#passengerRepo = passengerRepo;
  }

  async execute(input: Input): Promise<Output> {
    try {
      const passenger = Passenger.create(input.name, input.email, input.document);
      await this.#passengerRepo.save(passenger);
      return { id: passenger.id };
    } catch (e) {
      return { id: "" };
    }
  }
}
