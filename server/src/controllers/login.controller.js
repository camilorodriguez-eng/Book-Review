import bcrypt from "bcrypt";
import connection from "../database/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// controlador post para registrar
export const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const [rows] = await connection.query(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const [result] = await connection.query(
      "INSERT INTO User (name, lastname, email, password) VALUES (?, ?, ?, ?)",
      [name, lastname, email, hash]
    );

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error on the server" });
  }
};

// controlador para iniciar sesion
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // creacion del token de autorizacion del usuario iniciado
    const token = jwt.sign(
      {
        id: rows[0].id,
      },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true, // la cookie no se puede acceder en el servidor
        secure: process.env.NODE_ENV === "production", // solo se envia en https
        sameSite: "strict", // solo se envia si el dominio es el mismo
        maxAge: 1000 * 60 * 60, // expira en 1 hora
      })

      .status(200)
      .json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error on the server" });
  }
};

// controlador para cerrar sesion
export const logoutUser = async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "Logout successful" });
};


