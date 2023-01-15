
const randomNumber = () => Math.floor( Math.random() * 10);


export const generateSum = () => `${randomNumber()} + ${randomNumber()}`;

export const generateSubtraction = () => `${randomNumber()} - ${randomNumber()}`;

export const generateMultiplication = () => `${randomNumber()} * ${randomNumber()}`;
