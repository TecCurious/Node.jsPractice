import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.log("error while fetching user data by ID", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  } catch (error) {
    console.log("error while fetching user data by ID", error);
    throw error;
  }
};

export const createUser = async (name, email, password) => {
  try {
    const hasPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING*  ",
      [name, email, hasPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error while creating user", error);
    throw error;
  }
};

export const updateUser = async (id, name, email, password) => {
  try {
    let query;
    let params;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query =
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *";
      params = [name, email, hashedPassword, id];
    } else {
      query =
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
      params = [name, email, id];
    }

    const result = await pool.query(query, params);
    return result.rows[0] || null;
  } catch (error) {
    console.log("error while Updating user", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING*",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error while deleting user", error);
    throw error;
  }
};
