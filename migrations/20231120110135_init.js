/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table){
            table.increments('id');
            table.string('login');
            table.string('hashPassword');
            table.string('email');
            table.string('name');
            table.string('avatar');
        })
        .createTable('surveys', function (table){
            table.increments('id');
            table.increments('creatorId');
            table.string('title');
        })
        .createTable('surveysRedactors', function (table){
            table.increments('userId');
            table.increments('surveyId');
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
