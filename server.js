const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

// controllers
const setupController = require('./controllers/setupController.js');
const tagController = require('./controllers/tagController.js');
const postController = require('./controllers/postController.js');
const commentController = require('./controllers/commentController.js');

// routers
const setupRouter = express.Router();
const tagRouter = express.Router();
const postRouter = express.Router();
const commentRouter = express.Router();

setupRouter.route('/setup').post(setupController.setup);
tagRouter.route('/tag').post(tagController.createTag);
postRouter.route('/post').post(postController.createPost);
commentRouter.route('/comment').post(commentController.createComment);

app.use(setupRouter, tagRouter, postRouter, commentRouter);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
