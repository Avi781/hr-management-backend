import db from "../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "avi_secret";
const JWT_EXPIRES = "8h";

export class AuthService {
  private knex = db;

  async login(email: string, password: string) {
    const hr = await this.knex("hr_users").where({ email }).first();
    if (!hr) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, hr.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: hr.id, email: hr.email, name: hr.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return token;
  }
}
