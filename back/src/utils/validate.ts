export const validateEmail = (email: string): boolean => {
  const regex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
  return regex.test(password);
};


