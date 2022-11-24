import { Context } from '@azure/functions';
import { mock } from 'jest-mock-extended';
import { Client as LineClient, MessageAPIResponseBase } from '@line/bot-sdk';
import queueTrigger from './index';

jest.mock('@line/bot-sdk');

beforeEach(() => {
  jest.clearAllMocks();
});

test('send message', () => {
  const context = mock<Context>();
  const responseBase = mock<MessageAPIResponseBase>();
  const eventItem = 'dummy';
  context.bindings.eventItem = {
    type: 'message',
    replyToken: 'REPLY_TOKEN',
    message: {
      type: 'text',
      text: 'TEST',
    },
  };

  const mockReplyMessage = LineClient.prototype.replyMessage as jest.Mock;
  mockReplyMessage.mockReturnValue(Promise.resolve(responseBase));
  queueTrigger(context, eventItem);
  expect(mockReplyMessage.mock.calls.length).toBe(1);
  expect(mockReplyMessage.mock.calls[0][0]).toEqual('REPLY_TOKEN');
  expect(mockReplyMessage.mock.calls[0][1]).toEqual({
    type: 'text',
    text: 'TESTにゃ！',
  });
});
