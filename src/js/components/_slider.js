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
  WIN_WIDTH,
  ACTIVE
} from '../constants';

import { buildIcon } from '../utils';

DOC.ready(() => {
  const slider = $('.js-slider');
  const overlay = $('.js-slider-overlay');

  slider.on('init', function(slick) {
    slick = $(slick.currentTarget);
    initControls();
    slider.addClass(INIT);
  });

  slider.on('afterChange', (event, slick, currentSlide) => {
    // PAUSE ALL VIDEOS
    overlay.removeClass(ACTIVE);
    console.log(slick);
    // if (WIN_WIDTH > widthMD) {
    //   const videos = $('.slider__slide video');
    //   videos.each((i, el) => {
    //     $(el)[0].pause();
    //   });
    //   // PLAY CURRENT
    //   let slides = $('.slider__slide');
    //   const videoCurrent = $(slides[currentSlide]).find('video')[0];
    //   if (videoCurrent) {
    //     $(video).removeClass(PAUSED);
    //     videoCurrent.play();
    //   }
    // }
  });

  slider.on('beforeChange', (event, slick, currentSlide) => {
    overlay.addClass(ACTIVE);
  });

  slider.slick({
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: `<button class="slider-btn slider__prev js-slider-prev">${buildIcon(
      'arrow-left'
    )}</button>`,
    nextArrow: `<button class="slider-btn slider__next js-slider-next">${buildIcon(
      'arrow-right'
    )}</button>`,
    responsive: [
      {
        breakpoint: widthMD,
        settings: {
          arrows: false,
          fade: false,
          dots: true
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
    const slide = $(this).closest('.slider__slide');
    const video = slide.find('video')[0];
    video.pause();
    slide.removeClass('is-playing').addClass(PAUSED);
  });

  playBtn.on('click', function(e) {
    const slide = $(this).closest('.slider__slide');
    const video = slide.find('video')[0];
    video.play();
    slide.addClass('is-playing').removeClass(PAUSED);
  });
}
