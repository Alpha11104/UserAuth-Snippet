/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', function(table) {
    table.string('id').unique().primary()
    table.string('email').notNull().unique();
    table.string('password').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

  });
}

export async function down(knex) {
  await knex.schema.dropTable('users');
}
