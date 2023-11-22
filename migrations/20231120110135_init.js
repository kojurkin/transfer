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
            table.integer('creatorId').notNullable()
                .references('id')
                .inTable('users');
            table.string('title').notNullable();
        })
        .createTable('surveysRedactors', function (table){
            table.increments('userId')
                .references('id')
                .inTable('users');
            table.integer('surveyId').notNullable()
                .references('id')
                .inTable('surveys');
        })
        .createTable('surveyQuestions', function (table){
            table.increments('id').notNullable();
            table.integer('surveyId').notNullable()
                .references('id')
                .inTable('surveys');
            table.string('titleQuestion').notNullable();
            table.integer('questionNumber').notNullable();
            table.enu('questionType', ['1', '2', '3'], { useNative: true, enumName: 'questionType'
        })})

        .createTable('surveyQuestionsOptionsList', function (table){
            table.integer('questionNumber').notNullable()
                .references('questionNumber')
                .inTable('surveyQuestions');
            table.integer('surveyId').notNullable()
                .references('id')
                .inTable('surveys');
            table.increments('id').notNullable();
            table.integer('optionCount').notNullable();
            table.boolean('singleFlag').notNullable();
        })
        .createTable('surveyQuestionsTypeTextField', function (table) {
            table.integer('questionNumber').notNullable()
                .references('questionNumber')
                .inTable('surveyQuestions');
            table.integer('surveyId').notNullable()
                .references('id')
                .inTable('surveys');
            table.increments('id').notNullable();
        })
        .createTable('surveyQuestionsOptions', function (table) {
            table.integer('questionNumber').notNullable()
                .references('questionNumber')
                .inTable('surveyQuestionsOptionsList');
            table.integer('optionNumber').notNullable();
            table.integer('surveyId').notNullable()
                .references('id')
                .inTable('surveys');
            table.increments('id').notNullable();
            table.string('optionText').notNullable();
        })
        .createTable('userAnswers', function (table) {
        table.increments('id').notNullable();
        table.integer('userId').notNullable()
            .references('id')
            .inTable('users');
        table.integer('surveyId').notNullable()
            .references('id')
            .inTable('surveys');
        table.date('date').notNullable();
        })
        .createTable('answersForQuestion', function (table){
            table.increments('id').notNullable();
            table.integer('answerId').notNullable()
                .references('id')
                .inTable('userAnswers');
            table.string('answerText').notNullable();
            table.integer('questionNumber').notNullable()
                .references('questionNumber')
                .inTable('surveyQuestions');
        })



  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
};
