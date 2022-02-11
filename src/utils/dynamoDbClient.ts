import { DynamoDB } from "aws-sdk"

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    // para poder usar o dynamo offline sem precisar de credenciais da aws
    accessKeyId: "x",
    secretAccessKey: "x"
}

const isOffline = () => {
    return process.env.IS_OFFLINE
    
}

export const document = isOffline() ? new DynamoDB.DocumentClient(options) : new DynamoDB.DocumentClient()