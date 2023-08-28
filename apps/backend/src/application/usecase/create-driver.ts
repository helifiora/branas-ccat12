import { UseCase } from "./use-case.ts";
import { Cpf } from "../../domain/cpf.ts";
import { randomUUID } from "node:crypto";
import { DriverRepository } from "../repository/driver-repository.ts";

type Input = { name: string; email: string; document: string; carPlate: string };
type Output = { id: string };

export class CreateDriver implements UseCase<Input, Output> {
  #driverRepo: DriverRepository;

  constructor(driverRepo: DriverRepository) {
    this.#driverRepo = driverRepo;
  }

  async execute(input: Input): Promise<Output> {
    const cpf = new Cpf(input.document);
    const id = randomUUID();

    await this.#driverRepo.save({
      id,
      name: input.name,
      email: input.email,
      carPlate: input.carPlate,
      cpf,
    });

    return { id };
  }
}
