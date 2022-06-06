const express = require("express");
const sequelize = require('./data/db');
const Post = require('./data/post');
const PORT = process.env.PORT || 8000;

sequelize.sync({
  force: true
}).then(() => console.log('db is ready'));

const app = express();

app.use(express.json());

app.listen(PORT, () => `Server is running on port ${PORT}`);

app.get('/api/posts', async (req, res) => {
  const posts = await Post.findAll();
  res.send(posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({
    where: {
      id: id
    }
  });
  res.send(post);
});

app.post('/api/posts', async (req, res) => {
  await Post.create(req.body);
  res.send("success");
});

app.put('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({where: {id: id}});
  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.send('updated');
})

app.delete('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  await Post.destroy({where: {id: id}});
  res.send('removed');
})