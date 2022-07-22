import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateBookTable1658508517828 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'authors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'birthDate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            onUpdate: 'now()',
            default: 'now()',
          },
        ],
      })
    );
    await queryRunner.createTable(new Table({
      name: 'books',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'isbn',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'pages',
          type: 'int',
          isNullable: false
        },
        {
          name: 'language',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'authorId',
          type: 'int',
          isNullable: false
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          onUpdate: 'now()',
          default: 'now()',
        }
      ]
    }));

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['authorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('books');
    if (table) {
      const fk: TableForeignKey | undefined = table.foreignKeys.find((foreing: TableForeignKey) => foreing.columnNames.includes('authorId'));
      if (fk) {
        await queryRunner.dropForeignKey('books', fk);
      }
    }
    await queryRunner.dropTable('books');
    await queryRunner.dropTable('authors');
  }

}
