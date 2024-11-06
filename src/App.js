import React, { useState, useEffect } from 'react';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResult from './components/AnalysisResult';
import { ClipLoader } from 'react-spinners';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState("Analyzing");
  const [dots, setDots] = useState("");

  useEffect(() => {
    let timer, dotsTimer;
    if (loading) {
      timer = setInterval(() => {
        setCaption((prevCaption) => {
          if (prevCaption === "Analyzing") return "Almost there";
          if (prevCaption === "Almost there") return "Returning data";
          return "Analyzing";
        });
      }, 15000);
      dotsTimer = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
      }, 1500);
    } else {
      clearInterval(timer);
      clearInterval(dotsTimer);
    }

    return () => clearInterval(timer);
  }, [loading]);

  const handleAnalyze = async (patent_id, company_name) => {
    setLoading(true);
    setError(null);
    setCaption("Analyzing");
    setDots("");
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
        <h1 className="text-3xl font-bold mb-4 text-center">Patent Infringement Checker</h1>
        <AnalysisForm onAnalyze={handleAnalyze} />
        {loading && (
          <div className="flex flex-col justify-center items-center mt-4">
            <ClipLoader className="flex" color="#3B82F6" loading={loading} size={50} />
            <p className="flex mt-2 text-blue-500">{`${caption} ${dots}`}</p>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {analysis && <AnalysisResult analysis={analysis} />}
      </div>
    </div>
  );
}

export default App;
