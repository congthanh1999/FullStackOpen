import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post("/exercises", (req, res) => {
  const dailyExercises = req.body["daily_exercises"];
  const target = req.body.target;

  for (const value of dailyExercises) {
    if (isNaN(value)) {
      res.json({ error: "malformatted parameters" });
    }
  }

  if (isNaN(target)) {
    res.json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyExercises, target);

  res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`connected to server on PORT: ${PORT}`);
});
