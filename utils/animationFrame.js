export const requestAnimationFrame = typeof window.requestAnimationFrame !== 'undefined' ? window.requestAnimationFrame : function (callback) {
    return setTimeout(callback, 16);
};

export const cancelAnimationFrame = typeof window.cancelAnimationFrame !== 'undefined' ? window.cancelAnimationFrame : clearTimeout;