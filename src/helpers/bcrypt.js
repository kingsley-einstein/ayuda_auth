import bcrypt from "bcryptjs";

export class Bcrypt {
  static genSalt(rounds) {
    return bcrypt.genSaltSync(rounds);
  }

  static hash(pw, salt) {
    return bcrypt.hashSync(pw, salt);
  }

  static compare(hash, raw) {
    return bcrypt.compareSync(raw, hash);
  }
}
