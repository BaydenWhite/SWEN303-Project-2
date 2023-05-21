import { Configuration, OpenAIApi } from "openai";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: "REDACTED",
});
const openai = new OpenAIApi(configuration);

export const performSearch = async (searchTerm) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are Chef GPT, an AI assistant for creating great and detailed recipes, a user is sending you the following request, please return a recipe including step-by-step instructions, ingredients, and a breakdown of the macronutrients and calorie information: ${searchTerm}`,
	  max_tokens: 500,
      temperature: 0.6,
    });

    console.log("GPT Response:", completion.data.choices[0].text);

    if (
      completion.data.choices &&
      completion.data.choices[0] &&
      completion.data.choices[0].text
    ) {
		return {
			text: completion.data.choices[0].text,
		  };
    } else {
      throw new Error("No response from OpenAI API");
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received");
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error:", error.message);
    }
    throw error;
  }
};
