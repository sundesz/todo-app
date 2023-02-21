/// <reference types="cypress" />
import { message } from '../../src/utils/notificationMessages';

const SERVER_BASE_URL = 'http://localhost:8080/api/v1';

const testUser = {
  username: 'test@test.com',
  name: 'test user',
  password: 'test123',
};

const testTask = {
  content: 'This is a test task',
};

describe('Todo App', function () {
  beforeEach(function () {
    cy.request('POST', `${SERVER_BASE_URL}/test/reset`);
    cy.visit('/');
  });

  it('front page can be opened', function () {
    cy.contains('Welcome to Todo App');
  });

  it('user can be created', function () {
    cy.get('#signup-link').click();
    cy.get('#name').type(testUser.name);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type(testUser.password);
    cy.get('#signup-btn').click();

    cy.get('.Toastify').contains(message.SUCCESS.CREATE_USER);
  });

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', `${SERVER_BASE_URL}/users`, testUser);
    });

    it('succeeds with correct credentials', function () {
      cy.get('#signin-link').click();
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password);
      cy.get('#signin-btn').click();

      cy.contains(testUser.username);
    });

    it('fails with wrong credentials', function () {
      cy.get('#signin-link').click();
      cy.get('#username').type(testUser.username);
      cy.get('#password').type('test');
      cy.get('#signin-btn').click();
      cy.get('.Toastify').contains(message.FAILED.INVALID_USER);
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#signin-link').click();
        cy.get('#username').type(testUser.username);
        cy.get('#password').type(testUser.password);
        cy.get('#signin-btn').click();
        cy.visit('/tasks');
      });

      it('task can be created', function () {
        cy.contains('No Tasks. Please add tasks');
        // cy.get('#task').type(testTask.content);
        // cy.get('#addtask-btn').click();

        // cy.contains(testTask.content);
      });

      // it('can logout', function () {
      //   cy.get('#signout-link').click();
      //   cy.contains('Sign in');
      // });

      // describe('When there is a task', function () {
      //   beforeEach(function () {
      //     cy.get('#task').type(`${testTask.content}-1`);
      //     cy.get('#addtask-btn').click();

      //     cy.get('#task').type(`${testTask.content}-2`);
      //     cy.get('#addtask-btn').click();

      //     cy.get('#task').type(`${testTask.content}-3`);
      //     cy.get('#addtask-btn').click();

      //     cy.get('.task-checkbox').first().click();
      //   });

      //   it('task can be marked done', function () {
      //     cy.get('.task-checkbox').eq(1).click();

      //     cy.get('#all').click();
      //     cy.get('.task-detail').should(($taskDetail) => {
      //       expect($taskDetail).to.have.length(3);
      //     });

      //     cy.get('#complete').click();
      //     cy.get('.task-detail').should(($taskDetail) => {
      //       expect($taskDetail).to.have.length(2);
      //     });

      //     cy.get('#incomplete').click();
      //     cy.get('.task-detail').should(($taskDetail) => {
      //       expect($taskDetail).to.have.length(1);
      //     });
      //   });

      //   it('task can be marked important', function () {
      //     cy.get('.task-label').eq(2).click();

      //     cy.get('#all').click();
      //     cy.get('.task-detail').should(($taskDetail) => {
      //       expect($taskDetail).to.have.length(3);
      //     });

      //     cy.get('#important').click();
      //     cy.get('.task-detail').should(($taskDetail) => {
      //       expect($taskDetail).to.have.length(1);
      //     });
      //   });

      //   it('task can be deleted', function () {
      //     cy.get('.task-delete').first().click();

      //     cy.get('.task-detail').should(($taskDetail) => {
      //       expect($taskDetail).to.have.length(2);
      //     });
      //   });
      // });
    });
  });
});
