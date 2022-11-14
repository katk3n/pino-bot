import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Client as LineClient, Message } from '@line/bot-sdk';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  context.log('HTTP trigger function processed a request.');
  const client = new LineClient({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_SECRET,
  });

  for (const event of req.body.events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const message: Message = {
        type: 'text',
        text: `${event.message.text}にゃ`,
      };
      if (event.replyToken) {
        client.replyMessage(event.replyToken, message);
      }
    }
  }
};

export default httpTrigger;
