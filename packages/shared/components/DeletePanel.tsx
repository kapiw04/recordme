import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RecordingStore from "../stores/RecordingStore";
import { observer } from "mobx-react";

function DeletePanel() {
  if (RecordingStore.selectedRecordings.length === 0) {
    return null;
  }

  return (
    <View style={styles.deletePanel}>
      <Pressable
        onPress={() => RecordingStore.deleteSelectedRecordings()}
        style={styles.deleteButton}
      >
        <FontAwesome name="trash" size={30} color="white" />
      </Pressable>
      <Pressable
        onPress={() => RecordingStore.exitSelectionMode()}
        style={styles.cancelButton}
      >
        <FontAwesome name="times" size={30} color="white" />
      </Pressable>
    </View>
  );
}

export default observer(DeletePanel);

const styles = StyleSheet.create({
  deletePanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1e1e1e",
    width: "100%",
  },
  deleteButton: {
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
  },
});
