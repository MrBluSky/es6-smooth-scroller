简洁，高效，实用的scrollTo功能!

## 特点
主要是为了解决IOS，Safari上对于原生scrollTo或scrollIntoView中平滑过渡配置项不支持！除此之外，尺寸足够小，就是一个功能函数！
当然了，同时适用于pc与mobile，都可以实现平滑过渡的滚动效果。

## 使用:

#### 1. 安装
```
npm install es6-smooth-scroller -S
或
npm install es6-smooth-scroller -S --registry http://registry.cnpmjs.org
```

#### 2. 使用

```
import smoothScrollTo from 'es6-smooth-scroller';

/**
 * 
 * @param {DOM} scrollerWrapper 滚动容器的DOM对象
 * @param {number} x x轴的滚动距离
 * @param {number} y y轴的滚动距离
 * @param {boolean} animated 是否需要平滑过渡效果
 * @param {number} duration 平滑效果过渡的时间
 */

smoothScrollTo(scrollerWrapper, x, y, animated, duration);
```
