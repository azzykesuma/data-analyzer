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
