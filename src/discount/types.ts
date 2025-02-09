interface BaseDiscountBody {
  name: string;
  applies_to_products?: string[];
  code?: string;
  expiry_date?: string;
  max_redemptions?: number;
}

interface BaseFixedDiscount extends BaseDiscountBody {
  type: "fixed";
  currency: string;
  amount: number;
}

interface BasePercentageDiscount extends BaseDiscountBody {
  type: "percentage";
  currency?: string;
  amount?: number;
  percentage: number;
}

interface FixedForeverOrOnceDiscount extends BaseFixedDiscount {
  duration: "forever" | "once";
}

interface FixedRepeatingDiscount extends BaseFixedDiscount {
  duration: "repeating";
  duration_in_months: number;
}

interface PercentageForeverOrOnceDiscount extends BasePercentageDiscount {
  duration: "forever" | "once";
}

interface PercentageRepeatingDiscount extends BasePercentageDiscount {
  duration: "repeating";
  duration_in_months: number;
}

export type IDiscountBody =
  | FixedForeverOrOnceDiscount
  | FixedRepeatingDiscount
  | PercentageForeverOrOnceDiscount
  | PercentageRepeatingDiscount;

  /**
 * Represents the environment mode for the discount
 */
type DiscountMode = 'test' | 'live' | 'sandbox';

/**
 * Represents the status of a discount
 */
type DiscountStatus = 'active' | 'draft' | 'expired' | 'scheduled';

/**
 * Represents the type of discount (percentage or fixed amount)
 */
type DiscountType = 'percentage' | 'fixed';

/**
 * Represents the duration type for the discount
 */
type DiscountDuration = 'forever' | 'once' | 'repeating';

/**
 * Represents a discount response from the API
 */
export interface DiscountResponse {
  /** The amount of the discount (percentage or fixed amount) */
  amount: number;
  
  /** Unique discount code identifier */
  code: string;
  
  /** Unique identifier for the discount object */
  id: string;
  
  /** Environment mode */
  mode: DiscountMode;
  
  /** Name of the discount */
  name: string;
  
  /** Object type identifier */
  object: string;
  
  /** Current status of the discount */
  status: DiscountStatus;
  
  /** Type of discount (percentage or fixed) */
  type: DiscountType;
  
  /** Optional array of product IDs this discount applies to */
  applies_to_products?: string[];
  
  /** Optional duration type for the discount */
  duration?: DiscountDuration;
  
  /** Number of months discount is valid (only for repeating subscriptions) */
  duration_in_months?: number;
  
  /** Optional expiry date */
  expiry_date?: string;
  
  /** Optional maximum number of times discount can be used */
  max_redemptions?: number;
  
  /** Percentage value (only when type is "percentage") */
  percentage?: number;
}