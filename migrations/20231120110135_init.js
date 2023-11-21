/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table){
            table.increments('id').notNullable();
            table.string('login').notNullable();
            table.string('hashPassword').notNullable();
            table.string('email').notNullable();
            table.string('name').notNullable();
            table.string('avatar');
        })
        .createTable('surveys', function (table){
            table.increments('id').notNullable();
            table.increments('creatorId').notNullable();
            table.string('title').notNullable();
        })
        .createTable('surveysRedactors', function (table){
            table.increments('userId');
            table.increments('surveyId').notNullable();
        })

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
