enum Rating {
  BarelyReached = 1,
  AlmostReached = 2,
  Reached = 3,
}

enum RatingDescription {
  BarelyReached = "barely reached the goal",
  AlmostReached = "almost reached the goal",
  Reached = "reached the goal",
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d !== 0).length;
  const average = dailyHours.reduce((acc, curr) => acc + curr) / periodLength;
  const success = average >= target ? true : false;

  return {
    periodLength,
    trainingDays,
    success,
    rating: Rating.AlmostReached,
    ratingDescription: RatingDescription.AlmostReached,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
