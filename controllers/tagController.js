const pool = require('../db');

const MESSAGES = require('../constants/constants.js');
const functionUtils = require('../utils/functionUtils.js');

exports.createTag = async (req, res) => {
  const { userID, title } = req.body;

  try {
    if (!functionUtils.verifyUserExists(pool, userID)) {
      return res.status(404).send(MESSAGES.USER_NOT_FOUND);
    }

    await pool.query('INSERT INTO TAGS(userID, title) VALUES($1, $2);', [
      userID,
      title,
    ]);

    res.status(200).send(`Tag, "${title}" criada.`);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
};
