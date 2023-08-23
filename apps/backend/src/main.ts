import express, { json } from "express";
import { Ride } from "./ride.ts";

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

app.listen(3000);
