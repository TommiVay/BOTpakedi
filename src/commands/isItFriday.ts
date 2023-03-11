const IS_IT_FRIDAY_MATCHER = "isitfriday";

const isItFirdayHandler = (): Object => {
  console.log("/isitfriday");
  const date = new Date(); // Lazy, dependat on the hosting country.
  if (date.getDay() === 5) {
    return { content: "I are think that" };
  }
  return { content: "I aren't think that" };
};

export { IS_IT_FRIDAY_MATCHER, isItFirdayHandler };
