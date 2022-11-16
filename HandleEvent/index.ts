import { AzureFunction, Context } from '@azure/functions';
import { Client as LineClient, Message } from '@line/bot-sdk';

const queueTrigger: AzureFunction = async (context: Context, eventItem: string): Promise<void> => {
  context.log('Queue trigger function processed work item', eventItem);
  const client = new LineClient({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_SECRET,
  });

  const event = context.bindings.eventItem;
  if (event.type === 'message' && event.message.type === 'text') {
    const message: Message = {
      type: 'text',
      text: `${event.message.text}にゃにゃにゃ`,
    };
    if (event.replyToken) {
      client.replyMessage(event.replyToken, message);
    } else {
      context.log('this event does not have replyToken');
    }
  } else {
    context.log('wrong event type:', event.type);
  }
};

export default queueTrigger;
