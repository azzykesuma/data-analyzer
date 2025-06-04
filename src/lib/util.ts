import type { IDataArr } from "../types";

export interface NikData {
  originalNik: string;
  areaCode: string;
  dobRaw: string;
  queueNumber: string;
  parsedDob: Date | null;
  sex: 'Male' | 'Female' | 'Unknown';
  age: number | null;
  provinceCode: string;
  provinceName: string;
  cityRegencyCode: string;
}


export const provinceMapping: { [key: string]: string } = {
  '31': 'DKI Jakarta',
  '32': 'Jawa Barat',
  '33': 'Jawa Tengah',
  '34': 'DI Yogyakarta',
  '35': 'Jawa Timur',
  '36': 'Banten',
  '11': 'Aceh',
  '12': 'Sumatera Utara',
  '13': 'Sumatera Barat',
  '14': 'Riau',
  '15': 'Jambi',
  '16': 'Sumatera Selatan',
  '17': 'Bengkulu',
  '18': 'Lampung',
  '19': 'Kepulauan Bangka Belitung',
  '21': 'Kepulauan Riau',
  '51': 'Bali',
  '52': 'Nusa Tenggara Barat',
  '53': 'Nusa Tenggara Timur',
  '61': 'Kalimantan Barat',
  '62': 'Kalimantan Tengah',
  '63': 'Kalimantan Selatan',
  '64': 'Kalimantan Timur',
  '65': 'Kalimantan Utara',
  '71': 'Sulawesi Utara',
  '72': 'Sulawesi Tengah',
  '73': 'Sulawesi Selatan',
  '74': 'Sulawesi Tenggara',
  '75': 'Gorontalo',
  '76': 'Sulawesi Barat',
  '81': 'Maluku',
  '82': 'Maluku Utara',
  '91': 'Papua Barat',
  '94': 'Papua',
};

export function parseNik(nik: string, currentYear: number): NikData {
  if (nik.length < 12) {
    return {
      originalNik: nik,
      areaCode: '',
      dobRaw: '',
      queueNumber: '',
      parsedDob: null,
      sex: 'Unknown',
      age: null,
      provinceCode: '',
      provinceName: 'Unknown',
      cityRegencyCode: '',
    };
  }

  const areaCode = nik.substring(0, 6);
  const dobRaw = nik.substring(6, 12);
  const queueNumber = nik.substring(12);

  let day = parseInt(dobRaw.substring(0, 2), 10);
  const month = parseInt(dobRaw.substring(2, 4), 10);
  let year = parseInt(dobRaw.substring(4, 6), 10);

  let sex: 'Male' | 'Female' | 'Unknown' = 'Unknown';
  if (day > 40) {
    sex = 'Female';
    day -= 40;
  } else {
    sex = 'Male';
  }

  year = (year <= (currentYear % 100)) ? 2000 + year : 1900 + year;

  const parsedDob = new Date(year, month - 1, day);

  let age: number | null = null;
  const today = new Date();
  if (!isNaN(parsedDob.getTime())) { // Check if DOB is a valid date
    let ageDiff = today.getFullYear() - parsedDob.getFullYear();
    const monthDiff = today.getMonth() - parsedDob.getMonth();
    const dayDiff = today.getDate() - parsedDob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      ageDiff--;
    }
    age = ageDiff;
  }

  const provinceCode = areaCode.substring(0, 2);
  const cityRegencyCode = areaCode.substring(2, 4);
  const provinceName = provinceMapping[provinceCode] || 'Unknown Province';

  return {
    originalNik: nik,
    areaCode,
    dobRaw,
    queueNumber,
    parsedDob: isNaN(parsedDob.getTime()) ? null : parsedDob, // Ensure null for invalid dates
    sex,
    age,
    provinceCode,
    provinceName,
    cityRegencyCode,
  };
}

export function analyzeNiks(niks: string[]) {
  const currentYear = new Date().getFullYear();
  const parsedData: NikData[] = [];
  const ageCounts: { [age: number]: number } = {};
  const genderCounts: { male: number; female: number; unknown: number } = { male: 0, female: 0, unknown: 0 };
  const provinceCounts: { [key: string]: number } = {};

  niks.forEach(nik => {
    const data = parseNik(nik, currentYear);
    parsedData.push(data);

    // Count ages
    if (data.age !== null) {
      ageCounts[data.age] = (ageCounts[data.age] || 0) + 1;
    }

    // Count genders
    if (data.sex === 'Male') {
      genderCounts.male++;
    } else if (data.sex === 'Female') {
      genderCounts.female++;
    } else {
      genderCounts.unknown++;
    }

    // Count province occurrences
    provinceCounts[data.provinceName] = (provinceCounts[data.provinceName] || 0) + 1;
  });

  return {
    ageCounts,
    genderCounts,
    provinceCounts,
  };
}


export function analyzeOrderData(orders: IDataArr[]) {
  const paymentTypeCounts: { [type: string]: number } = {};
  const ticketPopularity: { [ticketName: string]: number } = {};
  let totalSubAmount = 0;
  let totalPaymentFee = 0;
  let totalPlatformFee = 0;
  let totalTaxAmount = 0;
  let totalOverallAmount = 0;
  let orderCount = 0;

  orders.forEach(order => {
    paymentTypeCounts[order.payment_type] = (paymentTypeCounts[order.payment_type] || 0) + 1;

    ticketPopularity[order.ticket_name] = (ticketPopularity[order.ticket_name] || 0) + order.quantity;

    totalSubAmount += order.sub_total_amount;
    totalPaymentFee += order.payment_fee;
    totalPlatformFee += order.platform_fee;
    totalTaxAmount += order.tax_amount;
    totalOverallAmount += order.total_amount;
    orderCount++;
  });

  const averageOrderValue = orderCount > 0 ? totalOverallAmount / orderCount : 0;

  return {
    paymentTypeCounts,
    ticketPopularity,
    financialSummary: {
      totalSubAmount,
      totalPaymentFee,
      totalPlatformFee,
      totalTaxAmount,
      totalOverallAmount,
      averageOrderValue,
    },
  };
}
