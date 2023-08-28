import { randomUUID } from "node:crypto";

export class UUID {
  static create(): string {
    return randomUUID();
  }
}
