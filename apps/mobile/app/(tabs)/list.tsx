import React from "react";
import RecordingsList from "shared/components/RecordingsList";
import DeletePanel from "shared/components/DeletePanel";

export default function TabTwoScreen() {
  return (
    <>
      <RecordingsList />
      <DeletePanel />
    </>
  );
}
