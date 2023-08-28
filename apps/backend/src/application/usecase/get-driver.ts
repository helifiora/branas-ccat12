import { UseCase } from "./use-case.ts";
import { DriverRepository } from "../repository/driver-repository.ts";

type Input = { id: string };
type Output = { driver: any | null };

export class GetDriver implements UseCase<Input, Output> {
  #driverRepo: DriverRepository;

  constructor(driverRepo: DriverRepository) {
    this.#driverRepo = driverRepo;
  }

  async execute(input: Input): Promise<Output> {
    const driver = await this.#driverRepo.get(input.id);

    return { driver };
  }
}
