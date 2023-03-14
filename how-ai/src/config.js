import os from 'os';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import packageJson from '../package.json' assert { type: 'json' };

export const SERVER_HOST = process.env["HOW_SERVER_HOST"]

const homeDir = os.homedir();
const configFileName = '.how-cli.json';
const configFilePath = path.join(homeDir, configFileName);

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
      //\x1b[33m sets the string output to yellow and \x1b[0m resets the console after the output
      console.log('\x1b[33m%s\x1b[0m', `New version available: ${latestVersion}`);
    }
  } catch (error) {
    console.error(`Error checking for updates: ${error.message}`);
  }
};
