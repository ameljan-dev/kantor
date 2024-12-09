const parseStringToFloat = (num: number): string => {
  return parseFloat(num as unknown as string).toFixed(2);
};

export default parseStringToFloat;
