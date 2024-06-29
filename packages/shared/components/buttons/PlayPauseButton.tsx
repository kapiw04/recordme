import React from "react";
import { View, Text, Pressable } from "react-native";
import Recording from "../../models/Recording";
import PlaybackStore from "../../stores/PlaybackStore";
import { observer } from "mobx-react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface PlayPauseButtonProps {
  recording: Recording;
}

function PlayPauseButton(props: PlayPauseButtonProps) {
  if (!props.recording) {
    return (
      <View>
        <Text>Error: No recording data provided</Text>
      </View>
    );
  }

  const loadingIcon = <AntDesign name="loading1" size={24} color="white" />;
  const playIcon = <Ionicons name="play" size={24} color="white" />;
  const pauseIcon = <Ionicons name="pause" size={24} color="white" />;

  let icon: JSX.Element;
  let onPress: () => void = () => {};

  if (!PlaybackStore.currentRecording) {
    if (PlaybackStore.isLoading) {
      icon = loadingIcon;
    } else {
      icon = playIcon;
      onPress = () => {
        PlaybackStore.playRecording(props.recording);
      };
    }
  } else if (PlaybackStore.currentRecording.id === props.recording.id) {
    icon = PlaybackStore.isPaused ? playIcon : pauseIcon;
    onPress = () => {
      PlaybackStore.isPaused
        ? PlaybackStore.playRecording(props.recording)
        : PlaybackStore.pauseRecording();
    };
  } else {
    icon = playIcon;
    onPress = () => {
      PlaybackStore.playRecording(props.recording);
    };
  }

  return <Pressable onPress={onPress}>{icon}</Pressable>;
}

export default observer(PlayPauseButton);
