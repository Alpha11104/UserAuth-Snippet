export async function up(knex) {
    await knex.schema.createTable('user_tokens', function(table) {
      table.string('userId').unique().primary()
      table.string('token').notNull().unique();
      table.string('expiresAt').notNull();
    });
  }
  
export async function down(knex) {
    await knex.schema.dropTable('user_tokens');
}
