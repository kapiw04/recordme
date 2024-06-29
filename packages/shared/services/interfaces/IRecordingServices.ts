import Recording from "../../models/Recording";

export interface IRecordingService {
  prepareRecording(recording: Recording): Promise<void>;
}
