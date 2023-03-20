// Define the tax rates and thresholds
const taxRates = [
    { threshold: 0, rate: 0 },
    { threshold: 24000, rate: 0.1 },
    { threshold: 40400, rate: 0.15 },
    { threshold: 57700, rate: 0.2 },
    { threshold: 93200, rate: 0.25 },
    { threshold: 151000, rate: 0.3 },
    { threshold: 307000, rate: 0.32 },
    { threshold: Infinity, rate: 0.35 },
  ];
  
  const NHIFRates = [
    { threshold: 0, rate: 150 },
    { threshold: 6000, rate: 300 },
    { threshold: 12000, rate: 400 },
    { threshold: 18000, rate: 500 },
    { threshold: 25000, rate: 600 },
    { threshold: 35000, rate: 750 },
    { threshold: 45000, rate: 850 },
    { threshold: 60000, rate: 900 },
    { threshold: 75000, rate: 950 },
    { threshold: 90000, rate: 1000 },
    { threshold: 1000000, rate: 1100 },
  ];
  
  const NSSFPercentage = 0.06;
  
  // Get user inputs
  const basicSalary = prompt("Enter your basic salary:");
  const benefits = prompt("Enter your benefits:");
  
  // Calculate the gross salary
  const grossSalary = parseFloat(basicSalary) + parseFloat(benefits);
  
  // Calculate the taxable income
  const taxableIncome = grossSalary - 24000;
  
  // Calculate the PAYE (i.e. tax)
  let tax = 0;
  for (let i = 1; i < taxRates.length; i++) {
    const prevThreshold = taxRates[i - 1].threshold;
    const threshold = taxRates[i].threshold;
    const rate = taxRates[i].rate;
    const taxableAmount = Math.min(taxableIncome - prevThreshold, threshold - prevThreshold);
    if (taxableAmount > 0) {
      tax += taxableAmount * rate;
    } else {
      break;
    }
  }
  
  // Calculate the NHIF Deductions
  let NHIFDeductions = 0;
  for (let i = 1; i < NHIFRates.length; i++) {
    const prevThreshold = NHIFRates[i - 1].threshold;
    const threshold = NHIFRates[i].threshold;
    const rate = NHIFRates[i].rate;
    const taxableAmount = Math.min(grossSalary - prevThreshold, threshold - prevThreshold);
    if (taxableAmount > 0) {
      NHIFDeductions += rate;
    } else {
      break;
    }
  }
  
  // Calculate the NSSF Deductions
  const NSSFContribution = Math.min(grossSalary * NSSFPercentage, 1800);
  const NSSFDeductions = NSSFContribution;
  
  // Calculate the net salary
  const netSalary = grossSalary - tax - NHIFDeductions - NSSFDeductions;
  
  // Display the results
  console.log(`Gross Salary: ${grossSalary}`);
  console.log(`PAYE (Tax): ${tax}`);
  console.log(`NHIF Deductions: ${NHIFDeductions}`);
  console.log(`NSSF Deductions: ${NSSFDeductions}`);
  console.log(`Net Salary: ${netSalary}`);
  