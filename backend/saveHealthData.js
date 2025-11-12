import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-south-1" }); // replace with your region

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { userId, heartRate, steps, calories, bp } = body;

    const item = {
      userId: { S: userId },
      timestamp: { S: new Date().toISOString() },
      heartRate: { N: heartRate.toString() },
      steps: { N: steps.toString() },
      calories: { N: calories.toString() },
      bp: { S: bp }
    };

    const command = new PutItemCommand({
      TableName: "HealthData",
      Item: item
    });

    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Health data saved successfully!" })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save data" })
    };
  }
};
