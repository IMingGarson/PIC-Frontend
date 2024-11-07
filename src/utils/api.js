export const analyzePatent = async (patent_id, company_name) => {
  return await fetch('http://54.205.200.84:5000/analyze', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ patent_id, company_name }),
  });
};
