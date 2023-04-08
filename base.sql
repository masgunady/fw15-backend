CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
)


INSERT INTO "users" ("email", "password") VALUES ('admin@mail.com','1234')

INSERT INTO "users" ("email", "password") VALUES ('luffy@mail.com','1234'),('zoro@mail.com','1234'),('sanji@mail.com','1234')

UPDATE "users" SET "email"='admin@gmail.com' WHERE "id"=1
UPDATE "users" SET "email"='admin@gmail.com' WHERE "id"=199

DELETE FROM "users" WHERE "id" = 3

INSERT INTO "users" ("email", "password") VALUES ('zoro@mail.com','1234')

SELECT now()

SET TIME ZONE 'Asia/Jakarta'

SELECT CURRENT_TIME, CURRENT_TIMESTAMP;
