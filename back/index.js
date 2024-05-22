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
                    content: "Configure uma api key válida para utilizar a api da open ai"
                }
            }
        ]
    };

    /*
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
                'Authorization': 'Bearer sk-proj-mJayJKI70TVw9mSbAHuyT3BlbkFJxeuL7TdaTKDkY9uYM0BC',
                'Content-Type': 'application/json'
            }
        }); 
    } catch (error) {
        console.error('Erro ao solicitar ao GPT:', error);
        res.status(500).send('Erro ao solicitar ao GPT');
    }
    */
    res.json(mockResponse);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
