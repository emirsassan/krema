# Krema

Unofficial TypeScript SDK for the Creem API, providing type-safe access to products, licenses, checkouts, and discount management.

## Installation

```bash
npm install krema
# or
yarn add krema
# or
bun install krema
```

## Configuration

Configure the SDK using either environment variables or a `.kremarc` file:

### Using .env
```env
CREEM_API_KEY=your_api_key_here
```

### Using .kremarc
```json
{
  "apiKey": "your_api_key_here",
  "mode": "test" // or "prod"
}
```

## Usage

### Products

Generate type definitions and product information:

```typescript
import { generateTypesFromApi } from 'krema';

// Generate types and product information
await generateTypesFromApi(false, './krema/products.ts');

// Use generated types and helpers
import { getProduct, ProductName } from './krema/products';

const product = getProduct('Premium subscription');
console.log(product.price); // 500
```

### Checkout Sessions

Create checkout sessions for products:

```typescript
import { createCheckoutSession } from 'krema';
import { getProduct } from './krema/products';

const session = await createCheckoutSession({
  product_id: getProduct('Premium subscription').id,
  request_id: crypto.randomUUID()
});

console.log(session.checkout_url);
```

### License Management

```typescript
import { activateLicense, validateLicense, deactivateLicense } from 'krema';

// Activate a license
await activateLicense('license_key', 'instance_name');

// Validate a license
await validateLicense('license_key', 'instance_id');

// Deactivate a license
await deactivateLicense('license_key', 'instance_id');
```

### Discount Codes

Create and manage discount codes:

```typescript
import { createDiscountCode } from 'krema';

// Create a percentage discount
await createDiscountCode({
  type: 'percentage',
  name: 'Summer Sale',
  percentage: 20,
  duration: 'once',
  code: 'SUMMER20'
});

// Create a fixed amount discount
await createDiscountCode({
  type: 'fixed',
  name: '10 USD Off',
  amount: 1000, // Amount in cents
  currency: 'USD',
  duration: 'once',
  code: '10OFF'
});
```

## CLI Usage

Krema includes a CLI tool for generating type definitions:

```bash
# Install globally
npm install -g krema

# Generate types
krema

# Or use npx
npx krema
```

## Development Mode

By default, Krema operates in test mode. To switch to production:

```json
{
  "apiKey": "your_api_key",
  "mode": "prod"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
