const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const TodoModel = require('../model/Todo');

const app = express();
const router = express.Router();

const db = process.env.DB_URL || 'mongodb://localhost:27017/todo';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    if (todos) {
      res.json(todos);
    }
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
});

router.post('/', async (req, res) => {
  const todo = req.body;
  try {
    const todos = await TodoModel.create(todo);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
});

router.patch('/', async (req, res) => {
  const { _id: todoId, text, completed } = req.body;
  console.log('PATCH', todoId, text, completed);

  try {
    const todos = await TodoModel.findByIdAndUpdate(
      todoId,
      {
        text,
        completed,
      },
      { new: true }
    );
    console.log('findByIdAndUpdate', todos);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
});

router.delete('/:id', async (req, res) => {
  const todoId = req.params.id;
  console.log(todoId);
  try {
    const todos = await TodoModel.findByIdAndRemove(todoId);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
});

app.use(cors());
app.use(express.json());
app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);
