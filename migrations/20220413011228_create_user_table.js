exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("spotify_id").primary();
    table.string("photo").notNullable();
    table.string("username").notNullable();
    table.string("display_name").notNullable();
    table.string("country").notNullable();
    table.string("access_token").notNullable();
    table.string("refresh_token").notNullable();
    table.integer("expires_in").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
