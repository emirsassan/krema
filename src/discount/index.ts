import axios from "axios";
import { getApiKey, getMode } from "../config";
import { type DiscountResponse, type IDiscountBody } from "./types"

export const createDiscountCode = async (body: IDiscountBody) => {
  const testMode = getMode();

  const response = await axios.post<DiscountResponse>(
    testMode
      ? "https://test-api.creem.io/v1/discounts"
      : "https://api.creem.io/v1/discounts",
    body,
    {
      headers: {
        "x-api-key": getApiKey()
      }
    }
  );

  return response.data;
};
