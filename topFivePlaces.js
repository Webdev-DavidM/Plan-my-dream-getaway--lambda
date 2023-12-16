const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: `${process.env.OPEN_AI_API_KEY}`,
});

const getOpenAiCompletion = async ({ prompt }) => {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
};

const handler = async (event) => {
  console.log(process.env);
  const place = JSON.parse(event.body).place;

  const response = await getOpenAiCompletion({
    prompt: `Please give me the top five places to visit in ${place} with no summary or numbers or special characters and the places separated by a comma`,
  });
  const topFivePlaces = response.choices[0].message.content.split(",");

  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(topFivePlaces),
  };
};

module.exports = { handler };
