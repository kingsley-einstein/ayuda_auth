import db from "../db";
import { Jwt, Validator } from "../helpers";

const { AuthModel, TokenModel } = db;

export class AuthMiddleware {
  static hasKeys(req, res, next) {
    try {
      const { body } = req;
      if (!Validator.checkFields(body, ["email", "password", "firstName", "lastName"])) {
        return res.status(400).json({
          statusCode: 400,
          response: "Body is missing required keys."
        });
      }
      next();
    } catch ({ message }) {
      res.status(500).json({
        statusCode: 500,
        response: message
      });
    }
  }

  static async checkAlreadyRegistered(req, res, next) {
    try {
      const { email } = req.body;
      const existingUser = await AuthModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          statusCode: 400,
          response: `User with email ${email} already registered.`
        });
      }
      next();
    } catch ({ message }) {
      res.status(500).json({
        statusCode: 400,
        response: message
      });
    }
  }

  static async checkToken(req, res, next) {
    const { authorization } = req.header;
    if (!authorization) return res.status(401).json({
      statusCode: 401,
      response: "Authorization header is null."
    });
    if (!authorization.startsWith("Bearer")) {
      return res.status(401).json({
        statusCode: 401,
        response: `Authorization header must begin with "Bearer" string.`
      });
    }
    const token = authorization.substring(7, authorization.length);
    if (!token || token.trim().length === 0) {
      return res.status(401).json({
        statusCode: 401,
        response: "No token is present in authorization header."
      });
    }
    const payload = Jwt.decode(token);
    if (!payload) return res.status(401).json({
      statusCode: 401,
      response: "Invalid or malformed JWT."
    });
    const sessionExpired = await TokenModel.findByActual(token);
    if (sessionExpired) return res.status(401).json({
      statusCode: 401,
      response: "This session has expired. Sign in again."
    });
    req.user = await AuthModel.findByPk(payload.id);
    req.token = token;
    next();
  }
}
