class DatabaseError extends Error {
    constructor(errors, status) {
        const message = "PostgreSQL error"
        super(message)
        this.status = status || 500
        this.message = message
        this.errors = [
            {
                title: errors.message,
                msg: errors.stack,
            },
        ]
    }
}

module.exports = DatabaseError
