var childProcess = require('child_process');
window.osType = require('os').type();

window.getCurrentWallpaper = function () {
  if (osType === 'Linux') {

    var currentWallpaper = childProcess.execSync('gsettings get org.cinnamon.desktop.background picture-uri',
      { encoding: 'utf8' });

    currentWallpaper = currentWallpaper.split('\n')[0];
    currentWallpaper = currentWallpaper.substring(1, currentWallpaper.length - 1)

    return currentWallpaper;
  } else if (osType === 'Darwin') {

    var currentWallpaper = childProcess.execSync('osascript -e \'tell app "finder" to get ' +
      'posix path of (get desktop picture as alias)\'', { encoding: 'utf8' });

    return currentWallpaper;
  }
};

window.getUserHome = function () {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

window.setCurrentWallpaper = function (url) {
  if (osType === 'Linux') {

    if (url[0] === '/') {
      url = 'file://' + url;
    }

    childProcess.execSync('gsettings set org.cinnamon.desktop.background picture-uri \'' + url + '\'',
      { encoding: 'utf8' });
  } else if (osType === 'Darwin') {

    childProcess.execSync('osascript -e \'tell application "Finder" to set desktop picture to POSIX file "' +
      url + '"\'', { encoding: 'utf8' });
  }
};

window.setWallpaperOption = function (option) {
  if (osType === 'Linux') {
    childProcess.execSync('gsettings set org.cinnamon.desktop.background picture-options \'' + option + '\'',
      { encoding: 'utf8' });
  }
};
