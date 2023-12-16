const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amzn-Trace-Id",
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
    },
    body: JSON.stringify("cors ok"),
  };
};

module.exports = { handler };
