'use strict'
// import Admin from './../../models/admin.model'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultPsw = process.env.ADMIN_PSW

    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          email: 'superadmin@gmail.com',
          password: defaultPsw,
          role: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: 'admin@gmail.com',
          password: defaultPsw,
          role: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      { returning: ['id'] },
    )

    await queryInterface.bulkInsert('Admins', [
      {
        adminId: uuidv4(),
        UserId: users[0].id,
        firstName: 'Super',
        lastName: 'Admin',
        isSuperAdmin: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        adminId: uuidv4(),
        UserId: users[1].id,
        firstName: 'Admin',
        lastName: ' ',
        isSuperAdmin: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Admins')
  },
}
