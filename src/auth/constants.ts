const secret = process.env.JWT_SECRET ?? 'supersecret';

export const jwtSettings = {
  secret,
};
