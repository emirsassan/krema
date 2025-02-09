import { config } from 'dotenv';
import * as fs from 'fs';
import { resolve } from 'path';

interface KremaConfig {
  apiKey?: string;
  mode?: 'test' | 'prod';
}

function loadEnvApiKey(): string | null {
  config();
  return process.env.CREEM_API_KEY || null;
}

function loadKremaConfig(): KremaConfig {
  try {
    const configPath = resolve(process.cwd(), '.kremarc');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(configContent);
    }
  } catch (error) {
    console.warn('Error reading .kremarc:', error);
  }
  return {};
}

export function getApiKey(): string {
  // Önce .env dosyasından oku
  const envApiKey = loadEnvApiKey();
  if (envApiKey) return envApiKey;

  // .kremarc dosyasından oku
  const kremaConfig = loadKremaConfig();
  if (kremaConfig.apiKey) return kremaConfig.apiKey;

  throw new Error('API key not found in .env or .kremarc');
}

export function getMode(): 'test' | 'prod' {
  const kremaConfig = loadKremaConfig();
  return kremaConfig.mode || 'test';
} 