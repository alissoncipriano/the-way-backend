const verifyUserExists = async (connection, userID) => {
  const user = await connection.query(
    `SELECT * FROM USERS WHERE userID='${userID}';`
  );
  return user.rows.length > 0;
};

const verifyTagExists = async (connection, tagID) => {
  const tag = await connection.query(
    `SELECT * FROM TAGS WHERE tagID='${tagID}';`
  );
  return tag.rows.length > 0;
};

const verifyPostExists = async (connection, postID) => {
  const post = await connection.query(
    `SELECT * FROM POSTS WHERE postID='${postID}';`
  );
  return post.rows.length > 0;
};

const functionUtils = {
  verifyUserExists,
  verifyTagExists,
  verifyPostExists,
};

module.exports = functionUtils;
