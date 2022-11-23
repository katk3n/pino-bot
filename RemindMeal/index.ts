import { AzureFunction, Context } from '@azure/functions';
import { Client as LineClient } from '@line/bot-sdk';

const timerTrigger: AzureFunction = async (context: Context, myTimer: any): Promise<void> => {
  const client = new LineClient({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_SECRET,
  });

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!');
  }
  client.broadcast({
    type: 'text',
    text: 'おなかすいたにゃ',
  });
};

export default timerTrigger;
