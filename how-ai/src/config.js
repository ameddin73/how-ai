import os from 'os';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import packageJson from '../package.json' assert { type: 'json' };

const models = {
  textDavinci: 'text-davinci-003',
  codeDavinci: 'code-davinci-002',
  gptThreeFive: 'gpt-3.5-turbo',
}
export const CODE_MODEL = models.textDavinci;
export const CHAT_MODEL = models.gptThreeFive;

const homeDir = os.homedir();
const configFileName = '.how-cli.json';
const configFilePath = path.join(homeDir, configFileName);
const apiKeyKey = 'apiKey'

export const key = {
  set: function(apiKey) {
    const fileData = fs.readFileSync(configFilePath);
    const parsedData = JSON.parse(fileData);

    // Define the configuration data
    const configData = {
      ...parsedData,
      [apiKeyKey]: apiKey
    };

    // Write the configuration data to the file
    fs.writeFileSync(configFilePath, JSON.stringify(configData));
  },

  get: function() {
    // Read the configuration data from the file
    const fileData = fs.readFileSync(configFilePath);
    const parsedData = JSON.parse(fileData);
    return parsedData[apiKeyKey]
  }
}

const packageName = 'how-ai';
export function getVersion() {
  return packageJson.version;
}
export async function checkForUpdates() {
  // Check if it's a new day
  const fileData = fs.readFileSync(configFilePath);
  const parsedData = JSON.parse(fileData);
  if (parsedData.checkDate && (new Date(parsedData.checkDate)).getTime() >= new Date().setHours(0, 0, 0, 0)) {
    return;
  }

  // Define the configuration data
  const configData = {
    ...parsedData,
    checkDate: Date(),
  };

  // Write the configuration data to the file
  fs.writeFileSync(configFilePath, JSON.stringify(configData));

  // Check if up to date
  try {
    const packageInfo = await axios.get(`https://registry.npmjs.org/${packageName}`);
    const latestVersion = packageInfo.data['dist-tags'].latest;
    const installedVersion = getVersion();

    if (latestVersion !== installedVersion) {
      console.log(`New version available: ${latestVersion}`);
    } else {
      console.log('Package is up to date');
    }
  } catch (error) {
    console.error(`Error checking for updates: ${error.message}`);
  }
};
