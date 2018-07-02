'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'Mengerjakan Tugas',
        done: false
      },
      {
        title: 'Bermain Mobayl Lejen',
        done: true
      },
      {
        title: 'Beres Beres Rumah',
        done: false
      },
      {
        title: 'Sekolah',
        done: true
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tasks', null, {})
  }
};
