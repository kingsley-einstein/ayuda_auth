import { v4 as uuid } from "uuid";

export default (sequelize, DataTypes) => {
  const Token = sequelize.define("token", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    actual: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Token is required."
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (model) => {
        model.id = uuid();
      }
    }
  });

  Token.findByActual = (actual) => Token.findOne({ where: { actual } });

  return Token;
};
