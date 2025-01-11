/* eslint-disable curly */
import {useState} from 'react';

export const useCalculator = () => {
  const [number, setNumber] = useState('0');

  const clean = () => {
    setNumber('0');
  };

  const deleteOperation = () => {
    // Solo hay 1 dígito
    if (number.length === 1) return setNumber('0');

    // Solo hay 1 dígito y es negativo
    if (number.length === 2 && number.includes('-')) return setNumber('0');

    setNumber(number.substring(0, number.length - 1));
  };

  const toggleSign = () => {
    if (number.includes('-')) return setNumber(number.replace('-', ''));

    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      // Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de cero, no hay punto, y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      // Evitar 0000000.00
      if (numberString === '0' && !number.includes('.')) return;

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  return {
    number,
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
  };
};
