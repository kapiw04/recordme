import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import RecordingStore from "../stores/RecordingStore";
import RecordingRow from "./RecordingRow";

function RecordingsList() {
  const recordingsLength = RecordingStore.recordings.length;

  if (RecordingStore.loadingRecordings) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (recordingsLength === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.heading}>No recordings yet</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recordings</Text>
      {recordingsLength > 0 && (
        <Text style={styles.subheading}>
          {recordingsLength} recording{recordingsLength > 1 ? "s" : ""}
        </Text>
      )}
      <FlatList
        data={RecordingStore.recordings}
        renderItem={({ item }) => <RecordingRow recording={item} />}
        keyExtractor={(item) =>
          item.id?.toString() || item.createdAt.toString()
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: "#cccccc",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loadingText: {
    fontSize: 20,
    color: "#ffffff",
  },
  itemText: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 5,
  },
});

export default observer(RecordingsList);
