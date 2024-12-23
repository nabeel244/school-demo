import React from "react";

const JourneySelection = ({ onNext }) => (
  <div>
    <h2>Your Situation</h2>
    <p>What best describes your situation?</p>
    <button onClick={() => onNext("School Only")}>
      I’m not planning to move; I just want to find the best school in my
      current location
    </button>
    <button onClick={() => onNext("School & Suburb")}>
      I need help finding the right school and an area to live
    </button>
  </div>
);

export default JourneySelection;
