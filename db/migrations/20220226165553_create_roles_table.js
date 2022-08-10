export async function up(knex) {
    await knex.schema.createTable('roles', function(table) {
      table.string('id').unique().primary()
      table.string('name').notNull().unique();
      table.string('expiresAt').notNull();
      table.string('createdAt').defaultTo(knex.fn.now())
    });
  }
  
export async function down(knex) {
    await knex.schema.dropTable('roles');
}