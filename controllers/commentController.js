const pool = require('../db');
const moment = require('moment');

const MESSAGES = require('../constants/constants.js');
const functionUtils = require('../utils/functionUtils.js');

exports.createComment = async (req, res) => {
  const { postID, userID, content } = req.body;

  try {
    if (!functionUtils.verifyUserExists(pool, userID)) {
      return res.status(404).send(MESSAGES.USER_NOT_FOUND);
    }

    if (!functionUtils.verifyPostExists(pool, postID))
      return res.status(404).send(MESSAGES.POST_NOT_FOUND);

    await pool.query(
      'INSERT INTO COMMENTS(postID, userID, content, creationDate) VALUES($1, $2, $3, $4);',
      [postID, userID, content, moment().format('YYYY-DD-MM HH:mm:ss')]
    );

    res.status(200).send(`Comentário adicionado ao post.`);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
};
