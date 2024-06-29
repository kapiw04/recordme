import Recording from "./Recording";

class RecordingMobile extends Recording {
  filePath: string;

  constructor(
    duration: number,
    uri: string,
    title: string = "New Recording",
    id?: number,
    createdAt?: Date
  ) {
    super(duration, uri, title, id, createdAt);
    this.filePath = `recordings/${this.id}.m4a`;
  }
}

export default RecordingMobile;
