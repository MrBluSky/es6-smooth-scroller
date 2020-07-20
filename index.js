import Timer from './es';

export default function _scrollTo(scrollerWrapper, x, y, animated, duration) {
    const { scrollLeft, scrollTop } = scrollerWrapper;
    if (animated) {
      var timer = new Timer({
        duration: duration,
        easing: 'easeOutSine',
        onRun: function onRun(e) {
          if (x >= 0) {
            scrollerWrapper.scrollLeft = scrollLeft + e.percent * (x - scrollLeft);
          }
  
          if (y >= 0) {
            scrollerWrapper.scrollTop = scrollTop + e.percent * (y - scrollTop);
          }
        }
      });
      timer.run();
    } else {
      if (x >= 0) {
        scrollerWrapper.scrollLeft = x;
      }
  
      if (y >= 0) {
        scrollerWrapper.scrollTop = y;
      }
    }
  }

