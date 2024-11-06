import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzePatent = async (patent_id, company_name) => {
  const response = await apiClient.post('/analyze', { patent_id, company_name });
  return response.data;
};
