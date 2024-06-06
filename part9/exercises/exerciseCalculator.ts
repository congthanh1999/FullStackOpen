type InputValues = {
  dailyHours: number[];
  target: number;
};

const parseArgs = (args: string[]): InputValues => {
  const inputArray = args.slice(2, args.length);
  const values = inputArray.map((value) => Number(value));

  if (args.length > 10) throw new Error("too many arguments");
  if (args.length < 10) throw new Error("not enough arguments");

  let flag = true;

  for (const value of values) {
    if (!isNaN(value)) {
      flag = true;
    } else {
      flag = false;
      break;
    }
  }

  if (flag) {
    return {
      dailyHours: values.slice(0, values.length - 1),
      target: values[values.length - 1],
    };
  } else {
    throw new Error("all inputs value must is of type Number");
  }
};

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

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
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

try {
  const { dailyHours, target } = parseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "something bad happened";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
