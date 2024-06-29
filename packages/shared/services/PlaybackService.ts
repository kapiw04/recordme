import { SoundObject } from "expo-av/build/Audio";
import Recording from "../models/Recording";
import { IPlaybackService } from "./interfaces/IPlaybackService";
import { Audio } from "expo-av";

class PlaybackService implements IPlaybackService {
  currentRecording: Recording | null = null;
  currentSound: SoundObject | null = null;

  async playRecording(recording: Recording): Promise<void> {
    try {
      if (this.currentRecording?.id !== recording.id) {
        if (this.currentSound) {
          await this.currentSound.sound.unloadAsync();
        }
        this.currentSound = await Audio.Sound.createAsync(
          { uri: recording.uri },
          { shouldPlay: true }
        );
        this.currentRecording = recording;
      } else if (this.currentSound) {
        await this.currentSound.sound.playAsync();
      }
    } catch (error) {
      console.error("Failed to play recording", error);
    }
  }

  async pauseRecording(): Promise<void> {
    try {
      if (this.currentSound) {
        await this.currentSound.sound.pauseAsync();
      }
    } catch (error) {
      console.error("Failed to pause recording", error);
    }
  }

  async resetRecording(): Promise<void> {
    try {
      if (this.currentSound) {
        await this.currentSound.sound.stopAsync();
        await this.currentSound.sound.unloadAsync();
        this.currentSound = null;
      }
      this.currentRecording = null;
    } catch (error) {
      console.error("Failed to reset recording", error);
    }
  }
}

export default new PlaybackService();
