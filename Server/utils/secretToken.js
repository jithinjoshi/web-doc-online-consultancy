import jwt from 'jsonwebtoken'

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export const createSecretTokenForDoc = (id) => {
  return jwt.sign({ id }, process.env.DOCTOR_JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

export const createSecretTokenForAdmin = (id) =>{
  console.log(process.env.ADMIN_JWT_SECRET)
  return jwt.sign({ id }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}