module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.addConstraint("teams_names", ["id"], {
                type: "primary key",
                name: "teams_names_pk_id",
            }),

            queryInterface.addConstraint("status_players", ["id"], {
                type: "primary key",
                name: "status_players_pk_id",
            }),

            queryInterface.addConstraint("status_players", ["userId"], {
                type: "foreign key",
                name: "users_fk_userId",
                references: {
                    table: "users",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),

            queryInterface.addConstraint("users", ["teamsNameId"], {
                type: "foreign key",
                name: "users_fk_teamId",
                references: {
                    table: "teams_names",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),

            queryInterface.addConstraint("status_players", ["teamsNameId"], {
                type: "foreign key",
                name: "users_fk_teamId",
                references: {
                    table: "teams_names",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
