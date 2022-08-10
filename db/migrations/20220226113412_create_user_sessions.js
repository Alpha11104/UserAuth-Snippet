export async function up(knex) {
    await knex.schema.createTable('sessions', function(table) {
      table.string('userId').unique().primary()
      table.string('token').notNull().unique();
      table.string('expiresAt').notNull();
      table.string('createdAt').defaultTo(knex.fn.now())
    });
  }
  
export async function down(knex) {
    await knex.schema.dropTable('sessions');
}
