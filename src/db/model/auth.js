import { v4 as uuid } from "uuid";
import { Bcrypt } from "../../helpers";

export default (sequelize, DataTypes) => {
  const Auth = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Enter a valid email."
        },
        notEmpty: {
          msg: "Email is required."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required."
        }
      }
    },
    // referalCode: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true
    // },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required."
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required."
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (model) => {
        model.id = uuid();
        // model.referalCode = model.referalCode 
      },
      beforeSave: (model) => {
        if (model.changed("password")) {
          const salt = Bcrypt.genSalt(15);
          model.password = Bcrypt.hash(model.password, salt);
        }
      }
    }
  });

  Auth.findByEmail = (email) => Auth.findOne({ where: { email } });

  return Auth;

};