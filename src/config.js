import os from 'os';
import path from 'path';
import fs from 'fs';

const models = {
  textDavinci: 'text-davinci-003',
  codeDavinci: 'code-davinci-002',
  gptThreeFive: 'gpt-3.5-turbo',
}
export const CODE_MODEL = models.codeDavinci;
export const CHAT_MODEL = models.gptThreeFive;

const homeDir = os.homedir();
const configFileName = '.how-cli.json';
const configFilePath = path.join(homeDir, configFileName);
const apiKeyKey = 'apiKey'

export const key = {
  set: function(apiKey) {
    // Define the configuration data
    const configData = { [apiKeyKey]: apiKey };

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
