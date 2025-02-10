import axios from "axios";
import { getApiKey, getMode } from "../config";
import type {
  ActivateLicenseResponse,
  ValidateLicenseResponse,
  DeactivateLicenseResponse
} from './types';

export async function activateLicense(
  licenseKey: string,
  instanceName: string
): Promise<ActivateLicenseResponse> {
  const testMode = getMode();

  const response = await axios.post(
    testMode
      ? "https://test-api.creem.io/v1/products/search"
      : "https://api.creem.io/v1/products/search",
      {
        key: licenseKey,
        instance_name: instanceName
      },
      {
        headers: {
          "x-api-key": getApiKey()
        }
      }
  );

  return response.data;
}

export async function validateLicense(
  licenseKey: string,
  instanceId: string
): Promise<ValidateLicenseResponse> {
  const testMode = getMode();

  const response = await axios.post(
    testMode
      ? "https://test-api.creem.io/v1/licenses/validate"
      : "https://api.creem.io/v1/licenses/validate",
    {
      key: licenseKey,
      instance_id: instanceId
    },
    {
      headers: {
        "x-api-key": getApiKey()
      }
    }
  );

  return response.data;
}

export async function deactivateLicense(
  licenseKey: string,
  instanceId: string
): Promise<DeactivateLicenseResponse> {
  const testMode = getMode();

  const response = await axios.post(
    testMode
      ? "https://test-api.creem.io/v1/licenses/deactivate"
      : "https://api.creem.io/v1/licenses/deactivate",
    {
      key: licenseKey,
      instance_id: instanceId
    },
    {
      headers: {
        "x-api-key": getApiKey()
      }
    }
  );

  return response.data;
}
