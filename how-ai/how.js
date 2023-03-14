#!/usr/bin/env node --no-warnings

import { program } from 'commander';
import * as actions from './src/actions.js';

program
  .option('-c, --code <language>', 'generate code snippet instead of a command prompt')
  .option('-v, --version', 'print version information about how')

program.parse();
const options = program.opts();
const prompt = program.args.join(' ');

// Check version
await actions.update();

// Print version
if (options.version) {
  try {
    await actions.version();
  } catch (err) {
    console.error(`Error: ${err}`)
    process.exit(1);
  }
  process.exit();
}

if (prompt === '') {
  program.outputHelp();
  process.exit(1);
}

// Execute actions
if (options.code) {
  try {
    await actions.code(options.code, prompt);
  } catch (err) {
    console.error(`Error: ${err}`)
    process.exit(1);
  }
  process.exit();
}

try {
  await actions.command(prompt);
} catch (err) {
  console.error(`Error: ${err}`)
  process.exit(1);
}
