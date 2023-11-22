CREATE TABLE "users" (
                         "id" integer PRIMARY KEY,
                         "login" text NOT NULL,
                         "hashPassword" text NOT NULL,
                         "email" text,
                         "name" text,
                         "avatar" text
);

CREATE TABLE "survey" (
                          "id" integer PRIMARY KEY,
                          "title" text NOT NULL,
                          "creatorUserId" integer
);

CREATE TABLE "surveyRedactors" (
                                   "surveyId" integer,
                                   "userId" integer
);

CREATE TYPE questionType AS ENUM ('1', '2', '3');

CREATE TABLE surveyQuestions (
                                "id" integer PRIMARY KEY,
                                "surveyId" integer NOT NULL,
                                "titleQuestion" text NOT NULL,
                                "questionNumber" integer NOT NULL,
                                "questionType" questionType NOT NULL UNIQUE ,
                                "optionAnother" boolean NOT NULL
);

CREATE TABLE "surveyQuestionsOptionsList" (
                                                   "questionNumber" integer,
                                                   "surveyId" integer,
                                                   "optionsCount" integer NOT NULL,
                                                   "id" integer PRIMARY KEY,
                                                   "single" boolean NOT NULL
);


CREATE TABLE "surveyQuestionsTypeTextField" (
                                                "questionNumber" integer,
                                                "surveyId" integer,
                                                "id" integer PRIMARY KEY
);

CREATE TABLE "surveyQuestionsOptions" (
                                         "questionNumber" integer,
                                         "surveyId" integer,
                                         "textOptions" text NOT NULL,
                                         "optionsNumber" integer NOT NULL,
                                         "id" integer PRIMARY KEY
);

CREATE TABLE "userAnswerSurvey" (
                                    "userAnswerId" integer NOT NULL,
                                    "userId" integer,
                                    "surveyId" integer,
                                    "dateAnswer" date NOT NULL,
                                    "questionNumber" integer,
                                    "answerText" text NOT NULL,
                                    "id" integer PRIMARY KEY
);

ALTER TABLE "survey" ADD FOREIGN KEY ("creatorUserId") REFERENCES "users" ("id");

ALTER TABLE "surveyRedactors" ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "surveyRedactors" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE surveyQuestions ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "surveyQuestionsTypeOneFromList" ADD FOREIGN KEY ("questionNumber") REFERENCES surveyQuestions ("questionType");

ALTER TABLE "surveyQuestionsTypeOneFromList"ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "surveyQuestionsTypeSeveralFromList" ADD FOREIGN KEY ("questionNumber") REFERENCES surveyQuestions ("questionType");

ALTER TABLE "surveyQuestionsTypeSeveralFromList" ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "surveyQuestionsTypeTextField" ADD FOREIGN KEY ("questionNumber") REFERENCES surveyQuestions ("questionType");

ALTER TABLE "surveyQuestionsTypeTextField" ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "surveyQuestionsOptions" ADD FOREIGN KEY ("questionNumber") REFERENCES surveyQuestions ("titleQuestion");

ALTER TABLE "surveyQuestionsOptions" ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "userAnswerSurvey" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "userAnswerSurvey" ADD FOREIGN KEY ("surveyId") REFERENCES "survey" ("id");

ALTER TABLE "userAnswerSurvey" ADD FOREIGN KEY ("questionNumber") REFERENCES surveyQuestions ("questionNumber");