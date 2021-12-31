import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-2',
  endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  apiVersion: 'latest',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default docClient;
