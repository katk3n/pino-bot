import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  context.log('HTTP trigger function processed a request.');
  const textEvents = req.body.events.filter((event) => event.type === 'message' && event.message.type === 'text');
  context.bindings.event = textEvents;
};

export default httpTrigger;
