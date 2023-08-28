import { Passenger } from "../../domain/passenger.ts";

export interface PassengerRepository {
  save(passenger: Passenger): Promise<void>;
  get(id: string): Promise<Passenger | null>;
}
