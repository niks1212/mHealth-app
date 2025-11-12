import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const userId = event.queryStringParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing userId in query parameters" }),
      };
    }

    const params = {
      TableName: "HealthData",
      KeyConditionExpression: "userId = :u",
      ExpressionAttributeValues: {
        ":u": userId,
      },
      ScanIndexForward: false, // latest first
      Limit: 1, // only latest record
    };

    const result = await dynamo.send(new QueryCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Health data fetched successfully!",
        data: result.Items || [],
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch health data",
        details: error.message,
      }),
    };
  }
};
