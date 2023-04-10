-- Active: 1680760649585@@127.0.0.1@5432@postgres@public
CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "fullName" VARCHAR(255),
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);


INSERT INTO "users" ("email", "password") VALUES ('admin@mail.com','1234');

INSERT INTO "users" ("email", "password") VALUES ('luffy@mail.com','1234'),('zoro@mail.com','1234'),('sanji@mail.com','1234');

UPDATE "users" SET "email"='admin@gmail.com' WHERE "id"=1;
UPDATE "users" SET "email"='admin@gmail.com' WHERE "id"=199;

DELETE FROM "users" WHERE "id" = 3;
SELECT * FROM "users";

INSERT INTO "users" ("fullName","email", "password")
VALUES
('luffy1','luffy1@mail.com','1234'),
('luffy2','luffy2@mail.com','1234'),
('luffy3','luffy3@mail.com','1234'),
('luffy4','luffy4@mail.com','1234'),
('luffy5','luffy5@mail.com','1234'),
('luffy6','luffy6@mail.com','1234'),
('luffy7','luffy7@mail.com','1234'),
('luffy8','luffy8@mail.com','1234'),
('luffy9','luffy9@mail.com','1234'),
('luffy10','luffy10@mail.com','1234'),
('zoro1','zoro1@mail.com','1234'),
('zoro2','zoro2@mail.com','1234'),
('zoro3','zoro3@mail.com','1234'),
('zoro4','zoro4@mail.com','1234'),
('zoro5','zoro5@mail.com','1234'),
('zoro6','zoro6@mail.com','1234'),
('zoro7','zoro7@mail.com','1234'),
('zoro8','zoro8@mail.com','1234'),
('zoro9','zoro9@mail.com','1234'),
('zoro10','zoro10@mail.com','1234'),
('sanji1','sanji1@mail.com','1234'),
('sanji2','sanji2@mail.com','1234'),
('sanji3','sanji3@mail.com','1234'),
('sanji4','sanji4@mail.com','1234'),
('sanji5','sanji5@mail.com','1234'),
('sanji6','sanji6@mail.com','1234'),
('sanji7','sanji7@mail.com','1234'),
('sanji8','sanji8@mail.com','1234'),
('sanji9','sanji9@mail.com','1234'),
('sanji10','sanji10@mail.com','1234'),
('chopper1','chopper1@mail.com','1234'),
('chopper2','chopper2@mail.com','1234'),
('chopper3','chopper3@mail.com','1234'),
('chopper4','chopper4@mail.com','1234'),
('chopper5','chopper5@mail.com','1234'),
('chopper6','chopper6@mail.com','1234'),
('chopper7','chopper7@mail.com','1234'),
('chopper8','chopper8@mail.com','1234'),
('chopper9','chopper9@mail.com','1234'),
('chopper10','chopper10@mail.com','1234');

SELECT now();

SET TIME ZONE 'Asia/Jakarta';

SELECT CURRENT_TIME, CURRENT_TIMESTAMP;

DROP TABLE "users";
