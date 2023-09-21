export class BidPriceError extends Error {
  name = "BidPriceError"
  statusCode = 400

  constructor({ message }: { message: string }) {
    super()
    this.message = message
  }
}
