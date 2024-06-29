import Recording from "../../models/Recording";

export interface IDatabaseService {
  initializeDatabase(): Promise<void>;
  addRecording(recording: Recording): Promise<void>;
  getRecordings(): Promise<Recording[]>;
  deleteRecording(recording: Recording): Promise<void>;
}
