import express, { json } from "express";
import { Cpf } from "./domain/cpf.ts";
import { CalculateRide } from "./application/usecase/calculate-ride.ts";
import { CreatePassenger } from "./application/usecase/create-passenger.ts";
import { CreateDriver } from "./application/usecase/create-driver.ts";
import { GetDriver } from "./application/usecase/get-driver.ts";
import { GetPassenger } from "./application/usecase/get-passenger.ts";
import { SQLiteDriverRepository } from "./infrastructure/repository/sqlite-driver-repository.ts";
import { SqlitePassengerRepository } from "./infrastructure/repository/sqlite-passenger-repository.ts";

const app = express();
app.use(json());

app.post("/calculate-ride", async (req, res) => {
  try {
    const useCase = new CalculateRide();
    const { price } = await useCase.execute(req.body.segments);
    res.json({ price });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Unknown error!" });
    }
  }
});

app.post("/passengers", async (req, res) => {
  const body = req.body as Partial<{ document: string; name: string; email: string }>;
  if (!body.document || !body.name || !body.email) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  if (!Cpf.isValid(body.document)) {
    return res.status(400).json({ message: "Invalid CPF!" });
  }

  try {
    const repo = new SQLiteDriverRepository();
    const useCase = new CreatePassenger(repo);
    const { id } = await useCase.execute({ email: body.email, document: body.document, name: body.name });

    return res.json({ id });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
});

app.get("/passengers/:id", async (req, res) => {
  const repo = new SqlitePassengerRepository();
  const useCase = new GetPassenger(repo);
  const result = await useCase.execute({ id: req.params.id });
  return res.json(result);
});

app.post("/drivers", async (req, res) => {
  const body = req.body as Partial<{ document: string; name: string; email: string; carPlate: string }>;
  if (!body.document || !body.carPlate || !body.name || !body.email) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  if (!Cpf.isValid(body.document)) {
    return res.status(400).json({ message: "Invalid CPF!" });
  }

  try {
    const useCase = new CreateDriver(new SQLiteDriverRepository());
    const { id } = await useCase.execute({
      name: body.name,
      carPlate: body.carPlate,
      document: body.document,
      email: body.email,
    });

    return res.json({ id });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
});

app.get("/drivers/:id", async (req, res) => {
  const useCase = new GetDriver(new SQLiteDriverRepository());
  const result = await useCase.execute({ id: req.params.id });
  return res.json(result);
});

app.listen(3000);
