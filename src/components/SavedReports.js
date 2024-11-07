import React from 'react';
import AnalysisResult from './AnalysisResult';

function SavedReports({ reports }) {
  if (reports.length === 0) {
    return <></>
  }
  const display_report = [...reports].reverse();
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Saved Reports</h2>
      { display_report.map((analysis, idx) => {
        return <AnalysisResult key={idx} analysis={analysis} />
      })}
    </div>
  );
}

export default SavedReports;
