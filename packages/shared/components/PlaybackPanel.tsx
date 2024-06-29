import React from "react";
import PlayPauseButton from "./buttons/PlayPauseButton";
import ForwardBackwardButton from "./buttons/ForwardBackwardButton";
import Recording from "../models/Recording";

interface PlaybackPanelProps {
  recording: Recording;
}

export default function PlaybackPanel({ recording }: PlaybackPanelProps) {
  return (
    <>
      <ForwardBackwardButton forward={true} />
      <PlayPauseButton recording={recording} />
      <ForwardBackwardButton forward={false} />
    </>
  );
}
