import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  context.log('HTTP trigger function processed a request.');

  for (const event of req.body.events) {
    if (event.type === 'message' && event.message.type === 'text') {
      context.bindings.event = event;
    }
  }
};

export default httpTrigger;
