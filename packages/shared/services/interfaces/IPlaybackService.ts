import Recording from "../../models/Recording";

export interface IPlaybackService {
  playRecording(recording: Recording): Promise<void>;
  pauseRecording(): void;
  resetRecording(): void;
}
