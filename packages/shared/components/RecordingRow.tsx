import React from "react";
import { Text, StyleSheet, Pressable, Platform } from "react-native";
import Recording from "../models/Recording";
import PlayPauseButton from "./buttons/PlayPauseButton";
import PlaybackStore from "../stores/PlaybackStore";
import { observer } from "mobx-react";
import RecordingStore from "../stores/RecordingStore";
import SelectionButton from "./buttons/SelectionButton";

interface RecordingRowProps {
  recording: Recording;
}

const formatDuration = (millisecondsLeft: number) => {
  const totalSeconds = Math.floor(millisecondsLeft / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  const centiseconds = Math.floor((millisecondsLeft % 1000) / 100);
  if (minutes <= 0 && remainingSeconds <= 0) {
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}.${centiseconds}`;
  }
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

function RecordingRow({ recording }: RecordingRowProps) {
  const isCurrent = PlaybackStore.currentRecording?.id === recording.id;
  const durationLeft = isCurrent
    ? PlaybackStore.durationLeft
    : recording.duration;
  const formattedDuration = formatDuration(durationLeft);
  const selected = RecordingStore.selectedRecordings.includes(recording);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (RecordingStore.selectedRecordings.length > 0) {
          RecordingStore.selectRecording(recording);
        }
      }}
      onLongPress={
        Platform.OS !== "web"
          ? () => RecordingStore.enterSelectionMode(recording)
          : () => {}
      }
    >
      <SelectionButton recording={recording} selected={selected} />
      <Text style={styles.title} numberOfLines={1}>
        {recording.title}
      </Text>
      <Text style={styles.duration}>{formattedDuration}</Text>
      <PlayPauseButton recording={recording} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    backgroundColor: "#1e1e1e",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 8,
    overflow: "hidden",
    flexShrink: 1,
    maxWidth: "80%",
  },
  duration: {
    color: "#cccccc",
    fontSize: 14,
    flex: 2,
    padding: 5,
  },
});

export default observer(RecordingRow);
