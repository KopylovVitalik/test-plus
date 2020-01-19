import slick from 'slick-carousel';

var slideWrapper = $('.main-slider'),
  iframes = slideWrapper.find('.embed-player'),
  lazyImages = slideWrapper.find('.slide-image'),
  lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), '*');
}

// When the slide is changing
function playPauseVideo(slick, control) {
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find('.slick-current');
  slideType = currentSlide.attr('class').split(' ')[1];
  player = currentSlide.find('iframe').get(0);
  startTime = currentSlide.data('video-start');

  if (slideType === 'vimeo') {
    switch (control) {
      case 'play':
        if (
          startTime != null &&
          startTime > 0 &&
          !currentSlide.hasClass('started')
        ) {
          currentSlide.addClass('started');
          postMessageToPlayer(player, {
            method: 'setCurrentTime',
            value: startTime
          });
        }
        postMessageToPlayer(player, {
          method: 'play',
          value: 1
        });
        break;
      case 'pause':
        postMessageToPlayer(player, {
          method: 'pause',
          value: 1
        });
        break;
    }
  } else if (slideType === 'youtube') {
    switch (control) {
      case 'play':
        postMessageToPlayer(player, {
          event: 'command',
          func: 'mute'
        });
        postMessageToPlayer(player, {
          event: 'command',
          func: 'playVideo'
        });
        break;
      case 'pause':
        postMessageToPlayer(player, {
          event: 'command',
          func: 'pauseVideo'
        });
        break;
    }
  } else if (slideType === 'video') {
    video = currentSlide.children('video').get(0);
    if (video != null) {
      if (control === 'play') {
        video.play();
      } else {
        video.pause();
      }
    }
  }
}

// Resize player
function resizePlayer(iframes, ratio) {
  if (!iframes[0]) return;
  var win = $('.main-slider'),
    width = win.width(),
    playerWidth,
    height = win.height(),
    playerHeight,
    ratio = ratio || 16 / 9;

  iframes.each(function() {
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current
        .width(playerWidth)
        .height(height)
        .css({
          left: (width - playerWidth) / 2,
          top: 0
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current
        .width(width)
        .height(playerHeight)
        .css({
          left: 0,
          top: (height - playerHeight) / 2
        });
    }
  });
}

// DOM Ready
$(function() {
  // Initialize
  slideWrapper.on('init', function(slick) {
    slick = $(slick.currentTarget);
    setTimeout(function() {
      playPauseVideo(slick, 'play');
    }, 1000);
    resizePlayer(iframes, 16 / 9);
  });
  slideWrapper.on('beforeChange', function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick, 'pause');
  });
  slideWrapper.on('afterChange', function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick, 'play');
  });
  slideWrapper.on('lazyLoaded', function(event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length) {
      lazyImages.addClass('show');
      // slideWrapper.slick("slickPlay");
    }
  });

  //start the slider
  slideWrapper.slick({
    // fade:true,
    autoplaySpeed: 4000,
    lazyLoad: 'progressive',
    speed: 600,
    arrows: false,
    dots: true,
    cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)'
  });
});

// Resize event
$(window).on('resize.slickVideoPlayer', function() {
  resizePlayer(iframes, 16 / 9);
});

var youtube = function() {
  var tag = document.createElement('script');

  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video1', {
    videoId: 'Bey4XXJAqS8',
    events: {
      onReady: onPlayerReady
    },
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: 1,
      autohide: 1
    }
  });
}

function onPlayerReady() {}

youtube();

const slider = $('.js-slider');

// slider.on("init", () => {
//   slider.addClass(INIT);
//   // const video = $('video', slider)[0];
//   // video.play();
//   initControls();
// });

// OLD
import slick from 'slick-carousel';

import {
  BODY,
  DOC,
  WIN,
  INIT,
  widthMD,
  widthSM,
  PAUSED,
  FULLSCREEN,
  WIN_WIDTH
} from '../constants';

import { buildIcon } from '../utils';

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), '*');
}

DOC.ready(() => {
  
  slider.on('init', function(slick) {
    slick = $(slick.currentTarget);
    initControls();
    slider.addClass(INIT);
    // setTimeout(function() {
    //   playPauseVideo(slick, 'play');
    // }, 100);
    // setTimeout(function() {
    //   playPauseVideo(slick, 'pause');
    // }, 4000);
  });

  // slider.on('beforeChange', function(event, slick) {
  //   slick = $(slick.$slider);
  //   playPauseVideo(slick, 'pause');
  // });

  // slider.on('afterChange', function(event, slick) {
  //   slick = $(slick.$slider);
  //   playPauseVideo(slick, 'play');
  // });

  // slider.on('afterChange', (event, slick, currentSlide) => {
  //   // PAUSE ALL VIDEOS
  //   if (WIN_WIDTH > widthMD) {
  //     const videos = $('.offers-slider__slide video');
  //     videos.each((i, el) => {
  //       $(el)[0].pause();
  //     });
  //     // PLAY CURRENT
  //     let slides = $('.offers-slider__slide');
  //     const videoCurrent = $(slides[currentSlide]).find('video')[0];
  //     if (videoCurrent) {
  //       $(video).removeClass(PAUSED);
  //       videoCurrent.play();
  //     }
  //   }
  // });

  slider.slick({
    // dots: true,
    // infinite: false,
    speed: 1800,
    // fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    prevArrow: `<button class="slider-btn slider__prev js-slider-prev">${buildIcon(
      'arrow-left'
    )}</button>`,
    nextArrow: `<button class="slider-btn slider__next js-slider-next">${buildIcon(
      'arrow-right'
    )}</button>`,
    customPaging: (slider, pageIndex) => {
      return $(`<button class="offers-slider__dot">
    <svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle stroke="#000" stroke-width="2" cx="17" cy="17" r="16"></circle>
      </g>
    </svg>
    </button>`);
    },
    responsive: [
      {
        breakpoint: widthMD,
        settings: {
          arrows: false,
          fade: false
        }
      }
    ]
  });

  const video = $('.js-video');
  video.each((i, el) => {
    if (el.paused) $(el).addClass(PAUSED);
  });
});

function initControls() {
  const playBtn = $('.js-video-play');
  const pauseBtn = $('.js-video-pause');
  const slider = playBtn.closest('.js-slider');

  pauseBtn.on('click', function(e) {
    const video = $(this)
      .closest('.slider__video-wrapper')
      .find('video')[0];
    video.pause();
    $(video).addClass(PAUSED);
  });

  playBtn.on('click', function(e) {
    const video = $(this)
      .closest('.slider__video-wrapper')
      .find('video')[0];
    video.play();
    $(video).removeClass(PAUSED);
  });
}

// When the slide is changing
function playPauseVideo(slick, control) {
  var currentSlide, player, video;

  currentSlide = slick.find('.slick-current');
  player = currentSlide.find('iframe').get(0);
  console.log(player);
  switch (control) {
    case 'play':
      postMessageToPlayer(player, {
        event: 'command',
        func: 'mute'
      });
      postMessageToPlayer(player, {
        event: 'command',
        func: 'playVideo'
      });
      break;
    case 'pause':
      postMessageToPlayer(player, {
        event: 'command',
        func: 'pauseVideo'
      });
      break;
  }
}
