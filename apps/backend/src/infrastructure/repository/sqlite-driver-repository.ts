import sqlite3 from "better-sqlite3";
import { join, resolve } from "node:path";
import { DriverRepository } from "../../application/repository/driver-repository.ts";
import { Driver } from "../../domain/driver.ts";
import { Email } from "../../domain/email.ts";
import { Cpf } from "../../domain/cpf.ts";
import { CarPlate } from "../../domain/car-plate.ts";

const basePath = resolve("..", "..");

export class SQLiteDriverRepository implements DriverRepository {
  async save(driver: Driver): Promise<void> {
    try {
      const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
      db.prepare("INSERT INTO passenger (id, name, email, document, car_plate) VALUES(?, ?, ?, ?, ?)").run(
        driver.id,
        driver.name,
        driver.email.value,
        driver.document.value,
        driver.carPlate.value,
      );
    } catch (e) {}
  }

  async get(id: string): Promise<Driver | null> {
    try {
      const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
      const data = db.prepare("SELECT * from driver WHERE id = ?").get(id);
      if (data === null || data === undefined) {
        return null;
      }

      const {
        name,
        document,
        email,
        car_plate: carPlate,
      } = data as {
        name: string;
        document: string;
        email: string;
        car_plate: string;
      };

      return new Driver(id, name, new Email(email), new Cpf(document), new CarPlate(carPlate));
    } catch (e) {
      return null;
    }
  }
}
