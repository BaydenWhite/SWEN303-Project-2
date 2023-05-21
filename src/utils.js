import axios from 'axios';
require('dotenv').config();

const API_KEY = process.env.OPENAI_API_KEY;


export const performSearch = async searchTerm => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: `You are Chef GPT, an AI assistant for creating great and detailed recipes, a user is sending you the following request, please return a recipe including step by steps instructions, ingredients and a breakdown of the macronutrients and calorie information: ${searchTerm}`,
                max_tokens: 200,
                temperature: 0.6
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data.choices && response.data.choices[0] && response.data.choices[0].text) {
            return { hits: [{ recipe: { label: searchTerm, ingredientLines: response.data.choices[0].text.split("\n") } }] };
        } else {
            throw new Error("No response from OpenAI API");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
