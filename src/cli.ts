import { getMode } from './config';
import { generateTypesFromApi } from './generator';

async function main() {
  try {
    const isTestMode = getMode() !== 'prod';
    
    await generateTypesFromApi(isTestMode, './types/products.ts');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 