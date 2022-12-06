import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRefreshTokensTable1670365829096
  implements MigrationInterface
{
  name = 'CreateRefreshTokensTable1670365829096'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" varchar PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "user_id" varchar NOT NULL, "valid" boolean NOT NULL, "expires" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "refresh_tokens"`)
  }
}
