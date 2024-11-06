import React from 'react';
import ReactMarkdown from 'react-markdown';

function AnalysisResult({ analysis }) {
  const {
    analysis_date,
    company_name,
    patent_id,
    overall_risk_assessment,
    top_infringing_products,
  } = analysis;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">Analysis Date:</span> {analysis_date}</p>
        <p><span className="font-semibold">Company Name:</span> {company_name}</p>
        <p><span className="font-semibold">Patent ID:</span> {patent_id}</p>
        <div>
          <span className="font-semibold">Overall Risk Assessment:</span>
          <ReactMarkdown className="prose prose-blue">
            {overall_risk_assessment}
          </ReactMarkdown>
        </div>
        {top_infringing_products.map((product, index) => (
          <div key={index} className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-medium mb-2">Top Infringing Product {index + 1}</h3>
            <p><span className="font-semibold">Product Name:</span> {product.product_name}</p>
            <p><span className="font-semibold">Infringement Likelihood:</span> {product.infringement_likelihood}</p>
            <p><span className="font-semibold">Specific Features:</span> {product.specific_features}</p>
            <div className="mt-2">
              <span className="font-semibold">Explanation:</span>
              <ReactMarkdown className="prose prose-blue">
                {product.explanation}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalysisResult;
