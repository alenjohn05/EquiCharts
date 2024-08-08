 
import { registerOverlay, registerIndicator, registerFigure } from  'equicharts'

import overlays from './extension'

import DefaultDatafeed from './DefaultDatafeed'
import ChartMain from './ChartMain'

import { load } from './i18n'

import { Datafeed, SymbolInfo, Period, DatafeedSubscribeCallback, ChartProOptions, ChartPro } from './types'

import './index.less'


overlays.forEach(o => { registerOverlay(o) })

export {
  DefaultDatafeed,
  ChartMain,
  load as loadLocales
}

export type {
  Datafeed, SymbolInfo, Period, DatafeedSubscribeCallback, ChartProOptions, ChartPro
}
