module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.addConstraint("names_teams", ["id"], {
                type: "primary key",
                name: "names_teams_pk_id",
            }),

            queryInterface.addConstraint("status_players", ["id"], {
                type: "primary key",
                name: "status_players_pk_id",
            }),

            queryInterface.addConstraint("status_players", ["statusId"], {
                type: "foreign key",
                name: "users_fk_userId",
                references: {
                    table: "users",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),

            queryInterface.addConstraint("users", ["teamId"], {
                type: "foreign key",
                name: "users_fk_teamId",
                references: {
                    table: "names_teams",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),

            queryInterface.addConstraint("status_players", ["namesTeamId"], {
                type: "foreign key",
                name: "users_fk_teamId",
                references: {
                    table: "names_teams",
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
