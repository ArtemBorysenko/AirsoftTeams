"use strict"

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.addConstraint("comments", ["id"], {
                type: "primary key",
                name: "comments_pk_id",
            }),

            queryInterface.addConstraint("users_creds", ["id"], {
                type: "primary key",
                name: "users_creds_pk_id",
            }),

            queryInterface.addConstraint("users_tokens", ["id"], {
                type: "primary key",
                name: "users_tokens_pk_id",
            }),
            queryInterface.addConstraint("users_tokens", ["userId"], {
                type: "foreign key",
                name: "users_tokens_fk_id",
                references: {
                    table: "users",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),
            queryInterface.addConstraint("users", ["id"], {
                type: "primary key",
                name: "users_pk_id",
            }),
            queryInterface.addConstraint("users", ["usercredId"], {
                type: "foreign key",
                name: "users_fk_usercredId",
                references: {
                    table: "users_creds",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            }),
            queryInterface.addConstraint("users", ["commentId"], {
                type: "foreign key",
                name: "users_fk_commentId",
                references: {
                    table: "comments",
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
