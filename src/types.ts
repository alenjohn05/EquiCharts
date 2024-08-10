import { TViewData, Styles, DeepPartial } from 'equicharts';

export interface SymbolInfo {
  ticker: string;
  name?: string;
  shortName?: string;
  exchange?: string;
  market?: string;
  pricePrecision?: number;
  volumePrecision?: number;
  priceCurrency?: string;
  type?: string;
  logo?: string;
}

export interface Period {
  multiplier: number;
  timespan: string;
  text: string;
}

export type DatafeedSubscribeCallback = (data: TViewData) => void;

export interface Datafeed {
  searchSymbols(search?: string): Promise<SymbolInfo[]>;
  getHistoryTViewData(
    symbol: SymbolInfo,
    period: Period,
    from: number,
    to: number,
  ): Promise<TViewData[]>;
  subscribe(
    symbol: SymbolInfo,
    period: Period,
    callback: DatafeedSubscribeCallback,
  ): void;
  unsubscribe(symbol: SymbolInfo, period: Period): void;
}

export interface ChartProOptions {
  container: string | HTMLElement;
  styles?: DeepPartial<Styles>;
  watermark?: string | Node;
  theme?: string;
  locale?: string;
  yScrolling?: boolean;
  drawingBarVisible?: boolean;
  symbol: SymbolInfo;
  period: Period;
  periods?: Period[];
  timezone?: string;
  mainIndicators?: string[];
  subIndicators?: string[];
  datafeed: Datafeed;
}

export interface ChartPro {
  setTheme(theme: string): void;
  getTheme(): string;
  setStyles(styles: DeepPartial<Styles>): void;
  getStyles(): Styles;
  setLocale(locale: string): void;
  getLocale(): string;
  setTimezone(timezone: string): void;
  getTimezone(): string;
  setSymbol(symbol: SymbolInfo): void;
  getSymbol(): SymbolInfo;
  setPeriod(period: Period): void;
  getPeriod(): Period;
  setYScrolling(locale: boolean): void;
  getYScrolling(): boolean;
}

export interface Dataset {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  turnover: number;
  [key: string]: number;
}
