import { ChatCompletionRequestMessage } from "openai";

const models = {
  textDavinci: 'text-davinci-003',
  codeDavinci: 'code-davinci-002',
  gptThreeFive: 'gpt-3.5-turbo',
}

export const CODE_MODEL = models.textDavinci;
export const CHAT_MODEL = models.gptThreeFive;
export const API_KEY = process.env["API_KEY"];

export const CHAT_5_SHOT: Array<ChatCompletionRequestMessage> = [
  {
    role: 'system', content: 'Respond with a terminal commands only. Include no explanation or natural language.\
    Do not include templated variables for this. Avoid subshells.' },
  { role: 'user', content: 'check if google.com can be reached' },
  { role: 'assistant', content: 'ping www.google.com' },
  { role: 'user', content: 'good. list all the aks cluster names' },
  { role: 'assistant', content: `az aks list--query '[].name'` },
  { role: 'user', content: 'kill process using port 8080' },
  { role: 'assistant', content: 'sudo lsof -t -i :8080 | xargs kill' },
  { role: 'user', content: 'get all blobs in deveosterraformstate storage account deveosclusters container with alex in the name' },
  { role: 'assistant', content: 'az storage blob list --account-name deveosterraformstate --container-name deveosclusters --prefix alex' },
  { role: 'user', content: 'grep all files recursively that have a string quoted by backticks and a valid URL in it' },
  { role: 'assistant', content: "grep -rE '`.*`|https?://[^\s\"]+' ." },
]
