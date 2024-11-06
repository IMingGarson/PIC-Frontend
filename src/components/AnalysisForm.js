import React, { useState } from 'react';

function AnalysisForm({ onAnalyze }) {
  const [patentId, setPatentId] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(patentId, companyName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Patent ID:</label>
        <input
          type="text"
          value={patentId}
          onChange={(e) => setPatentId(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
      >
        Analyze
      </button>
    </form>
  );
}

export default AnalysisForm;
