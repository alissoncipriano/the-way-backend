const pool = require('../db');
const moment = require('moment');

exports.setup = async (req, res) => {
  const { name, email, password, tagTitle, postTitle, postContent } = req.body;

  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS USERS (
                userID INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
                name character(100) NOT NULL,
                email character(100) NOT NULL,
                password character(200) NOT NULL
              );
            `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS ADMINISTRATORS (
                userID INTEGER PRIMARY KEY NOT NULL,
                FOREIGN KEY (userID) REFERENCES USERS(userID)
              );
            `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS TAGS (
                tagID INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
                userID INTEGER NOT NULL,
                title character(100) NOT NULL,
                FOREIGN KEY (userID) REFERENCES USERS(userID)
              );
                `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS POSTS (
                postID INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
                userID INTEGER NOT NULL,
                tagID INTEGER NOT NULL,
                title character(100) NOT NULL,
                content character(500) NOT NULL,
                creationDate timestamp NOT NULL,
                lastUpdate timestamp,
                FOREIGN KEY (userID) REFERENCES USERS(userID),
                FOREIGN KEY (tagID) REFERENCES TAGS(tagID)
              );
                `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS COMMENTS (
                commentID INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
                postID INTEGER NOT NULL,
                userID INTEGER NOT NULL,
                content character(500) NOT NULL,
                creationDate timestamp NOT NULL,
                FOREIGN KEY (userID) REFERENCES USERS(userID),
                FOREIGN KEY (postID) REFERENCES POSTS(postID)
              );
                `);

    await pool.query(
      'INSERT INTO USERS(name, email, password) VALUES($1, $2, $3);',
      [name, email, password]
    );

    const createdUser = await pool.query(
      `SELECT * FROM USERS WHERE name='${name}';`
    );

    const createdUserID = createdUser.rows[0].userid;

    await pool.query('INSERT INTO ADMINISTRATORS(userID) VALUES($1);', [
      createdUserID,
    ]);

    await pool.query('INSERT INTO TAGS(userID, title) VALUES($1, $2);', [
      createdUserID,
      tagTitle,
    ]);

    const createdTag = await pool.query(
      `SELECT * FROM TAGS WHERE title='${tagTitle}';`
    );

    const createdTagID = createdTag.rows[0].userid;

    await pool.query(
      'INSERT INTO POSTS(userID, tagID, title, content, creationDate) VALUES($1, $2, $3, $4, $5);',
      [
        createdUserID,
        createdTagID,
        postTitle,
        postContent,
        moment().format('YYYY-DD-MM HH:mm:ss'),
      ]
    );

    res
      .status(200)
      .send(
        `Base de dados criada com sucesso!\n\nUsuário, ${name} criado e configurado como administrador.\n\nTag, "${tagTitle}" criada.\n\nPost, "${postTitle}" criado.`
      );
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
};
