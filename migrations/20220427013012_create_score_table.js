exports.up = function (knex) {
  return knex.schema.createTable("scores", (table) => {
    table.increments("id").primary();
    table.string("player_id").notNullable();
    table.string("song").notNullable();
    table.string("artist").notNullable();
    table.integer("score").notNullable();
    table.integer("max_combo").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
      .foreign("player_id")
      .references("spotify_id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("scores");
};
