import { ChatCompletionRequestMessage } from "openai";

export const CHAT_MODEL = "gpt-3.5-turbo";
export const CODE_MODEL = "text-davinci-003";
export const API_KEY = process.env["APIKEY"];

export const CHAT_TRAINING: Array<ChatCompletionRequestMessage> = [
  {
    role: 'system', content: 'You are a helpful assistant. You suggest terminal commands based on natural language.\
    You only respond with terminal commands. You never use natural language or explain you code.\
    You avoid templated variables for this. You avoid subshells.' },
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
  { role: 'user', content: 'say good job out loud' },
  { role: 'assistant', content: 'say "good job"' },
  { role: 'user', content: 'send an email' },
  { role: 'assistant', content: 'mailx - s "Subject" - a "Attachment" recipient@example.com < message.txt' },
  { role: 'user', content: 'edit my shell config' },
  { role: 'assistant', content: 'vi ~/.zshrc' },
  { role: 'user', content: 'search the web for baseball' },
  { role: 'assistant', content: 'open "https://www.google.com/search?q=baseball"' },
  { role: 'user', content: 'get todays weather' },
  { role: 'assistant', content: 'curl wttr.in' },
]
