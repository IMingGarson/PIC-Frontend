import React from 'react';
import ReactMarkdown from 'react-markdown';

function AnalysisResult({ analysis, onSave = null }) {
  const {
    analysis_date,
    company_name,
    patent_id,
    overall_risk_assessment,
    top_infringing_products,
  } = analysis;

  const display_likelihood = (likelihood) => {
    if (likelihood === "High") {
      return (
        <span className="bg-red-300 text-red-900 text-xs font-bold me-2 px-1.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          { likelihood }
        </span>
      )
    } else if (likelihood === "Moderate") {
      return (
        <span className="bg-yellow-300 text-yellow-900 text-xs font-bold me-2 px-1.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          { likelihood }
        </span>
      )
    }
    return (
      <span className="bg-blue-300 text-blue-900 text-xs font-bold me-2 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        { likelihood }
      </span>
    )
  }

  return (
    <div className="mt-6">
      <p className="text-xl font-bold mb-4">Analysis Result</p>
      <div className="space-y-2">
        <p><span className="font-bold pr-1">Analysis Date:</span> {analysis_date}</p>
        <p><span className="font-bold pr-1">Company Name:</span> {company_name}</p>
        <p><span className="font-bold pr-1">Patent ID:</span> {patent_id}</p>
        <div>
          <span className="font-bold">Overall Risk Assessment:</span>
          <ReactMarkdown className="text-sm prose prose-blue">
            {overall_risk_assessment}
          </ReactMarkdown>
        </div>
        <p className="text-xl font-bold mb-4">Top Two Products</p>
        {top_infringing_products.map((product, index) => (
          <div key={index} className="mt-4 p-3 bg-gray-50 shadow-md rounded">
            <h3 className="text-lg font-black font-medium mb-2">{ product.product_name }</h3>
            <div>
              <span className="text-base font-semibold pr-1">Specific Features:</span> 
              <p className="text-sm">{product.specific_features}</p>
            </div>
            <div>
              <span className="text-base font-semibold">Explanation:</span>
              <ReactMarkdown className="text-sm prose prose-blue">
                {product.explanation}
              </ReactMarkdown>
            </div>
            <div>
              <span className="text-base font-semibold pr-1">Infringement Likelihood:</span>
              { display_likelihood(product.infringement_likelihood) }
            </div>
          </div>
        ))}
        { onSave && (
          <button
            onClick={() => onSave(analysis)}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
          >
            Save Report
          </button>
        )}
      </div>
    </div>
  );
}

export default AnalysisResult;
