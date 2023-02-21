import { Migration } from '..';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addConstraint('tasks', {
    fields: ['content'],
    type: 'unique',
    name: 'tasks_content_unique',
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeConstraint('tasks', 'tasks_content_unique');
};
