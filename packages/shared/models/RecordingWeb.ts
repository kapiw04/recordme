import Recording from "./Recording";

export default class RecordingWeb extends Recording {
  blob: Blob;

  constructor(
    duration: number,
    uri: string,
    title: string,
    id?: number,
    createdAt?: Date
  ) {
    super(duration, uri, title, id, createdAt);
    this.blob = new Blob();
  }
}
