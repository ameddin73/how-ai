import { Context, HttpRequest } from "@azure/functions"
import { code, command, setupClient } from "./src/service";
import { CHAT_MODEL, CODE_MODEL } from "./src/config.js";

export default async function(context: Context, req: HttpRequest): Promise<void> {
  if (req.body) {
    console.debug(req.body);
  } else {
    context.res = { status: 400, body: 'No request body.' };
  }

  setupClient();

  const type = req.query.type;
  switch (type) {
    case 'command':
      try {
        const body = await command(req.body.platform, req.body.prompt);
        console.debug('request:', req.body)
        console.debug('response:', body);
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
        console.debug('request:', req.body)
        console.debug('response:', body);
        context.res = {
          body
        };
      } catch (error) {
        context.res = { status: 500, error }
      }
      break;
    case 'version':
      context.res = {
        body: {
          chat: CHAT_MODEL,
          code: CODE_MODEL,
        }
      };
      console.debug(context.res)
      break;
    default:
      context.res = { status: 404, body: 'Page not found.' };
      break;
  }
};
