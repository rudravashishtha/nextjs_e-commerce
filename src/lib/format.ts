

export function formatPrice(price: number) {
  return (
    // Convert to Indian rupee
    price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
    })
  )
}
