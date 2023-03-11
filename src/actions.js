import { key } from './config.js';
import { ApiClient } from './api.js';

var client;

export function apiKey(apiKey) {
  key.set(apiKey);
}

export function setupClient() {
  const apiKey = key.get();
  if (!apiKey) {
    throw new Error('missing API key')
  }
  client = new ApiClient(apiKey)
}

export async function code(language, prompt) {
  if (!client) {
    throw new Error('client not configured')
  }
  try {
    const snippet = await client.getCode(language, prompt);
    console.log(snippet);
  } catch (err) {
    throw err;
  }
}

export async function command(prompt) {
  if (!client) {
    throw new Error('client not configured')
  }
  try {
    const command = await client.getCommand(prompt);
    console.log(command);
  } catch (err) {
    throw err;
  }
}
