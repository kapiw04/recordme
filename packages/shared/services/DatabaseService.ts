import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import Recording from "../models/Recording";
import { IDatabaseService } from "./interfaces/IDatabaseService";

type RecordingDbResponse = {
  duration: number;
  uri: string;
  createdAt: string;
  id: number;
  title: string;
};

class DatabaseService implements IDatabaseService {
  db!: Promise<SQLite.SQLiteDatabase>;

  constructor() {
    try {
      this.db = SQLite.openDatabaseAsync("recording.db");
      this.initializeDatabase();
    } catch (error) {
      console.error("Failed to open database", error);
    }
  }

  async initializeDatabase(): Promise<void> {
    try {
      const db = await this.db;
      // temporary line: remove database
      // await db.execAsync("DROP TABLE IF EXISTS recordings;");
      await db.execAsync(
        "CREATE TABLE IF NOT EXISTS recordings (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, createdAt TEXT, duration INTEGER, uri TEXT);"
      );
    } catch (error) {
      console.error("Failed to initialize database", error);
    }
  }

  async addRecording(recording: Recording): Promise<void> {
    try {
      const db = await this.db;
      db.runAsync(
        `INSERT INTO recordings (title, createdAt, duration, uri) VALUES (?, ?, ?, ?);`,
        [
          recording.title,
          recording.createdAt.toDateString(),
          recording.duration,
          recording.uri,
        ]
      );
    } catch (error) {
      console.error("Failed to add recording to database", error);
    }
  }

  async getRecordings(): Promise<Recording[]> {
    try {
      const db = await this.db;
      const result: RecordingDbResponse[] = await db.getAllAsync(
        "SELECT * FROM recordings;"
      );
      if (result === null) {
        return [];
      }
      let recordings: Recording[] = [];
      for (let i = 0; i < result.length; i++) {
        const row = result[i];
        recordings.push(
          new Recording(
            row.duration,
            row.uri,
            row.title,
            row.id,
            new Date(row.createdAt)
          )
        );
      }
      return recordings;
    } catch (error) {
      console.error("Failed to fetch recordings from database", error);
      return [];
    }
  }

  async deleteRecording(recording: Recording): Promise<void> {
    const db = await this.db;
    try {
      await db.execAsync(`DELETE FROM recordings WHERE id=${recording.id};`);
      await FileSystem.deleteAsync(recording.uri);
    } catch (error) {
      console.error("Failed to delete recording from database", error);
    }
  }
}

export default new DatabaseService();
