import { Context, HttpRequest } from '@azure/functions';
import { mock } from 'jest-mock-extended';
import httpTrigger from './index';

test('One event is added to the queue', () => {
  const context = mock<Context>();
  const req = mock<HttpRequest>();
  req.body = {
    events: [
      {
        type: 'message',
        message: {
          type: 'text',
          text: 'TEST',
        },
      },
    ],
  };
  const expectedEvents = [
    {
      type: 'message',
      message: {
        type: 'text',
        text: 'TEST',
      },
    },
  ];

  httpTrigger(context, req);
  expect(context.bindings.event).toEqual(expectedEvents);
});

test('Two events are added to the queue', () => {
  const context = mock<Context>();
  const req = mock<HttpRequest>();
  req.body = {
    events: [
      {
        type: 'message',
        message: {
          type: 'text',
          text: 'TEST1',
        },
      },
      {
        type: 'message',
        message: {
          type: 'text',
          text: 'TEST2',
        },
      },
    ],
  };
  const expectedEvents = [
    {
      type: 'message',
      message: {
        type: 'text',
        text: 'TEST1',
      },
    },
    {
      type: 'message',
      message: {
        type: 'text',
        text: 'TEST2',
      },
    },
  ];

  httpTrigger(context, req);
  expect(context.bindings.event).toEqual(expectedEvents);
});

test('Only text message events are added to the queue', () => {
  const context = mock<Context>();
  const req = mock<HttpRequest>();
  req.body = {
    events: [
      {
        type: 'message',
        message: {
          type: 'text',
          text: 'TEST1',
        },
      },
      {
        type: 'message',
        message: {
          type: 'image',
          text: 'TEST2',
        },
      },
      {
        type: 'message',
        message: {
          type: 'text',
          text: 'TEST3',
        },
      },
    ],
  };
  const expectedEvents = [
    {
      type: 'message',
      message: {
        type: 'text',
        text: 'TEST1',
      },
    },
    {
      type: 'message',
      message: {
        type: 'text',
        text: 'TEST3',
      },
    },
  ];

  httpTrigger(context, req);
  expect(context.bindings.event).toEqual(expectedEvents);
});

test('Only message events are added to the queue', () => {
  const context = mock<Context>();
  const req = mock<HttpRequest>();
  req.body = {
    events: [
      {
        type: 'unsend',
        message: {
          type: 'text',
          text: 'TEST1',
        },
      },
      {
        type: 'message',
        message: {
          type: 'text',
          text: 'TEST2',
        },
      },
    ],
  };
  const expectedEvents = [
    {
      type: 'message',
      message: {
        type: 'text',
        text: 'TEST2',
      },
    },
  ];

  httpTrigger(context, req);
  expect(context.bindings.event).toEqual(expectedEvents);
});
