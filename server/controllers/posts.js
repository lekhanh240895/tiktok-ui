const PostSchema = require("../models/PostSchema");

async function getPosts(req, res, next) {
  try {
    const posts = await PostSchema.find();
    console.log("posts", posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function createPost(req, res) {
  try {
    const newPost = req.body;

    const post = new PostSchema(newPost);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function updatePost(req, res) {
  try {
    const updatePost = req.body;

    const post = PostSchema.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      {
        new: true,
      }
    );

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = { getPosts, createPost, updatePost };
