import { AzureFunction, Context } from '@azure/functions';
import { Client as LineClient, Message } from '@line/bot-sdk';

const queueTrigger: AzureFunction = async (context: Context, eventItem: string): Promise<void> => {
  context.log('Queue trigger function processed work item', eventItem);
  const client = new LineClient({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_SECRET,
  });

  const event = context.bindings.eventItem;
  if (event.type !== 'message') {
    context.log('this event type is not supported:', event.type);
    return;
  }
  if (event.message.type !== 'text') {
    context.log('this message type is not supported:', event.message.type);
    return;
  }
  if (!event.replyToken) {
    context.log('this event does not have replyToken');
    return;
  }

  const message: Message = {
    type: 'text',
    text: `${event.message.text}にゃ！`,
  };

  client.replyMessage(event.replyToken, message);
};

export default queueTrigger;
