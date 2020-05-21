import jwt from "jsonwebtoken";
import env from "../env";

export class Jwt {
  static sign(payload) {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: "7d"
    });
  }

  static decode(token) {
    return jwt.verify(token, env.jwtSecret);
  }
}
