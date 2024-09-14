import { Step, StepLabel, Stepper } from "@mui/material";
import { ScreenerQuestion } from "./data/types";

interface ProgressProps {
  questions: ScreenerQuestion[] | undefined;
  currentStep: number;
}

export default function Progress({questions, currentStep}: ProgressProps) {
  return (
    <Stepper>
    {
      questions?.map((question: ScreenerQuestion, index: number) =>
      <Step key={question.question_id} completed={index <= currentStep}>
        <StepLabel></StepLabel>
      </Step>
    )}
      <Step key="results" completed={currentStep===questions?.length}>
        <StepLabel>Results</StepLabel>
      </Step>
    </Stepper>
  );
}
