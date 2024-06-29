import { makeAutoObservable, runInAction } from "mobx";
import Recording from "../models/Recording";
import PlaybackService from "../services/PlaybackService";

class PlaybackStore {
  isPaused = false;
  isLoading = false;
  currentRecording: Recording | null = null;
  durationLeft: number = 0;
  intervalId: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async playRecording(recording: Recording): Promise<void> {
    if (this.currentRecording?.id === recording.id && this.isPaused) {
      this.startCountdown();
      await PlaybackService.playRecording(recording);
      runInAction(() => {
        this.isLoading = false;
        this.isPaused = false;
      });
    } else {
      this.isLoading = true;
      this.isPaused = false;
      this.currentRecording = recording;
      this.durationLeft = recording.duration;
      this.startCountdown();
      await PlaybackService.playRecording(recording);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async pauseRecording(): Promise<void> {
    this.isPaused = true;
    clearInterval(this.intervalId!);
    await PlaybackService.pauseRecording();
  }

  resetRecording(): void {
    clearInterval(this.intervalId!);
    runInAction(() => {
      this.isPaused = false;
      this.currentRecording = null;
      this.durationLeft = 0;
    });
    PlaybackService.resetRecording();
  }

  startCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      runInAction(() => {
        if (this.isPaused) return;
        this.durationLeft -= 100;
        if (this.durationLeft <= 0) {
          this.resetRecording();
        }
      });
    }, 100);
  }
}

export default new PlaybackStore();
