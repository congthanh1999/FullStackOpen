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
