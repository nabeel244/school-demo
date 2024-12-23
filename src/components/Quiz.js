import React, { useState } from "react";
import QuizIntroduction from "./QuizIntroduction";
import JourneySelection from "./JourneySelection";
import MapInteraction from "./MapInteraction";
import QuizQuestions from "./QuizQuestions";

const Quiz = () => {
  const [step, setStep] = useState(0); // Track the quiz step
  const [journey, setJourney] = useState(null); // Selected journey
  const [quizData, setQuizData] = useState({}); // User's answers

  const nextStep = (data = {}) => {
    // Merge quiz data and move to the next step
    setQuizData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));

  const handleJourneySelection = (selectedJourney) => {
    setJourney(selectedJourney);
    nextStep();
  };

  return (
    <div>
      {step === 0 && <QuizIntroduction onNext={nextStep} />}
      {step === 1 && <JourneySelection onNext={handleJourneySelection} />}
      {step === 2 && <MapInteraction journey={journey} onNext={nextStep} />}
      {step >= 3 && (
        <QuizQuestions
          journey={journey}
          step={step - 3}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
    </div>
  );
};

export default Quiz;
