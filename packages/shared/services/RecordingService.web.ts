import { IRecordingService } from "./interfaces/IRecordingServices";
import RecordingWeb from "../models/RecordingWeb";

class RecordingService implements IRecordingService {
  async prepareRecording(recording: RecordingWeb): Promise<void> {
    if (!recording.uri) {
      console.error("No recording to move: uri is null.");
      return;
    }

    const arrayBuffer = await (await fetch(recording.uri)).arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/wav" });

    recording.blob = blob;
  }
}

export default new RecordingService();
