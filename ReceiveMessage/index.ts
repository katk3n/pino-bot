import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Client as LineClient } from '@line/bot-sdk';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  context.log('HTTP trigger function processed a request.');
  const client = new LineClient({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_SECRET,
  });

  //  for (const event of req.body.events) {
  //  }

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? `Hello, ${name}. This HTTP triggered function executed successfully.`
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  await client
    .pushMessage(process.env.LINE_USER_ID, [
      {
        type: 'text',
        text: responseMessage,
      },
    ])
    .catch((e: Error) => {
      context.log(
        JSON.stringify({
          message: e.message,
        })
      );
    });

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default httpTrigger;
