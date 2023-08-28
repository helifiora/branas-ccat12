import { UseCase } from "./use-case.ts";
import { PassengerRepository } from "../repository/passenger-repository.ts";

type Input = { id: string };
type Output = { passenger: any | null };

export class GetPassenger implements UseCase<Input, Output> {
  #passengerRepo: PassengerRepository;

  constructor(passengerRepo: PassengerRepository) {
    this.#passengerRepo = passengerRepo;
  }

  async execute(input: Input): Promise<Output> {
    const result = await this.#passengerRepo.get(input.id);
    return { passenger: result };
  }
}
