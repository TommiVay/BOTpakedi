const IS_IT_FRIDAY_MATCHER = "isitfriday";

const isItFirdayHandler = (): string => {
  console.log("/isitfriday");
  const date = new Date(); // Lazy, dependat on hosting country.
  if (date.getDay() === 5) {
    return "I are think that";
  }
  return "I aren't think that";
};

export { IS_IT_FRIDAY_MATCHER, isItFirdayHandler };
