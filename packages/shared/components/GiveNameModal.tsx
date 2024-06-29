import React from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { observer } from "mobx-react";
import RecordingStore from "../stores/RecordingStore";
import { makeDefaultTitle } from "../models/Recording";

function GiveNameModal() {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={RecordingStore.isModalVisible}
      onRequestClose={() => {
        RecordingStore.setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Give your recording a name</Text>
          <TextInput
            style={styles.input}
            placeholder={makeDefaultTitle(new Date(Date.now()))}
            placeholderTextColor={"gray"}
            onChangeText={(text) => RecordingStore.setRecordingName(text)}
            value={RecordingStore.recordingName}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              RecordingStore.saveRecording();
            }}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#060606",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: "silver",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    minWidth: 250,
    color: "gray",
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
  },
});

export default observer(GiveNameModal);
