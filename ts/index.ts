import { requestAnimationFrame, cancelAnimationFrame } from './utils';
import { TYPES, easing, MIN_DURATION, noop } from  './const';
  
class Timer {
  config: {
    easing: string;
    duration: number;
    onStart: (args: any) => void;
    onRun: (args: any) => void;
    onStop: (args: any) => void;
    onEnd: (args: any) => void;
  };
  isfinished: boolean;
  start: number;
  percent: number;
  easingFn: (x: number) => number;
  now: number;
  t: number;
  duration: number;
  progress: number;
  private _hasFinishedPercent;
  private _stop;
  private _raf;

	constructor(config:any){
		this.config = {
			easing: 'linear',
			duration: Infinity,
			onStart: noop,
			onRun: noop,
			onStop: noop,
			onEnd: noop
		};
		this.isfinished = false;
		this.config = {...this.config, ...this.config}
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
    const _this = this;
		const { onRun, onStop } = this.config;
		
    this._raf && cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(function () {
      _this.now = Date.now();
      _this.t = _this.now - _this.start;
      _this.duration = _this.now - _this.start >= _this.config.duration ? _this.config.duration : _this.now - _this.start;
      _this.progress = _this.easingFn(_this.duration / _this.config.duration);
      _this.percent = _this.duration / _this.config.duration + _this._hasFinishedPercent;

      if (_this.percent >= 1 || _this._stop) {
        _this.percent = _this._stop && _this._stop.percent ? _this._stop.percent : 1;
        _this.duration = _this._stop && _this._stop.duration ? _this._stop.duration : _this.duration;
        onRun({
          percent: _this.progress,
          originPercent: _this.percent,
          t: _this.t,
          type: TYPES.RUN
        });
        onStop({
          percent: _this.percent,
          t: _this.t,
          type: TYPES.STOP
        });

        if (_this.percent >= 1) {
          _this.isfinished = true;

          _this.stop();
        }

        return;
      }

      onRun({
        percent: _this.progress,
        originPercent: _this.percent,
        t: _this.t,
        type: TYPES.RUN
      });

      _this._run();
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

export default Timer;