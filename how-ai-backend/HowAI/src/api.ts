import { Configuration, OpenAIApi } from "openai";
import { CHAT_TRAINING, CHAT_MODEL, CODE_MODEL } from "./config.js";

export class ApiClient {
  client: OpenAIApi;

  constructor(apiKey: string) {
    this.client = getClient(apiKey);
  }

  async moderate(content: string): Promise<string | null> {
    try {
      const response = await this.client.createModeration({
        input: content,
      });

      const flags = [];
      if (response.data.results[0].flagged) {
        const categories = response.data.results[0].categories;
        Object.keys(categories).forEach(key => {
          if (categories[key]) flags.push(key);
        });
      }
      console.debug(flags);

      if (flags.length > 0) {
        return `Sorry, that prompt violated the OpenAI usage policies on ${flags}.

Read more here: https://openai.com/policies/usage-policies`;
      }
    } catch (err) {
      throw err;
    }
    return null;
  }

  async getCommand(platform: string, prompt: string) {
    try {
      const response = await this.client.createChatCompletion({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: `You respond with terminal commands for ${platform} systems.` },
          ...CHAT_TRAINING,
          { role: 'user', content: `${prompt}` },
        ],
        max_tokens: 200,
      });

      var command = response.data.choices[0].message?.content;
      command = command?.replace(/[\n\r]/g, "");
      return command
    } catch (err) {
      throw err;
    }
  }

  async getCode(language: string, prompt: string) {
    try {
      const response = await this.client.createCompletion({
        model: CODE_MODEL,
        prompt: `write a code snippet in the programming language ${language} that does the following: ${prompt}.
                Include code comments that help to explain.`,
        max_tokens: 1000,
      });

      var snippet = response.data.choices[0].text;
      snippet = snippet?.replace(/^\s*\n|\n\s*$/g, "");
      return snippet
    } catch (err) {
      throw err
    }
  }
}


function getClient(apiKey: string) {
  const configuration = new Configuration({ apiKey });
  return new OpenAIApi(configuration);
}

