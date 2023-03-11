import { Configuration, OpenAIApi } from "openai";
import os from 'os';
import { CHAT_MODEL, CODE_MODEL } from "./config.js";

const platform = os.platform();

export class ApiClient {
  constructor(apiKey) {
    this.client = getClient(apiKey);
  }

  async getCommand(prompt) {
    try {
      const response = await this.client.createChatCompletion({
        model: CHAT_MODEL,
        messages: [
          { 'role': 'system', 'content': `You only respond with terminal commands for ${platform} systems. You never return natural language, just executable code.` },
          { 'role': 'user', 'content': `CLI command for this: check if google.com can be reached` },
          { 'role': 'assistant', 'content': `ping www.google.com` },
          { 'role': 'user', 'content': `CLI command for this: ${prompt}?` },
        ],
        max_tokens: 200,
      });

      var command = response.data.choices[0].message.content;
      command = command.replace(/[\n\r]/g, "");
      return command
    } catch (err) {
      console.dir(err)
      throw err;
    }
  }

  async getCode(language, prompt) {
    try {
      const response = await this.client.createCompletion({
        model: CODE_MODEL,
        prompt: `write a code snippet in ${language} to ${prompt}`,
        max_tokens: 1000,
      });

      var snippet = response.data.choices[0].text;
      snippet = snippet.replace(/^\s*\n|\n\s*$/g, "");
      return snippet
    } catch (err) {
      throw err;
    }
  }
}


function getClient(apiKey) {
  const configuration = new Configuration({ apiKey });
  return new OpenAIApi(configuration);
}

