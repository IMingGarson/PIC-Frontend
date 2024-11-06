import React, { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResult from './components/AnalysisResult';
import { ClipLoader } from 'react-spinners';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (patent_id, company_name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patent_id, company_name }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Patent Infringement Checker</h1>
        <AnalysisForm onAnalyze={handleAnalyze} />
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <ClipLoader color="#3B82F6" loading={loading} size={50} />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {analysis && <AnalysisResult analysis={analysis} />}
      </div>
    </div>
  );
}

export default App;
