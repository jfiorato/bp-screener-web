import { useEffect } from "react";
import { useScreenerStore } from "./data/store";
import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface ResultsProps {
  userAnswers: Map<string, number>;
}

export default function Results({userAnswers}: ResultsProps) {
  const getResults = useScreenerStore((state) => state.getResults);
  const results = useScreenerStore((state) => state.results);
  const resultsLoading = useScreenerStore((state) => state.resultsLoading);

  useEffect(() => {
    getResults(userAnswers);
  }, [getResults, userAnswers]);

  return (
    <React.Fragment>
    { resultsLoading ? (
      <Typography variant="h5">Loading</Typography>
    ) : (
      <React.Fragment>
        <Typography variant="h5">The results are:</Typography>
        <List>
        { results.map((result: string) => 
          <ListItem key={'list-item'+result}>
            <ListItemText
              primary={result}
            />
          </ListItem>,
        )}
        </List>
      </React.Fragment>
    )}
    </React.Fragment>
  );
}
