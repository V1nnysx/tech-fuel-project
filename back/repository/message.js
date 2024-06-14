const mysql = require('mysql2/promise');

class MessageRepository {
    constructor(databaseConfig) {
        this.pool = mysql.createPool(databaseConfig);
    }

    async get_all_messages(){
        const get_all_messages_sql = 'SELECT text, usertype, created_at FROM messages';
        try {
            const connection = await this.pool.getConnection();
            const [messages] = await connection.query(get_all_messages_sql);
            connection.release();
            return messages;
        } catch (err) {
            console.error('Woops... an unexpected error ocurred', err);
            throw err;
        }
    }

    async create_message(message) {
        const create_message_sql = 'INSERT INTO messages (text, usertype) VALUES (?, ?)';
        try {
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(create_message_sql, [message.text, message.type]);
            connection.release();
            return result;
        } catch (error) {
            console.error('Erro ao criar mensagem: ', error);
            throw error;
        }
    }

    async close() {
        try {
            await this.pool.end();
        } catch (err) {
            console.error('Woops... an unexpected error ocurred', err);
        }
    }
}

module.exports = MessageRepository;