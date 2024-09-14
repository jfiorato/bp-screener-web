import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useScreenerStore } from './data/store';
import Progress from './Progress';
import React from 'react';
import Question from './Question';
import Results from './Results';

export default function App() {
  const loadScreener = useScreenerStore((state) => state.loadScreener);
  const screener = useScreenerStore((state) => state.screener);
  const screenerLoading = useScreenerStore((state) => state.screenerLoading);
  const currentQuestionIdx = useScreenerStore((state) => state.currentQuestionIdx);
  const updateUserAnswers = useScreenerStore((state) => state.updateUserAnswers);
  const incrementQuestionIndex = useScreenerStore((state) => state.incrementQuestionIndex);
  const userAnswers = useScreenerStore((state) => state.userAnswers);

  useEffect(() => {
    loadScreener();
  }, [loadScreener]);

  function handleAnswer(question_id: string | undefined, value: number) {
    updateUserAnswers(question_id!, value);
  }

  function handleNext() {
    if(screener?.content.sections[0].questions && currentQuestionIdx < screener?.content.sections[0].questions.length) {
      incrementQuestionIndex(1);
    }
  }

  function handleBack() {
    if(currentQuestionIdx > 0) {
      incrementQuestionIndex(-1);
    }
  }

  function getCurrentAnswer() {
    if (screener?.content.sections[0].questions[currentQuestionIdx]) {
      return userAnswers.get(screener?.content.sections[0].questions[currentQuestionIdx].question_id)
    }
    return null;
  }
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          { screenerLoading ? "[Loading...]" : screener?.full_name }
        </Typography>
        { !screenerLoading && 
          <React.Fragment>
            <Box sx={{ my: 4 }}>
              <Progress 
                questions={screener?.content.sections[0].questions} 
                currentStep={currentQuestionIdx} />
            </Box>
            { (currentQuestionIdx!==screener?.content.sections[0].questions?.length) ? (
              <React.Fragment>
                <Box sx={{ my: 4 }}>
                  <Question 
                    currentQuestion={screener?.content.sections[0].questions[currentQuestionIdx]}
                    answerOptions={screener?.content.sections[0].answers}
                    currentAnswer={getCurrentAnswer()}
                    handleAnswer={handleAnswer} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  { currentQuestionIdx > 0 && <Button variant="outlined" onClick={handleBack}>Back</Button> }
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button variant="contained" onClick={handleNext} disabled={getCurrentAnswer()===undefined}>Next</Button>
                </Box>
              </React.Fragment>
            ) : (
              <Results userAnswers={userAnswers} />
            )}
          </React.Fragment>
        }
      </Box>
    </Container>
  );
}
