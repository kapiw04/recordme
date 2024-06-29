import { action, makeObservable, runInAction } from "mobx";

export class TimerStore {
  milisecondsElapsed: number = 0;
  intervalId: NodeJS.Timeout | null = null;

  constructor() {
    makeObservable(this, {
      milisecondsElapsed: true,
      startTimer: action,
      stopTimer: action,
    });
  }

  startTimer() {
    runInAction(() => {
      this.milisecondsElapsed = 0;
    });
    this.intervalId = setInterval(() => {
      runInAction(() => {
        this.milisecondsElapsed += 100;
      });
    }, 100);
  }

  stopTimer() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export default new TimerStore();
