exports.up = function (knex) {
    return knex.schema
        .createTable('create_user', (table) => {
            table.increments('id').primary();
            table.string('user_id').unique();
            table.string('name').notNullable();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('login_user', (table) => {
            table.increments('id').primary();
            table.integer('user_id').notNullable();
            table.integer('login_id').notNullable().unsigned();
            table
                .foreign('login_id')
                .references('id')
                .inTable('create_user')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};


exports.down = function (knex) {
    return knex.schema.dropTable('create_user').dropTable('login_user');
};