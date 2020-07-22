import Timer from './es';

/**
 * 
 * @param {DOM} scrollerWrapper 滚动容器的DOM对象
 * @param {number} x x轴的滚动距离
 * @param {number} y y轴的滚动距离
 * @param {boolean} animated 是否需要平滑过渡效果
 * @param {number} duration 平滑效果过渡的时间
 */

export default function smoothScrollTo(scrollerWrapper, x, y, animated, duration) {
    const { scrollLeft, scrollTop } = scrollerWrapper;
    if (animated) {
      const timer = new Timer({
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

