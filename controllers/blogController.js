const Blog = require('../models/Blog');
const errorHandler = require('../utils/errorHandler');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      author: req.user._id
    });
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('author', 'name');
    res.send(blogs);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get a specific blog post by ID
exports.getBlogById = async (req, res) => {
  const _id = req.params.id;
  try {
    const blog = await Blog.findById(_id).populate('author', 'name');
    if (!blog) {
      return res.status(404).send();
    }
    res.send(blog);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Update a specific blog post by ID
exports.updateBlog = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'content'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const blog = await Blog.findOne({ _id: req.params.id, author: req.user._id });
    if (!blog) {
      return res.status(404).send();
    }

    updates.forEach((update) => (blog[update] = req.body[update]));
    await blog.save();
    res.send(blog);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Delete a specific blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!blog) {
      return res.status(404).send();
    }
    res.send(blog);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Increment likes on a blog post
exports.likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment likes count
    blog.likes += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    errorHandler(res, error);
  }
};
