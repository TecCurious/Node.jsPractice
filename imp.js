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