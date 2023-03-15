import os from 'os';
import axios from 'axios';
import readline from 'readline';
import { spawn } from 'child_process';
import { SERVER_HOST, getVersion, checkForUpdates } from './config.js';

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
    const command = extractCode(response.data);

    // Create readline
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: process.env.PS1 || '$',
    });

    // Write command
    rl.prompt();
    rl.write(` ${command} `);

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
  // Capture tokens
  const regex = /\$\([^)]+\)|"[^"]+"|\S+/g;
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

function extractCode(sentence) {
  if (!sentence.includes("`")) return sentence;
  const regex = /`((?:\\`|[^`])+?)`/;
  const matches = regex.exec(sentence);
  return matches ? matches[1] : "";
}

