import React from "react";

const QuizIntroduction = ({ onNext }) => (
  <div>
    <h1>Ed Scout Quiz: Finding Your School Fit</h1>
    <p>
      Trying to figure out what school is right for your family? Choosing a
      school can be overwhelming. Thankfully, we’re here to help. Take our quiz
      to begin your search and find the right school for your child.
    </p>
    <p>
      <strong>Note:</strong> If you have children with different needs or
      preferences and are willing to send your children to different schools,
      please complete the quiz separately for each child.
    </p>
    <button onClick={onNext}>Start Quiz</button>
  </div>
);

export default QuizIntroduction;
