import axios from "axios";
import { Screener } from "./types";

const BASE_URL = 'https://thawing-savannah-66031-0c3d29d73cd6.herokuapp.com/';

export async function fetchScreener(): Promise<Screener> {
    const response = await axios.get(BASE_URL + 'screeners');
    const data = await response.data;
    return data;
}

export async function fetchScreenerResults(answers: Map<string, number>): Promise<[string, string]> {
  const requestBody = { answers: Array.from(answers.keys()).map((key) => {
    return {
      question_id: key, 
      value: answers.get(key)
    }
  })};
  const response = await axios.post(BASE_URL + 'screeners', requestBody);
  const data = await response.data;
  return data.results;
}
