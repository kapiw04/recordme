import { openDB } from "idb";
import { IDatabaseService } from "./interfaces/IDatabaseService";
import RecordingWeb from "../models/RecordingWeb";
import Recording from "../models/Recording";

const STORE_NAME = "recordings";

export const dbPromise = openDB("recording", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME))
      db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
  },
});

class WebDatabaseService implements IDatabaseService {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase(): Promise<void> {}

  async addRecording(recording: RecordingWeb): Promise<void> {
    const db = await dbPromise;

    db.add(STORE_NAME, {
      title: recording.title,
      createdAt: recording.createdAt.toDateString(),
      duration: recording.duration,
      uri: recording.uri,
      blob: recording.blob,
    });
  }
  async getRecordings(): Promise<Recording[]> {
    const db = await dbPromise;
    const recordings: RecordingWeb[] = await db.getAll(STORE_NAME);

    let recordingsArray: Recording[] = [];

    for (let recording of recordings) {
      const url = URL.createObjectURL(recording.blob);
      recordingsArray.push(
        new Recording(
          recording.duration,
          url,
          recording.title,
          recording.id,
          recording.createdAt
        )
      );
    }

    return recordingsArray;
  }
  async deleteRecording(recording: Recording): Promise<void> {
    const db = await dbPromise;
    db.delete(STORE_NAME, recording.id as number);
  }
}

export default new WebDatabaseService();
