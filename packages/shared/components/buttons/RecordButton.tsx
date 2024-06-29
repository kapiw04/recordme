import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import RecordingStore from "../../stores/RecordingStore";
import Ionicons from "@expo/vector-icons/Ionicons";

function RecordButton() {
  const handlePress = () => {
    RecordingStore.toggleRecording();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.button,
          RecordingStore.isRecording
            ? styles.buttonRecordingOn
            : styles.buttonRecordingOff,
        ]}
      >
        {RecordingStore.isRecording ? (
          <Ionicons name="stop" size={30} color="white" />
        ) : (
          <Ionicons name="mic" size={30} color="white" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonRecordingOn: {
    backgroundColor: "#dc3545",
  },
  buttonRecordingOff: {
    backgroundColor: "#ff6347",
  },

  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default observer(RecordButton);
