import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RecordButton from "shared/components/buttons/RecordButton";
import Timer from "shared/components/Timer";
import RecordingsList from "shared/components/RecordingsList";
import GiveNameModal from "shared/components/GiveNameModal";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Timer />
      </View>
      <View style={styles.buttonContainer}>
        <RecordButton />
      </View>
      <GiveNameModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 30,
    alignItems: "center",
  },
});
