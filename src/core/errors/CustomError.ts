export class BidPriceError extends Error {
  name = "BidPriceError"
  statusCode = 400

  constructor({ message }: { message: string }) {
    super()
    this.message = message
  }
}

export class InvalidBidError extends Error {
  name = "InvalidBidError"
  statusCode = 400

  constructor({ message }: { message: string }) {
    super()
    this.message = message
  }
}
