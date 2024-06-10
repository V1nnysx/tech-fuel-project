const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const MessageRepository = require('./repository/message');
const MessageService = require('./service/message');
const Message = require('./models/message')

dotenv.config()

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

const databaseConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWD,
    database: process.env.MYSQL_DATABASE
};

function create_table(databaseConfig){
    const mysql = require('mysql2')

    const connection = mysql.createConnection(databaseConfig);
    const createTableSql = `
            CREATE TABLE IF NOT EXISTS messages (
                text VARCHAR(140),
                usertype VARCHAR(10),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    connection.query(createTableSql, (err, result) => {
        if (err) {
            console.error('Error creating messages table:', err);
            throw err;
        }
        console.log('Messages table created or already exists');

        connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
            } else {
                console.log('Database connection closed');
            }
        });
    });
}

create_table(databaseConfig);

const message_service = new MessageService(new MessageRepository(databaseConfig))

async function callGPT(prompt){
    try {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const payload = {
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 50,
            temperature: 0.7,
            model: 'gpt-3.5-turbo'
        };
        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': '',
                'Content-Type': 'application/json'
            }
        }); 
        return response.data
    } catch (error) {
        console.error('Erro ao solicitar ao GPT:', error);
        throw error
    }
}

function error_response(error){
    const response = { choices: [
         {
             message: {
                 content: error
             }
         }
     ]
 }
 return response
}

app.post('/api/message', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(422).json(error_response('Invalid Payload parameters'));
    }

    try {
        const new_message = await message_service.create_message(
            new Message(prompt, 'user')
        );
    } catch (err) {
        return res.status(422).json(error_response('An error occurred while creating message'));
    }

    let user_answer;
    try {
        user_answer = await callGPT(prompt);
        /*user_answer = {
            choices:[{
                message:{
                    content:"Nao"
                }
            }]
        }*/
    } catch (err) {
        return res.status(429).json(error_response(err.response.data.error.message));
    }

    try {
        const gpt_response = await message_service.create_message(
            new Message(user_answer.choices[0].message.content, 'assistant')
        );
    } catch (err) {
        return res.status(500).json(error_response('An error occurred while creating GPT response'));
    }

    return res.status(201).json(user_answer);
});

app.get('/api/message', async (req, res) => {
    try {
        const messages = await message_service.get_all_messages();
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json(error_response('An error occurred when searching for messages'));
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
