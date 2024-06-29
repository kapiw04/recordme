import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import TimerStore from "../stores/TimerStore";

function Timer() {
  const time = TimerStore.milisecondsElapsed;
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 100);

  const minutesToDisplay = minutes.toString();
  const secondsToDisplay = seconds.toString().padStart(2, "0");
  const millisecondsToDisplay = milliseconds.toString();

  const isInsignificant = (num: string) => num === "0";

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        <Text
          style={
            isInsignificant(minutesToDisplay)
              ? styles.insignificant
              : styles.significant
          }
        >
          {minutesToDisplay}:
        </Text>
        <Text
          style={
            isInsignificant(minutesToDisplay) &&
            isInsignificant(secondsToDisplay.charAt(0))
              ? styles.insignificant
              : styles.significant
          }
        >
          {secondsToDisplay.charAt(0)}
        </Text>
        <Text style={styles.significant}>{secondsToDisplay.charAt(1)}.</Text>
        <Text style={styles.significant}>{millisecondsToDisplay}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  timerText: {
    fontSize: 64,
    fontWeight: "600",
  },
  significant: {
    color: "#333",
  },
  insignificant: {
    color: "#ccc",
  },
});

export default observer(Timer);
