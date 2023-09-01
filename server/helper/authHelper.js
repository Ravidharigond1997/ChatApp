import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comaparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
