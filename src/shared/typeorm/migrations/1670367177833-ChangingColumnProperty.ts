import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangingColumnProperty1670367177833 implements MigrationInterface {
  name = 'ChangingColumnProperty1670367177833'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_tokens" ("id" varchar PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "user_id" varchar NOT NULL, "valid" boolean NOT NULL DEFAULT (1), "expires" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_refresh_tokens"("id", "token", "user_id", "valid", "expires", "created_at") SELECT "id", "token", "user_id", "valid", "expires", "created_at" FROM "refresh_tokens"`,
    )
    await queryRunner.query(`DROP TABLE "refresh_tokens"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_refresh_tokens" RENAME TO "refresh_tokens"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" RENAME TO "temporary_refresh_tokens"`,
    )
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" varchar PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "user_id" varchar NOT NULL, "valid" boolean NOT NULL, "expires" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    )
    await queryRunner.query(
      `INSERT INTO "refresh_tokens"("id", "token", "user_id", "valid", "expires", "created_at") SELECT "id", "token", "user_id", "valid", "expires", "created_at" FROM "temporary_refresh_tokens"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_refresh_tokens"`)
  }
}
