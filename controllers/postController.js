const pool = require('../db');
const moment = require('moment');

const MESSAGES = require('../constants/constants.js');
const functionUtils = require('../utils/functionUtils.js');

exports.createPost = async (req, res) => {
  const { userID, tagID, title, content } = req.body;

  try {
    if (!functionUtils.verifyUserExists(pool, userID))
      return res.status(404).send(MESSAGES.USER_NOT_FOUND);

    if (!functionUtils.verifyTagExists(pool, tagID))
      return res.status(404).send(MESSAGES.TAG_NOT_FOUND);

    await pool.query(
      'INSERT INTO POSTS(userID, tagID, title, content, creationDate) VALUES($1, $2, $3, $4, $5);',
      [userID, tagID, title, content, moment().format('YYYY-DD-MM HH:mm:ss')]
    );

    res.status(200).send(`Post, "${title}" criado.`);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
};
