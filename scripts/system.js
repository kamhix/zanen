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
  } else if (osType === 'Windows_NT') {

    var currentWallpaper = childProcess.execSync('reg query "HKCU\\Control Panel\\Desktop" /v Wallpaper',
      { encoding: 'utf8' });

    currentWallpaper = currentWallpaper.split(' ')[currentWallpaper.split(' ').length - 1];

    return currentWallpaper;
  }
};

window.getUserHome = function () {
  if (process.platform == 'win32') {
    return process.env['USERPROFILE'] + '\\Documents\\';
  } else {
    return process.env['HOME'] + '/.';
  }
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
  } else if (osType === 'Windows_NT') {

    childProcess.execSync('reg add "HKCU\\Control Panel\\Desktop" /v Wallpaper /t REG_SZ /d ' + url + ' /f',
      { encoding: 'utf8' });

    childProcess.execSync('RUNDLL32.EXE user32.dll,UpdatePerUserSystemParameters',
      { encoding: 'utf8' });
  }
};

window.setWallpaperOption = function (option) {
  if (osType === 'Linux') {
    childProcess.execSync('gsettings set org.cinnamon.desktop.background picture-options \'' + option + '\'',
      { encoding: 'utf8' });
  }
};
