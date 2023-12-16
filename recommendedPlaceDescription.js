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
  const placesArray = JSON.parse(event.body).placesArray;

  const updatedPlaceArray = await Promise.all(
    placesArray.map(async (place) => {
      const response = await getOpenAiCompletion({
        prompt: `Please give me a 100 word summary of why ${place} is good to visit`,
      });
      return {
        place: `${place}`,
        summary: response.choices[0].message.content || "",
      };
    })
  );

  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(updatedPlaceArray || []),
  };
};

module.exports = { handler };
