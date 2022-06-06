const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class Post extends Model {};

Post.init({
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'post',
  timestamps: false
})

module.exports = Post;