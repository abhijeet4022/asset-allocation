// Define the age-based allocation percentages
export const ageBasedAllocation: { 
  [key: string]: { [key: string]: number } 
} = {
  '25-30': {
    'Gold': 20,
    'Nifty 50': 30,
    'Flexi Cap': 25,
    'Mid Cap': 25,
    'Debt/Hybrid': 0
  },
  '30-35': {
    'Gold': 20,
    'Nifty 50': 35,
    'Flexi Cap': 25,
    'Mid Cap': 20,
    'Debt/Hybrid': 0
  },
  '35-40': {
    'Gold': 25,
    'Nifty 50': 40,
    'Flexi Cap': 25,
    'Mid Cap': 10,
    'Debt/Hybrid': 0
  },
  '40-45': {
    'Gold': 30,
    'Nifty 50': 45,
    'Flexi Cap': 20,
    'Mid Cap': 5,
    'Debt/Hybrid': 0
  },
  '45-50': {
    'Gold': 30,
    'Nifty 50': 45,
    'Flexi Cap': 15,
    'Mid Cap': 0,
    'Debt/Hybrid': 10
  },
  '50-55': {
    'Gold': 35,
    'Nifty 50': 40,
    'Flexi Cap': 10,
    'Mid Cap': 0,
    'Debt/Hybrid': 15
  },
  '55-60': {
    'Gold': 40,
    'Nifty 50': 35,
    'Flexi Cap': 5,
    'Mid Cap': 0,
    'Debt/Hybrid': 20
  }
};