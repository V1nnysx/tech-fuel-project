const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/gpt', async (req, res) => {
    const { prompt } = req.body;

    const mockResponse = {
        choices: [
            {
                message: {
                    content: "Configure uma API Key válida para utilizar a API da Open AI."
                }
            }
        ]
    };

    function mockErrorResponse(error) {
        const response = {
            choices: [
                {
                    message: {
                        content: `Error: ${error}`
                    }
                }
            ]
        }
        return response
    }

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
                'Authorization': 'Bearer ',
                'Content-Type': 'application/json'
            }
        });
        res.json(response);
    } catch (error) {
        console.error('Erro ao solicitar ao GPT:', error);
        res.json(mockErrorResponse(error.response.data.error.message)).status(429)
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});