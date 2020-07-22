export const TYPES = {
    START: 'start',
    END: 'end',
    RUN: 'run',
    STOP: 'stop'
  };

export const easing = {
    easeOutSine: function easeOutSine(x) {
        return Math.sin(x * Math.PI / 2);
    }
};
export const MIN_DURATION = 1;

export const noop = function () {};
