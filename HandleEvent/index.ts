import { AzureFunction, Context } from '@azure/functions';
import { Client as LineClient, Message } from '@line/bot-sdk';
import getSentiment from './language';

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

  const msg = event.message.text;
  const sentiment = await getSentiment(msg);

  let impression = '';
  switch (sentiment) {
    case 'positive':
      impression = 'それは良かったにゃ！';
      break;
    case 'negative':
      impression = 'それは残念にゃ。。。';
      break;
    case 'mixed':
      impression = 'それは複雑ですにゃ…';
      break;
    default:
      break;
  }

  const message: Message = {
    type: 'text',
    text: `${msg}にゃ！${impression}`,
  };

  client.replyMessage(event.replyToken, message);
};

export default queueTrigger;
