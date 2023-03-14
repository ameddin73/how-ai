import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { code, command, setupClient } from "./src/service";

const howAI: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
  if (req.body) {
  } else {
    context.res = { status: 400, body: 'No request body.' };
  }

  setupClient();

  const type = req.query.type;
  switch (type) {
    case 'command':
      try {
        const body = await command(req.body.platform, req.body.prompt);
        console.log('request:', req.body)
        console.log('response:', body);
        context.res = {
          body
        };
      } catch (error) {
        context.res = { status: 500, error }
      }
      break;
    case 'code':
      try {
        const body = await code(req.body.language, req.body.prompt);
        console.log('request:', req.body)
        console.log('response:', body);
        context.res = {
          body
        };
      } catch (error) {
        context.res = { status: 500, error }
      }
      break;
    default:
      context.res = { status: 404, body: 'Page not found.' };
      break;
  }
};

export default howAI;
