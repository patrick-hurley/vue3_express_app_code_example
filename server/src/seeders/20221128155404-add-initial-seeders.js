'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'questions',
            [
                {
                    id: '8d4e48d9-c60f-4636-87a3-22028a523942',
                    type: 'text',
                    label: 'What is the task?',
                    order: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '8d4e48d9-c60f-4636-87a3-22028a523943',
                    type: 'radio',
                    label: 'Can it be solved?',
                    order: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '8d4e48d9-c60f-4636-87a3-22028a523944',
                    type: 'textarea',
                    label: 'How will it be resolved?',
                    order: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('questions', null, {})
    },
}
