import { key, CHAT_MODEL, CODE_MODEL } from './config.js';
import { ApiClient } from './api.js';
import packageJson from '../package.json' assert { type: 'json' };
import readline from 'readline';
import { spawn } from 'child_process';

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

export function version() {
  console.log(`Version: ${packageJson.version}
Command Model: ${CHAT_MODEL} 
Code Model: ${CODE_MODEL} `);
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
    // Get command from OpenAI
    const command = await client.getCommand(prompt);

    // Create readline
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: process.env.PS1 || '$',
    });

    // Write command
    rl.prompt();
    rl.write(`${command}`);

    // Exec command
    rl.once('line', function(line) {
      // Write command list
      const cmds = getCommandList(line);

      // Create spawn
      const child = spawn(cmds[0], cmds.slice(1), {
        stdio: 'inherit',
        env: {
          ...process.env,
        },
        shell: true,
      });

      child.on('close', (code) => {
        process.exit(code);
      });
    });

    // Close on escape
    rl.input.on('keypress', function(_, key) {
      // Close the readline interface
      if (key.name == 'escape') {
        rl.write('\r');
        rl.close();
      }
    });
  } catch (err) {
    throw err;
  }
}

function getCommandList(command) {
  const regex = /"[^"]+"|\S+/g;
  const cmds = command.match(regex);

  // Enumerate env vars
  cmds.forEach(function(str) {
    const match = str.match(/\$([A-Za-z0-9_]+)|\${([A-Za-z0-9_]+)}/);
    if (match) {
      const varName = match[1] || match[2];
      return process.env[varName];
    }
    return str;
  })
  return cmds;
}
