export function runInSeries (funcs: Array<() => Promise<any>>): Promise<any> {
  const results = []
  return funcs.reduce((accumulator, f) => accumulator.then(async () => {
    const result = await f()
    results.push(result)
    return results
  }), Promise.resolve())
}

export function runInParallel (funcs: Array<() => Promise<any>>): Promise<any[]> {
  return Promise.all(funcs.map(f => f()))
}

export function createBatchRequestsFromItems (funcs: Array<() => Promise<any>>, batchSize = 25): Array<() => Promise<any>> {
  const promiseArr = []
  for (let i = 0; i < funcs.length; i += batchSize) {
    const batch = funcs.slice(i, i + batchSize)
    promiseArr.push(() => runInParallel(batch))
  }
  return promiseArr
}

export function runInBatches (funcs: Array<() => Promise<any>>, batchSize): Promise<any> {
  return runInSeries(createBatchRequestsFromItems(funcs, batchSize))
}
