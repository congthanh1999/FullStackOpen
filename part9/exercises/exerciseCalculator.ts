type Rating = 1 | 2 | 3;
type RatingDescription =
  | "barely reached the goal"
  | "almost reached the goal"
  | "reached the goal";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d !== 0).length;
    const success = 

  return {
    periodLength: dailyHours,
  };
};
