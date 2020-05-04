import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export default req => {
  const token = req.headers.authorization;
//   return;
  if (token) {
    try {
        console.log('token', token);
      const loggedInUser = jwt.decode(token);
      const SECRET = process.env.JWT_SECRET
      console.log('secret', SECRET);
      jwt.verify(token, SECRET);
      console.log('loggedInuser', loggedInUser);
      return loggedInUser
    } catch (err) {
      console.error(err);
      throw new AuthenticationError("Failed to authenticate token!");

    }
  } else {
    console.error('No token!');
    throw new AuthenticationError("No token");
  }
//   if (token === process.env.AUTH_KEY) return token;
//   throw new AuthenticationError("Invalid authorization key");
};
