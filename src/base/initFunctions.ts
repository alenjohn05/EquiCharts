import { FormatDateType, utils } from  'equicharts'
import { Setter } from "solid-js"
import { Period } from "../types"

export function getInitialOptions(period: Period,) {
  return {
    customApi: {
      formatDate: (dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string, type: FormatDateType) => {
        const p = period
        switch (p.timespan) {
          case 'minute': {
            if (type === FormatDateType.XAxis) {
              return utils.formatDate(dateTimeFormat, timestamp, 'HH:mm')
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'DD LL YYYY HH:mm')
          }
          case 'hour': {
            if (type === FormatDateType.XAxis) {
              return utils.formatDate(dateTimeFormat, timestamp, 'DD LL HH:mm')
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'DD LL YYYY HH:mm')
          }
          case 'day':{
            return utils.formatDate(dateTimeFormat, timestamp, `DD LL YYYY`)
          }
          case 'week': {
            return utils.formatDate(dateTimeFormat, timestamp, `DD LL YYYY`)
          }
          case 'month': {
            if (type === FormatDateType.XAxis) {
              return utils.formatDate(dateTimeFormat, timestamp, 'YYYY LL')
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'YYYY LL DD')
          }
          case 'year': {
            if (type === FormatDateType.XAxis) {
              return utils.formatDate(dateTimeFormat, timestamp, 'YYYY')
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'DD LL YYYY')
          }
        }
        return utils.formatDate(dateTimeFormat, timestamp, 'YYYY LL DD HH:mm')
      }
    }
  }
}

