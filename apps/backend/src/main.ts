import express, { json } from "express";
import { Ride } from "./ride.ts";
import { randomUUID } from "node:crypto";
import sqlite3 from "better-sqlite3";
import { resolve, join } from "node:path";
import { Cpf } from "./cpf.ts";

const basePath = resolve("..", "..");

const app = express();
app.use(json());

app.post("/calculate-ride", (req, res) => {
  try {
    const ride = new Ride();

    for (const rawSegment of req.body.segments) {
      ride.addSegment(Number(rawSegment.distance), new Date(rawSegment.date));
    }

    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Unknown error!" });
    }
  }
});

app.post("/passengers", (req, res) => {
  const body = req.body as Partial<{ document: string; name: string; email: string }>;
  if (!body.document || !body.name || !body.email) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  if (!Cpf.isValid(body.document)) {
    return res.status(400).json({ message: "Invalid CPF!" });
  }

  try {
    const cpf = new Cpf(body.document);
    const passengerId = randomUUID();
    const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
    db.prepare("INSERT INTO passenger (id, name, email, document) VALUES(?, ?, ?, ?)").run(
      passengerId,
      body.name,
      body.email,
      cpf.value,
    );

    return res.json({ id: passengerId });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
});

app.get("/passengers/:id", (req, res) => {
  const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
  const result = db.prepare("SELECT * from passenger WHERE id = ?").get(req.params.id);
  return res.json(result);
});

app.post("/drivers", (req, res) => {
  const body = req.body as Partial<{ document: string; name: string; email: string; carPlate: string }>;
  if (!body.document || !body.carPlate || !body.name || !body.email) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  if (!Cpf.isValid(body.document)) {
    return res.status(400).json({ message: "Invalid CPF!" });
  }

  try {
    const cpf = new Cpf(body.document);
    const passengerId = randomUUID();
    const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
    db.prepare("INSERT INTO passenger (id, name, email, document, car_plate) VALUES(?, ?, ?, ?, ?)").run(
      passengerId,
      body.name,
      body.email,
      cpf.value,
      body.carPlate,
    );

    return res.json({ id: passengerId });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
});

app.get("/drivers/:id", (req, res) => {
  const db = sqlite3(join(basePath, "data.db"), { fileMustExist: true });
  const result = db.prepare("SELECT * from passenger WHERE id = ?").get(req.params.id);
  return res.json(result);
});

app.listen(3000);
