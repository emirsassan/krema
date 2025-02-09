import { createCheckoutSession } from "../src/checkout"
import { getProduct } from "../krema/products"

// Funny checkout session helper
const data = await createCheckoutSession({
  product_id: getProduct("Premium subscription").id,
  request_id: crypto.randomUUID()
})

console.log(data.checkout_url)
