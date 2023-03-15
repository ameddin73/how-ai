import os from 'os';
import axios from 'axios';
import { SERVER_HOST, getVersion, checkForUpdates } from './config.js';
import { copy } from 'copy-paste';

export async function update() {
  return checkForUpdates();
}

export async function version() {
  console.log(`Version: ${getVersion()}`);
  try {
    const models = await axios.get(`${SERVER_HOST}/api/HowAI?type=version`);
    console.log(`Command Model: ${models.data.chat}
Code Model: ${models.data.code}`);
  } catch (err) {
    throw err;
  }
}

export async function code(language, prompt) {
  try {
    const response = await axios.post(
      `${SERVER_HOST}/api/HowAI?type=code`,
      {
        language,
        prompt
      });
    console.log(response.data);
  } catch (err) {
    throw err;
  }
}

export async function command(prompt) {
  try {
    // Get command from OpenAI
    var response = await axios.post(
      `${SERVER_HOST}/api/HowAI?type=command`,
      {
        platform: os.platform(),
        prompt
      },
    );

    // Check if moderated
    if (response.data.flags) {
      console.error(response.data.flags);
      process.exit(1);
    }
    const command = extractCode(response.data.command);

    copy(command);
    console.log('$ \x1b[33m%s\x1b[0m copied to clipboard!', command)
  } catch (err) {
    throw err;
  }
}

function extractCode(sentence) {
  if (!sentence.includes("`")) return sentence;
  const regex = /`((?:\\`|[^`])+?)`/;
  const matches = regex.exec(sentence);
  return matches ? matches[1] : "";
}

