import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { getApiKey } from "../config";

interface ApiResponse {
  items: Array<{
    id: string;
    name: string;
    price: number;
    [key: string]: any;
  }>;
  pagination: {
    total_records: number;
    total_pages: number;
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
  };
}

async function generateTypesFromApi(testMode: boolean, outputPath: string) {
  try {
    const response = await axios.get<ApiResponse>(
      testMode ? "https://test-api.creem.io/v1/products/search" : "https://api.creem.io/v1/products/search",
      {
        headers: {
          "x-api-key": getApiKey(),
        },
      },
    );
    const items = response.data.items;

    if (!items || items.length === 0) {
      throw new Error('No items found in API response');
    }

    // Create directory if it doesn't exist
    const directory = path.dirname(outputPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Extract unique values for type generation
    const productNames = items.map((item) => item.name);

    // Generate type definition
    const typeContent = `
export type ProductName = ${productNames
      .map((name) => `"${name}"`)
      .join(" | ")};

export interface Product {
  id: string;
  name: ProductName;
  price: number;
  description: string;
}

export interface Products {
  [key: string]: {
    id: string;
    price: number;
    description: string;
  };
}

export const products: Products = {
  ${items
    .map(
      (item) => `
  "${item.name.toLowerCase()}": {
    id: "${item.id}",
    price: ${item.price},
    description: "${item.description}"
  }`
    )
    .join(",")}
};

export function getProduct(name: ProductName) {
  return products[name.toLowerCase()];
}
`;

    fs.writeFileSync(path.resolve(outputPath), typeContent);
    console.log("Types generated successfully!");
  } catch (error) {
    console.error("Error generating types:", error);
  }
}
/*
if (require.main === module) {
  const outputPath = "./types/products.ts";

  generateTypesFromApi(true, outputPath);
}
*/
export { generateTypesFromApi };
