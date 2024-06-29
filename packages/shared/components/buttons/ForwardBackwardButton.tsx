import React from "react";
import { Button } from "react-native";

interface ForwardBackwardButtonProps {
  forward: boolean;
}
const ForwardBackwardButton = (props: ForwardBackwardButtonProps) => {
  return (
    <Button
      title={props.forward ? "->" : "<-"}
      onPress={() => {
        console.log(
          `The button is now seeking ${props.forward ? "forward" : "backward"}`
        );
      }}
    />
  );
};

export default ForwardBackwardButton;
