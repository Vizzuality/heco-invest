import validate from 'validate.js';

const validateEmail = (value: string): boolean => {
  const constrains = {
    from: {
      email: true,
    },
  };
  return !validate({ from: value }, constrains);
};

export { validateEmail };
