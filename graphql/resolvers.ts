
export const resolvers = {
  Query: {
    randomNumber: (): number => {
      return Math.round(Math.random() * 100)
    }
  }
}
