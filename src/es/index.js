import { requestAnimationFrame, cancelAnimationFrame } from '../../utils/animationFrame';
import { TYPES, easing, MIN_DURATION, noop } from  '../../utils/const';

export default class Timer {
	constructor(config){
		this.config = {
			easing: 'easeOutSine',
			duration: Infinity,
			onStart: noop,
			onRun: noop,
			onStop: noop,
			onEnd: noop
		};
		this.isfinished = false;
		this.config = {...this.config, ...config}
	}

	run() {
		const { duration, onStart, onRun } = this.config;
		
    if (duration <= MIN_DURATION) {
      this.isfinished = true;
      onRun({
        percent: 1
      });
      this.stop();
    }

    if (this.isfinished) return;
    this._hasFinishedPercent = this._stop && this._stop.percent || 0;
    this._stop = null;
    this.start = Date.now();
    this.percent = 0;
    onStart({
      percent: 0,
      type: TYPES.START
		});
    
    this.easingFn = easing[this.config.easing];

    this._run();
	}
	
	_run() {
    const { onRun, onStop, duration } = this.config;
    this._raf && cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => {
      this.now = Date.now();
      this.t = this.now - this.start;
      this.duration = this.now - this.start >= duration ? duration : this.now - this.start;
      this.progress = this.easingFn(this.duration / duration);
      this.percent = this.duration / duration + this._hasFinishedPercent;
      if (this.percent >= 1 || this._stop) {
        this.percent = this._stop && this._stop.percent ? this._stop.percent : 1;
        this.duration = this._stop && this._stop.duration ? this._stop.duration : this.duration;
        onRun({
          percent: this.progress,
          originPercent: this.percent,
          t: this.t,
          type: TYPES.RUN
        });
        onStop({
          percent: this.percent,
          t: this.t,
          type: TYPES.STOP
        });
        if (this.percent >= 1) {
          this.isfinished = true;
          this.stop();
        }
        return;
      }
      onRun({
        percent: this.progress,
        originPercent: this.percent,
        t: this.t,
        type: TYPES.RUN
      });
      this._run();
    });
	}
	
	stop() {
    const onEnd = this.config.onEnd;
    this._stop = {
      percent: this.percent,
      now: this.now
    };
    onEnd({
      percent: 1,
      t: this.t,
      type: TYPES.END
    });
    cancelAnimationFrame(this._raf);
	}
}