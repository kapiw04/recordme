export default class Recording {
  id?: number;
  title: string;
  createdAt: Date;
  duration: number;
  uri: string;

  constructor(
    duration: number,
    uri: string,
    title: string,
    id?: number,
    createdAt?: Date
  ) {
    this.id = id;
    this.createdAt = createdAt ? createdAt : new Date(Date.now());
    this.title = title == "" ? makeDefaultTitle(this.createdAt) : title;
    this.duration = duration;
    this.uri = uri;
  }
}
export function makeDefaultTitle(createdAt: Date): string {
  let title = `${createdAt.toISOString().replace(/[T:-]/g, "")}`.split(".")[0];

  return "Recording" + title;
}
