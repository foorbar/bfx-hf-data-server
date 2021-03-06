'use strict'

const debug = require('debug')('bfx:hf:data-server:bt:sync-data')
const { Trade, Candle } = require('bfx-hf-models')

const send = require('../wss/send')

module.exports = async (ws, rest, btArgs) => {
  const {
    symbol, tf, start, end, trades, candles
  } = btArgs

  debug('syncing data...')
  send(ws, ['bt.sync.start', symbol, tf, start, end])

  if (candles){
    await Candle.syncRange(rest, btArgs)
  }

  if (trades) {
    await Trade.syncRange(rest, btArgs)
  }

  send(ws, ['bt.sync.end', symbol, tf, start, end])
  debug('sync ended')
}
