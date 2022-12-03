import { TextAnalysisClient, AzureKeyCredential, SentimentAnalysisSuccessResult } from '@azure/ai-language-text';

const getSentiment: Function = async (msg: string): Promise<string> => {
  const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;
  const apiKey = process.env.AZURE_LANGUAGE_API_KEY;

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const results = await client.analyze('SentimentAnalysis', [msg]);
  const result = results[0] as SentimentAnalysisSuccessResult;
  return result.sentiment;
};

export default getSentiment;
