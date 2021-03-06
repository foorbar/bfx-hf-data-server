'use strict'

const startWSS = require('./wss/start_wss')

module.exports = async ({
  symbols = [],
  timeframes = [],
  port = 8899,
  candles,
  trades,
  rest
}) => {
  const dsState = {
    symbols,
    timeframes,
    candles,
    trades,
    port,
    rest
  }

  return {
    ...dsState,
    wss: startWSS(dsState),
  }
}
