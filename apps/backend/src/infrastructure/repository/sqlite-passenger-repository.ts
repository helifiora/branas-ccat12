import sqlite3 from "better-sqlite3";
import { join, resolve } from "node:path";
import { Passenger } from "../../domain/passenger.ts";
import { Email } from "../../domain/email.ts";
import { Cpf } from "../../domain/cpf.ts";
import { PassengerRepository } from "../../application/repository/passenger-repository.ts";

const basePath = resolve("..", "..");

export class SqlitePassengerRepository implements PassengerRepository {
  async save(passenger: Passenger): Promise<void> {
    try {
      const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
      db.prepare("INSERT INTO passenger (id, name, email, document) VALUES(?, ?, ?, ?)").run(
        passenger.id,
        passenger.name,
        passenger.email.value,
        passenger.document.value,
      );
    } catch (e) {}
  }

  async get(id: string): Promise<Passenger | null> {
    try {
      const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
      const data = db.prepare("SELECT * from passenger WHERE id = ?").get(id);
      if (data === null || data === undefined) {
        return null;
      }

      const { name, document, email } = data as { name: string; document: string; email: string };
      return new Passenger(id, name, new Email(email), new Cpf(document));
    } catch (e) {
      return null;
    }
  }
}
