import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ScreenerAnswerOption, ScreenerQuestion } from "./data/types";
import React from "react";

interface QuestionProps {
  currentQuestion: ScreenerQuestion | undefined;
  answerOptions: ScreenerAnswerOption[] | undefined;
  currentAnswer: number | undefined | null;
  handleAnswer: (question_id: string | undefined, value: number) => void;
}

export default function Question({currentQuestion, answerOptions, currentAnswer, handleAnswer}: QuestionProps) {

  function handleChange(_event: React.ChangeEvent<HTMLInputElement>, value: string) {
    handleAnswer(currentQuestion?.question_id, +value)
  }

  return (
    <React.Fragment>
      <Typography variant="h5">{currentQuestion?.title}</Typography>
      <RadioGroup onChange={handleChange}>
        {
        answerOptions?.map((answer: ScreenerAnswerOption, index: number) =>
          <FormControlLabel 
            value={answer.value} 
            key={'answer'+index} 
            control={<Radio />} 
            label={answer.title} 
            checked={answer.value==currentAnswer} />
        )}
      </RadioGroup>
    </React.Fragment>
  );
}
