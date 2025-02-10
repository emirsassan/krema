// Common instance type used across responses
export interface LicenseInstance {
  id: string;
  mode: 'test' | 'live' | 'sandbox';
  object: 'license-instance';
  name: string;
  status: 'active' | 'deactivated';
  created_at: string;
}

// Base license response that's common across all endpoints
export interface LicenseResponse {
  id: string;
  mode: 'test' | 'live' | 'sandbox';
  object: string;
  status: 'inactive' | 'active' | 'expired' | 'disabled';
  key: string;
  activation: number;
  activation_limit: number | null;
  expires_at: string | null;
  created_at: string;
  instance: LicenseInstance[] | null;
}

// Response types - they all use the same structure
export type ActivateLicenseResponse = LicenseResponse;
export type ValidateLicenseResponse = LicenseResponse;
export type DeactivateLicenseResponse = LicenseResponse;
