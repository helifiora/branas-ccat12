import { Driver } from "../../domain/driver.ts";

export interface DriverRepository {
  save(driver: Driver): Promise<void>;
  get(id: string): Promise<Driver | null>;
}
