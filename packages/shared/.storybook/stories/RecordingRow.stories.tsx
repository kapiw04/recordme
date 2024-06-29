import React from "react";
import RecordingRow from "../../components/RecordingRow";
import Recording from "../../models/Recording";

export default {
  title: "RecordingRow",
  component: RecordingRow,
};

export const RecordingRowStory = () => (
  <RecordingRow
    recording={new Recording(3000, "https://example.com/recording.mp3")}
  />
);
