import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleIdToUserTable1669761930352 implements MigrationInterface {
  name = 'AddRoleIdToUserTable1669761930352'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar, "isAdmin" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "roleId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at" FROM "users"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar, "isAdmin" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "roleId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "users"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar, "isAdmin" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "roleId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "temporary_users"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_users"`)
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar, "isAdmin" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at" FROM "temporary_users"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_users"`)
  }
}
