import { Audio } from "expo-av";
import { makeAutoObservable, runInAction } from "mobx";
import Recording from "../models/Recording";
import RecordingService from "../services/RecordingService";
import DatabaseService from "../services/DatabaseService";
import TimerStore from "./TimerStore";
import * as FileSystem from "expo-file-system";

class RecordingStore {
  isRecording = false;
  audioPermission = false;
  currentRecording: Audio.Recording | null = null;
  recordings: Recording[] = [];
  inSelectionMode = false;
  selectedRecordings: Recording[] = [];
  loadingRecordings = true;
  isModalVisible = false;
  recordingName = "";

  constructor() {
    makeAutoObservable(this);
    this.fetchRecordings();
  }

  async fetchRecordings(): Promise<void> {
    try {
      const recordings = await DatabaseService.getRecordings();
      runInAction(() => {
        this.recordings = recordings;
        this.loadingRecordings = false;
      });
    } catch (error) {
      console.error("Failed to fetch recordings:", error);
      runInAction(() => {
        this.loadingRecordings = false;
      });
    }
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
    if (!this.isRecording) {
      this.setModalVisible(true);
    }
  }

  async startRecording(): Promise<void> {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync();
      await recording.startAsync();
      runInAction(() => {
        this.currentRecording = recording;
        this.isRecording = true;
      });
      TimerStore.startTimer();
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async stopRecording(): Promise<void> {
    if (this.currentRecording) {
      try {
        await this.currentRecording.stopAndUnloadAsync();
        TimerStore.stopTimer();
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
  }

  async deleteRecording(recording: Recording): Promise<void> {
    try {
      if (recording.id === undefined) {
        console.error("Recording id is undefined");
        return;
      }
      await DatabaseService.deleteRecording(recording);
      this.fetchRecordings();
    } catch (error) {
      console.error("Failed to delete recording", error);
    }
  }

  setModalVisible(visible: boolean) {
    this.isModalVisible = visible;
  }

  setRecordingName(name: string) {
    this.recordingName = name;
  }

  async saveRecording() {
    const uri = this.currentRecording?.getURI();
    if (uri) {
      const duration = TimerStore.milisecondsElapsed;
      const recording = new Recording(duration, uri, this.recordingName);
      await RecordingService.prepareRecording(recording);
      await DatabaseService.addRecording(recording);

      runInAction(() => {
        this.currentRecording = null;
        this.isRecording = false;
        this.isModalVisible = false;
        this.recordingName = "";
        this.selectedRecordings = [];
        this.inSelectionMode = false;
      });
      this.fetchRecordings();
    }
  }
  async selectRecording(recording: Recording) {
    if (this.selectedRecordings.includes(recording)) {
      this.selectedRecordings = this.selectedRecordings.filter(
        (r) => r !== recording
      );
      if (this.selectedRecordings.length === 0) {
        this.exitSelectionMode();
      }
    } else {
      this.selectedRecordings.push(recording);
    }
  }

  async selectAllRecordings() {
    for (const recording of this.recordings) {
      await this.selectRecording(recording);
    }
  }
  async deleteSelectedRecordings() {
    for (const recording of this.selectedRecordings) {
      await this.deleteRecording(recording);
    }
    this.exitSelectionMode();
  }

  enterSelectionMode(firstSelectedRecording: Recording | null) {
    runInAction(() => {
      this.inSelectionMode = true;
    });
    if (!firstSelectedRecording) return;
    this.selectedRecordings = [firstSelectedRecording];
  }

  exitSelectionMode() {
    this.selectedRecordings = [];
    this.inSelectionMode = false;
  }
}

export default new RecordingStore();
