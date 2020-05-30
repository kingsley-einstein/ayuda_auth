import db from "../db";
import { Jwt, Bcrypt } from "../helpers";

const { AuthModel, TokenModel } = db;

export class AuthController {
  static async signUp(req, res) {
    try {
      const { body } = req;
      const { email, id, password, firstName, lastName } = await AuthModel.create(body);
      const response = { 
        email, 
        id, 
        firstName, 
        lastName,
        token: Jwt.sign({ id, password })
      };
      res.status(201).json({
        code: 201,
        response
      });
    } catch ({ message }) {
      res.status(500).json({
        code: 500,
        response: message
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthModel.findByEmail(email);
      if (!user) {
        return res.status(404).json({
          code: 404,
          response: "Account not found."
        });
      }
      if(!Bcrypt.compare(user.password, password)) {
        return res.status(400).json({
          code: 400,
          response: "Password is incorrect."
        });
      }
      const { id, firstName, lastName, } = user;
      const response = {
        email,
        id,
        firstName,
        lastName,
        token: Jwt.sign({ id, password: user.password })
      };
      res.status(200).json({
        code: 200,
        response
      });
    } catch ({ message }) {
      res.status(500).json({
        code: 500,
        response: message
      });
    }
  }

  static async updateAuthInfo(req, res) {
    try {
      const { body, user } = req;
      const [, [{ email, id, firstName, lastName }]] = await AuthModel.update(body, {
        individualHooks: true,
        where: { id: user.id }
      });
      const response = { email, firstName, lastName, id };
      res.status(200).json({
        code: 200,
        response
      });
    } catch ({ message }) {
      res.status(500).json({
        code: 500,
        response: message
      });
    }
  }

  static async getLoggedUser(req, res) {
    try {
      const { email, id, firstName, lastName } = req.user;
      const response = { email, id, firstName, lastName };
      res.status(200).json({
        code: 200,
        response
      });
    } catch ({ message }) {
      res.status(500).json({
        code: 500,
        response: message
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const { email, firstName, lastName } = await AuthModel.findByPk(id);
      const response = { email, firstName, lastName };
      res.status(200).json({
        code: 200,
        response
      });
    } catch ({ message }) {
      res.status(500).json({
        code: 500,
        response: message
      });
    }
  }

  static async logUserOut(req, res) {
    try {
      const { user, token } = req;
      const actual = token;
      await TokenModel.create({ actual });
      res.status(200).json({
        code: 200,
        response: `Successfully logged out user with id ${user.id}`
      });
    } catch ({ message }) {
      res.status(500).json({
        code: 500,
        response: message
      });
    }
  }
}
