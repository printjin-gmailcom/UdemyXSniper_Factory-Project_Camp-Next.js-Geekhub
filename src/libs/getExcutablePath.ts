const executablePath: { [platform: string]: string } = {
  linux: '/usr/bin/chromium-browser',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
};

const getExecutablePath = (platform: NodeJS.Platform): string => {
  return executablePath[platform] || executablePath.win32;
};

export default getExecutablePath;
