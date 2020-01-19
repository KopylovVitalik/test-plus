export const SHUFFLE_ARRAY = arr => arr.sort(() => Math.random() - 0.5);

// Mapping from range (x1, x2) to range(y1, y2)
export const LINE_EQ = (y2, y1, x2, x1, currentVal) => {
  let m = (y2 - y1) / (x2 - x1);
  let b = y1 - m * x1;
  return m * currentVal + b;
};

export const LERP = (a, b, n) => (1 - n) * a + n * b;

export const body = document.body;
export const bodyColor =
  getComputedStyle(body)
    .getPropertyValue('--color-bg')
    .trim() || 'white';

export const getMousePos = e => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

// Window sizes.
let winsize;
export const calcWinsize = () =>
  (winsize = { width: window.innerWidth, height: window.innerHeight });

export const GET_RANDOM = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const GET_RANDOM_INT = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const GET_RANDOM_INT_WITH_NEGATIVE = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const int = Math.floor(Math.random() * (max - min + 1)) + min;
  return int * (Math.random() - 0.5);
};
