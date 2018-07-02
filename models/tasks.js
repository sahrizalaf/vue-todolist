'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tasks = sequelize.define('Tasks', {
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {
    underscored: true,
  });
  Tasks.associate = function(models) {
    // associations can be defined here
  };
  return Tasks;
};