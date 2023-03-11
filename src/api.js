import { Configuration, OpenAIApi } from "openai";

export class ApiClient {
  constructor(apiKey) {
    this.client = getClient(apiKey);
  }

  async getCommand(prompt) {
    try {
      const response = await this.client.createCompletion({
        // model: "ada-code-search-code",
        model: "text-davinci-003",
        prompt: `cli command for:  ${prompt}`,
        max_tokens: 200,
      });

      var command = response.data.choices[0].text;
      command = command.replace(/[\n\r]/g, "");
      return command
    } catch (err) {
      throw err;
    }
  }

  async getCode(language, prompt) {
    try {
      const response = await this.client.createCompletion({
        // model: "ada-code-search-code",
        model: "text-davinci-003",
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

