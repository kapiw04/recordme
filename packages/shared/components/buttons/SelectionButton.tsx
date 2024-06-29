import Recording from "../../models/Recording";
import { observer } from "mobx-react";
import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import RecordingStore from "../../stores/RecordingStore";
import { FontAwesome } from "@expo/vector-icons";

function SelectionButton({
  recording,
  selected,
}: {
  recording: Recording;
  selected: boolean;
}) {
  if (!RecordingStore.inSelectionMode && Platform.OS !== "web") {
    return (
      <Pressable onPress={() => {}} style={styles.selectionButton}>
        <FontAwesome name="circle" size={30} style={styles.invisibleIcon} />
      </Pressable>
    );
  }

  RecordingStore.enterSelectionMode(null);
  return (
    <Pressable
      onPress={() => {
        RecordingStore.selectRecording(recording);
      }}
      style={styles.selectionButton}
    >
      {selected ? (
        <FontAwesome name="circle" size={30} color="white" />
      ) : (
        <FontAwesome name="circle-thin" size={30} color="gray" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  selectionButton: {
    flex: 2,
  },
  invisibleIcon: {
    color: "transparent",
  },
});
export default observer(SelectionButton);
