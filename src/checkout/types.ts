export interface IProductBody {
  product_id: string;
  discount_code?: string;
  request_id?: string;
}

export interface ICustomField {
  type: string;
  key: string;
  label: string;
  optional?: boolean;
  text?: {
    max_length: number;
    min_length: number;
  };
}

export interface IOrder {
  id: string;
  mode: 'test' | 'live';
  object: string;
  customer: Record<string, any>;
  product: Record<string, any>;
  amount: number;
  currency: string;
  fx_amount: number;
  fx_currency: string;
  fx_rate: number;
  status: string;
  type: 'subscription' | string;
  affiliate: string;
  created_at: string;
  updated_at: string;
}

export interface ICheckoutResponse {
  id: string;
  mode: 'test' | 'live';
  object: string;
  status: string;
  request_id: string;
  product: Record<string, any>;
  units: number;
  order: IOrder;
  subscription: Record<string, any>;
  customer: Record<string, any>;
  custom_fields: ICustomField[];
  checkout_url: string;
  success_url: string;
  metadata: Record<string, any>[];
}

