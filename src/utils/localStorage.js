export const saveReport = (report) => {
    const savedReports = JSON.parse(localStorage.getItem('savedReports')) || [];
    savedReports.push({
        report: report,
        ttl: new Date().getTime() + (1000 * 86400 * 48) // Each record is set to 48 hours locally
    });
    localStorage.setItem('savedReports', JSON.stringify(savedReports));
  };
  
  export const getSavedReports = () => {
    const reports = localStorage.getItem('savedReports') || false;
    if (!reports) {
        return [];
    }
    const items = JSON.parse(reports);
	const now = new Date();
    const valid_report = [];
    for (const i in items) {
        if (now.getTime() < items[i].ttl) {
            valid_report.push({
                report: items[i].report,
                ttl: items[i].ttl
            });
        }
    }
    localStorage.setItem('savedReports', JSON.stringify(valid_report));
    return valid_report;
  };
  