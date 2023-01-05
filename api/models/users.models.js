const db = require("../../db/connection")

exports.selectUsers = () => {
    return db.query(`
    SELECT * FROM users;
    `)
    .then((result) => {
        return result.rows
    })
}

exports.selectUserByUsername = (username) => {
  return db.query(`
    SELECT * from users WHERE username = $1
  `, [ username ])
  .then((result) => {
    if(result.rows.length === 0) {
      return Promise.reject({
        status: 404, msg: "Not found"
      })
    }
    return result.rows[0]
  })
}

exports.addUser = (newUser) => {
  if ("username" in newUser && "password" in newUser && "email" in newUser) {
    return db
      .query(
        `
    INSERT INTO users (username, password, email)
    VALUES 
    ($1, $2, $3) RETURNING *;
    `,
        [newUser.username, newUser.password, newUser.email]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};

exports.updateUser = (newUsername, username) => {
  if ("username" in newUsername) {
    return db
      .query(
        `
        UPDATE users SET username = $1 WHERE username = $2 RETURNING *;
      `,
        [newUsername.username, username]
      )
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not found" });
        } else {
          return result.rows[0];
        }
      });
  }
  else {
    return Promise.reject({status: 400, msg: "Bad request"})
  }
};
exports.selectUserByEmail = (email) => {
  return db
    .query(
      `
    SELECT * from users WHERE email = $1
  `,
      [email]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return result.rows[0];
    });
};

;