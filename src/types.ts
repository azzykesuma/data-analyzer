export interface IDataArr {
  order_number: string;
  id_type: string;
  id_number: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  ticket_code: string;
  ticket_name: string;
  quantity: number;
  gateway_trx_id: string;
  payment_type: string;
  sub_total_amount: number;
  payment_fee: number;
  platform_fee: number;
  tax_amount: number;
  total_amount: number;
  source_name: string;
  paid_date: string;
}

export interface INikAnalysisResult {
  ageCounts: {
    [age: number]: number;
  };
  genderCounts: {
    male: number;
    female: number;
    unknown: number;
  };
  provinceCounts: {
    [key: string]: number;
  };
}

export interface CombinedAnalysisResult {
  nikAnalysis: {
    ageCounts: { [age: number]: number };
    genderCounts: { male: number; female: number; unknown: number };
    provinceCounts: { [key: string]: number };
  };
  orderAnalysis: {
    paymentTypeCounts: { [type: string]: number };
    ticketPopularity: { [ticketName: string]: number };
    purchaserTicketCounts: { [purchaserName: string]: number };
    sourcePurchaseTickers: { [source: string]: number };
    financialSummary: {
      totalSubAmount: number;
      totalPaymentFee: number;
      totalPlatformFee: number;
      totalTaxAmount: number;
      totalOverallAmount: number;
      averageOrderValue: number;
    };
  };
}