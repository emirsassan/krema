import axios from "axios";
import { getApiKey, getMode } from "../config";
import type { ICheckoutResponse, IProductBody } from "./types";

export const createCheckoutSession = async (body: IProductBody) => {
  const testMode = getMode();

  const response = await axios.post<ICheckoutResponse>(
    testMode
      ? "https://test-api.creem.io/v1/checkouts"
      : "https://api.creem.io/v1/checkouts",
    body,
    {
      headers: {
        "x-api-key": getApiKey(),
      },
    }
  );

  return response.data;
};
