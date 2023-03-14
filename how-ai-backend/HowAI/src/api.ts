import { Configuration, OpenAIApi } from "openai";
import { CHAT_5_SHOT, CHAT_MODEL, CODE_MODEL } from "./config.js";

export class ApiClient {
  client: OpenAIApi;

  constructor() {
    this.client = getClient();
  }

  async getCommand(platform: string, prompt: string) {
    try {
      const response = await this.client.createChatCompletion({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: `Respond with terminal commands for ${platform} systems.` },
          ...CHAT_5_SHOT,
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


function getClient() {
  const configuration = new Configuration();
  return new OpenAIApi(configuration);
}

