const requestAnimationFrame = typeof window.requestAnimationFrame !== 'undefined' ? window.requestAnimationFrame : function (job) {
    return setTimeout(job, 16);
};
const cancelAnimationFrame = typeof window.cancelAnimationFrame !== 'undefined' ? window.cancelAnimationFrame : clearTimeout;

export default { requestAnimationFrame, cancelAnimationFrame };