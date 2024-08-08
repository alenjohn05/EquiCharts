import { Component } from 'solid-js';
import candle_solid from './candle_solid';
import area from './area';
import ohlc from './ohlc';
import i18n from '../../../i18n';
import candle_up_stroke from './candle_up_stroke';
import candle_down_stroke from './candle_down_stroke';
import candle_stroke from './candle_stroke';
import { CandleType } from 'equicharts';
import line from './line';
import line_marks from './line_marks';
import step_line from './step_line';
import heikin_ashi from './heikin_ashi';
import candle_high_low from './candle_high_low';

export const mapping = {
  candle_solid,
  area,
  candle_up_stroke,
  candle_down_stroke,
  ohlc,
  candle_stroke,
  line,
  line_marks,
  step_line,
  heikin_ashi,
  candle_high_low,
};

export function getCandleOptions(locale: string) {
  return [
    {
      key: 'candle_solid',
      text: i18n('candle_solid', locale),
      type: CandleType.CandleSolid,
    },
    {
      key: 'candle_stroke',
      text: i18n('candle_stroke', locale),
      type: CandleType.CandleStroke,
    },
    {
      key: 'candle_up_stroke',
      text: i18n('candle_up_stroke', locale),
      type: CandleType.CandleUpStroke,
    },
    {
      key: 'candle_down_stroke',
      text: i18n('candle_down_stroke', locale),
      type: CandleType.CandleDownStroke,
    },
    { key: 'ohlc', text: i18n('ohlc', locale), type: CandleType.Ohlc },
    { key: 'area', text: i18n('area', locale), type: CandleType.Area },
    { key: 'line', text: i18n('line', locale), type: CandleType.Line },
    {
      key: 'line_marks',
      text: i18n('line_marks', locale),
      type: CandleType.LineMark,
    },
    {
      key: 'step_line',
      text: i18n('step_line', locale),
      type: CandleType.StepLine,
    },
    {
      key: 'heikin_ashi',
      text: i18n('heikin_ashi', locale),
      type: CandleType.HeikinAshi,
    },
    {
      key: 'candle_high_low',
      text: i18n('candle_high_low', locale),
      type: CandleType.CandleHighLow,
    },
  ];
}
interface IconProps {
  class?: string;
  name: string;
}

// @ts-expect-error
export const Icon: Component<IconProps> = (props) =>mapping[props.name](props.class);
