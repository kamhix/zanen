
$(window).on('load', function () {

  var $viewOne = $('[data-view-one]');
  var $viewTwo = $('[data-view-two]');

  var $backViewOne = $('[data-back-view-one]');
  var $currentWallpaper = $('[data-current-wallpaper]');
  var $imagePicker = $('[data-image-picker]');
  var $wallpaperSet = $('[data-set-wallpaper]');
  var $wallpaperLoader = $('[data-wallpaper-loader]');
  var $wallpaperOptions = $('[data-wallpaper-options] > li > a');

  var currentUrl;

  $('[data-save-wallpaper]').on('click', function () {
    window.saveFile('[data-file-saver]', function (url) {
      window.saveWallpaper(url, function (outUrl) {}, true);
    });
  });

  $wallpaperOptions.on('click', function (e) {
    e.preventDefault();
    if ($(this).data('options') === 'saveAs') {
      window.saveFile('[data-file-saver]', function (url) {
        window.saveWallpaper(url, function (outUrl) {}, true);
      });
    } else {
      window.setWallpaperOption($(this).data('options'));
    }
  });

  var loadViewTwo = function (url) {
    currentUrl = url;
    $('#wallpaper').replaceWith('<img class="img-responsive" src="' + url + '" id="wallpaper">');
    window.resetFilterList();
    $viewOne.addClass('hide');
    $viewTwo.removeClass('hide');
    window.initWallpaper();
  };

  $imagePicker.on('click', function (e) {
    e.preventDefault();

    window.chooseFile('[data-file-picker]', function (url) {
      loadViewTwo(url);
    });
  });

  $currentWallpaper.on('click', function (e) {
    e.preventDefault();
    loadViewTwo(this.src);
  });

  $backViewOne.on('click', function () {
    $viewTwo.addClass('hide');
    $viewOne.removeClass('hide');
    $currentWallpaper.attr('src', window.getCurrentWallpaper());
  });

  $wallpaperSet.on('click', function () {
    var output = window.getUserHome() + '/.';
    $wallpaperLoader.removeClass('hide');
    window.saveWallpaper(output, function (outputUrl) {
      $wallpaperLoader.addClass('hide');
      window.setCurrentWallpaper(outputUrl);
    });
  });

  $('a[target=_blank]').on('click', function(){
    require('nw.gui').Shell.openExternal(this.href);
    return false;
  });

  if (window.osType === 'Windows_NT') {
    $('[data-save-wallpaper]').removeClass('hide');
    $('[data-set-wallpaper]').addClass('hide');
    $('[data-options-dropdown-caret]').addClass('hide');
    $('[data-wallpaper-options]').addClass('hide');
  } else if (window.osType === 'Darwin') {
    $('[data-wallpaper-options] li.for-linux').addClass('hide');
  }

  $currentWallpaper.attr('src', window.getCurrentWallpaper());
  window.loadFilterList();

});
