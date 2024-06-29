import * as FileSystem from "expo-file-system";
import { IRecordingService } from "./interfaces/IRecordingServices";
import Recording from "../models/Recording";

class NativeRecordingService implements IRecordingService {
  async prepareRecording(recording: Recording): Promise<void> {
    if (!recording.uri) {
      console.error("No recording to move: uri is null.");
      return;
    }
    const fileName = `${recording.title}.m4a`;
    const directory = FileSystem.documentDirectory + "recordings/";
    const destination = directory + fileName;
    try {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      await FileSystem.moveAsync({
        from: recording.uri,
        to: destination,
      });
      recording.uri = destination;
    } catch (error) {
      console.error("Failed to move recording", error);
    }
  }
}

export default new NativeRecordingService();
