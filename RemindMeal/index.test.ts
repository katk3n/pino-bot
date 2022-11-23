import { Context } from '@azure/functions';
import { mock } from 'jest-mock-extended';
import { Client as LineClient, MessageAPIResponseBase } from '@line/bot-sdk';
import timerTrigger from './index';

jest.mock('@line/bot-sdk');

beforeEach(() => {
  jest.clearAllMocks();
});

test('broadcast message', () => {
  const context = mock<Context>();
  const responseBase = mock<MessageAPIResponseBase>();
  const timer = {};

  const mockBroadcast = LineClient.prototype.broadcast as jest.Mock;
  mockBroadcast.mockReturnValue(Promise.resolve(responseBase));
  timerTrigger(context, timer);
  expect(mockBroadcast.mock.calls.length).toBe(1);
  expect(mockBroadcast.mock.calls[0][0]).toEqual({
    type: 'text',
    text: 'おなかすいたにゃ',
  });
});
