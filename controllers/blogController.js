'use strict';
const { validationResult } = require('express-validator');
const blogModel = require('../models/blogModel');
const {makeThumbnail} = require('../utils/resize');

const blogs = blogModel.blogs;

const blog_list_get = async (req, res) => {
  const blogs = await blogModel.getAllBlogs();
  res.json(blogs);
};

const blog_list_getrandomblogs = async (req, res) => {
  const blogs = await blogModel.getRandomBlogs();
  res.json(blogs);
};

const blog_list_getpopularblogs = async (req, res) => {
  const blogs = await blogModel.getPopularBlogs();
  res.json(blogs);
};

const blog_list_getbysearch = async (req, res) => {
  const searchparam = req.params.searchparam;
  const blogs = await blogModel.getBlogBySearchParam(searchparam);
  res.json(blogs);
};

const blog_get = async (req, res) => {
  const id = req.params.id;
  const blogi = await blogModel.getBlogById(id);
  res.json(blogi);
};

const blog_list_getByUserId = async (req,res) => {
  const UserId = req.params.id;
  const blogs = await blogModel.getBlogsByUserId(UserId);
  res.json(blogs);
};

const blog_AddLike = async (req, res) => {
  const id = req.params.id;
  const blogi = await blogModel.addLike(id);
  res.json(blogi);
};

const blog_RemoveLike = async (req, res) => {
  const id = req.params.id;
  const blogi = await blogModel.removeLike(id);
  res.json(blogi);
};

const blog_create_post = async (req, res) => {
  console.log('Blog created: ', req.body, req.file);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {Title, Content,  UserID} = req.body;
  const {path} = req.file;
  var Image=path;

  const params = [Title, Content, Image, UserID];
  const blogi = await blogModel.addBlog(params);
  res.json({message: 'upload ok'});
};

const blog_update_put = async (req, res) => {
  console.log('Blog updated: ', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {Title, Content} = req.body;
  const params = [Title, Content];
  const blogi = await blogModel.updateBlog(params);
  res.json({message: 'modify ok'});
};

const blog_delete = async (req, res) => {
  console.log('Blog deleted')
  const id = req.params.id;
  const blogi = await blogModel.deleteBlog(id);
  res.json(blogi);
};

const make_thumbnail = async (req, res, next) => {
  blog_create_post(req, res, next)
  // kutsu makeThumbnail
  // try {
  //   const kuvake = await makeThumbnail(req.file.path, req.file.filename);
  //   console.log('kuvake', kuvake);
  //   if (kuvake) {
  //     next();
  //   }
  // } catch (e) {
  //   res.status(400).json({errors: e.message});
  // }
};

module.exports = {
  blog_list_get,
  blog_get,
  blog_list_getbysearch,
  blog_list_getrandomblogs,
  blog_AddLike,
  blog_RemoveLike,
  blog_create_post,
  blog_update_put,
  blog_delete,
  blog_list_getByUserId,
  blog_list_getpopularblogs,
  make_thumbnail
};