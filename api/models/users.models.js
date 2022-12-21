const db = require("../../db/connection")

exports.selectUsers = () => {
    return db.query(`
    SELECT * FROM users;
    `)
    .then((result) => {
        return result.rows
    })
}

exports.addUser = (newUser) => {
  if ("username" in newUser && "password" in newUser && "email" in newUser && "profile_picture" in newUser) {
    return db
      .query(
        `
    INSERT INTO users (username, password, profile_picture, email)
    VALUES 
    ($1, $2, $3, $4) RETURNING *;
    `,
        [newUser.username, newUser.password, newUser.profile_picture, newUser.email]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};