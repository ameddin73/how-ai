import { ApiClient } from './api.js';
import { API_KEY } from './config.js';

var client: ApiClient;

export function setupClient() {
  if (!API_KEY) {
    throw new Error('missing API key')
  }
  client = new ApiClient(API_KEY)
}

export async function code(language: string, prompt: string) {
  if (!client) {
    throw new Error('client not configured')
  }
  return client.getCode(language, prompt);
}

export async function command(platform: string, prompt: string) {
  if (!client) {
    throw new Error('client not configured')
  }

  // Get command from OpenAI
  var command = await client.getCommand(platform, prompt);

  // Clean command
  command = extractCode(command);
  return command;
}

function extractCode(sentence: string | undefined) {
  if (!sentence || !sentence.includes("`")) return sentence;
  const regex = /`((?:\\`|[^`])+?)`/;
  const matches = regex.exec(sentence);
  return matches ? matches[1] : "";
}

