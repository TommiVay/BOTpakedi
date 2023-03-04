const isItFirdayHandler = (): string => {
  console.log("/isitfriday");
  const date = new Date(); // Lazy, dependat on hosting country.
  if (date.getDay() === 5) {
    return "Yes";
  }
  return "No";
};

export default isItFirdayHandler;
