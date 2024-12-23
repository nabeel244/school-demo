import React from "react";

const QuizQuestions = ({ journey, step, onNext, onPrev }) => {
  const questions =
    journey === "School Only"
      ? [
          {
            question: "What type of school are you looking for?",
            options: ["Primary", "Secondary", "Special"],
            key: "schoolType",
          },
          {
            question: "What is your preference for school size?",
            options: ["Small", "Medium", "Large"],
            key: "schoolSize",
          },
        ]
      : [
          {
            question: "How many bedrooms do you need?",
            options: ["Any", "1", "2", "3", "4", "5+"],
            key: "bedrooms",
          },
          {
            question: "Are you planning to buy or rent?",
            options: ["Buy", "Rent", "Rent first, then buy"],
            key: "housingIntent",
          },
        ];

  // Validate step
  if (step >= questions.length || step < 0) {
    return <p>Invalid step. Please restart the quiz.</p>;
  }

  const currentQuestion = questions[step];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option) => (
        <button
          key={option}
          onClick={() => onNext({ [currentQuestion.key]: option })}
        >
          {option}
        </button>
      ))}
      <div style={{ marginTop: "20px" }}>
        {step > 0 && <button onClick={onPrev}>Previous</button>}
      </div>
    </div>
  );
};

export default QuizQuestions;
