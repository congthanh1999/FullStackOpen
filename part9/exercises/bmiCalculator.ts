type MultiplyValues = {
  height: Number;
  weight: Number;
};

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length > 4) throw new Error("too many arguments");
  if (args.length < 4) throw new Error("not enough arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("height and weight must be of type Number");
  }
};

const { height, weight } = parseArguments(process.argv);

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  console.log("bmi", bmi);

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "normal weight";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return "overweight";
  } else {
    return "obesity";
  }
};

console.log(calculateBmi(180, 74));
