import { View, StyleSheet } from "react-native";
import RecordingsList from "shared/components/RecordingsList";
import React from "react";
import RecordButton from "shared/components/buttons/RecordButton";
import Timer from "shared/components/Timer";
import GiveNameModal from "shared/components/GiveNameModal";
import DeletePanel from "shared/components/DeletePanel";

export default function App() {
  return (
    <View style={styles.main}>
      <View style={styles.recordingsList}>
        <RecordingsList />
        <DeletePanel />
      </View>
      <View style={styles.recordingContainer}>
        <View style={styles.content}>
          <Timer />
        </View>
        <View style={styles.buttonContainer}>
          <RecordButton />
        </View>
        <GiveNameModal />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "black",
    width: "100%",
  },
  recordingContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  recordingsList: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: "silver",
  },
});
