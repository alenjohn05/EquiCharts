import { Component, from } from 'solid-js';

import horizontalStraightLine from './horizontalStraightLine';
import horizontalRayLine from './horizontalRayLine';
import horizontalSegment from './horizontalSegment';
import verticalStraightLine from './verticalStraightLine';
import verticalRayLine from './verticalRayLine';
import verticalSegment from './verticalSegment';
import straightLine from './straightLine';
import rayLine from './rayLine';
import segment from './segment';
import arrow from './arrow';
import priceLine from './priceLine';
import priceChannelLine from './priceChannelLine';
import parallelStraightLine from './parallelStraightLine';
import fibonacciLine from './fibonacciLine';
import fibonacciSegment from './fibonacciSegment';
import fibonacciCircle from './fibonacciCircle';
import fibonacciSpiral from './fibonacciSpiral';
import fibonacciSpeedResistanceFan from './fibonacciSpeedResistanceFan';
import fibonacciExtension from './fibonacciExtension';
import gannBox from './gannBox';
import circle from './circle';
import triangle from './triangle';
import rect from './rect';
import parallelogram from './parallelogram';
import threeWaves from './threeWaves';
import fiveWaves from './fiveWaves';
import eightWaves from './eightWaves';
import anyWaves from './anyWaves';
import abcd from './abcd';
import xabcd from './xabcd';
import elliotTripleComboWaves from './elliotTripleComboWaves';
import headAndShoulders from './headAndShoulders';

import weakMagnet from './weakMagnet';
import strongMagnet from './strongMagnet';

import visible from './visible';
import invisible from './invisible';

import lock from './lock';
import unlock from './unlock';

import remove from './remove';

import type { SelectDataSourceItem } from '../../../component';

import i18n from '../../../i18n';
import measure from './measure';
import simpleAnnotation from './simpleAnnotation';
import simpleTag from './simpleTag';
import crossLine from './crossLine';
import faltTopBottom from './faltTopBottom';
import disJointChannel from './disJointChannel';
import arc from './arc';
import drawingbrush from './drawingbrush';
import tradingPlan from './tradingPlan';
import fibonacciDiagonal from './fibonacciDiagonal';

export const mapping = {
  horizontalStraightLine,
  horizontalRayLine,
  horizontalSegment,
  verticalStraightLine,
  verticalRayLine,
  verticalSegment,
  straightLine,
  rayLine,
  segment,
  arrow,
  priceLine,
  priceChannelLine,
  parallelStraightLine,
  fibonacciLine,
  fibonacciSegment,
  fibonacciCircle,
  fibonacciSpiral,
  fibonacciSpeedResistanceFan,
  fibonacciExtension,
  gannBox,
  circle,
  triangle,
  rect,
  parallelogram,
  threeWaves,
  fiveWaves,
  eightWaves,
  anyWaves,
  abcd,
  xabcd,
  elliotTripleComboWaves,
  headAndShoulders,
  weak_magnet: weakMagnet,
  strong_magnet: strongMagnet,
  lock,
  unlock,
  visible,
  invisible,
  remove,
  measure,
  simpleAnnotation,
  simpleTag,
  crossLine,
  faltTopBottom,
  disJointChannel,
  arc,
  tradingPlan,
  fibonacciDiagonal,
};

export function createSingleLineOptions(
  locale: string,
): SelectDataSourceItem[] {
  return [
    {
      key: 'horizontalStraightLine',
      text: i18n('horizontal_straight_line', locale),
    },
    { key: 'horizontalRayLine', text: i18n('horizontal_ray_line', locale) },
    { key: 'horizontalSegment', text: i18n('horizontal_segment', locale) },
    {
      key: 'verticalStraightLine',
      text: i18n('vertical_straight_line', locale),
    },
    { key: 'verticalRayLine', text: i18n('vertical_ray_line', locale) },
    { key: 'verticalSegment', text: i18n('vertical_segment', locale) },
    { key: 'crossLine', text: i18n('Cross Line', locale) },
    { key: 'straightLine', text: i18n('straight_line', locale) },
    { key: 'rayLine', text: i18n('ray_line', locale) },
    { key: 'segment', text: i18n('segment', locale) },
    { key: 'arrow', text: i18n('arrow', locale) },
    { key: 'priceLine', text: i18n('price_line', locale) },
  ];
}

export function createMoreLineOptions(locale: string): SelectDataSourceItem[] {
  return [
    { key: 'priceChannelLine', text: i18n('price_channel_line', locale) },
    {
      key: 'parallelStraightLine',
      text: i18n('parallel_straight_line', locale),
    },
    { key: 'faltTopBottom', text: i18n('Flat Top/Bottom', locale) },
    { key: 'disJointChannel', text: i18n('Disjoint Channel', locale) },
  ];
}

export function createPolygonOptions(locale: string): SelectDataSourceItem[] {
  return [
    { key: 'circle', text: i18n('circle', locale) },
    { key: 'rect', text: i18n('rect', locale) },
    { key: 'parallelogram', text: i18n('parallelogram', locale) },
    { key: 'triangle', text: i18n('triangle', locale) },
    { key: 'arc', text: i18n('arc', locale) },
    { key: 'tradingPlan', text: i18n('Trading Plan', locale) },
  ];
}

export function createFibonacciOptions(locale: string): SelectDataSourceItem[] {
  return [
    { key: 'fibonacciLine', text: i18n('fibonacci_line', locale) },
    { key: 'fibonacciDiagonal', text: i18n('fibonacci diagonal', locale) },
    { key: 'fibonacciSegment', text: i18n('fibonacci_segment', locale) },
    { key: 'fibonacciCircle', text: i18n('fibonacci_circle', locale) },
    { key: 'fibonacciSpiral', text: i18n('fibonacci_spiral', locale) },
    {
      key: 'fibonacciSpeedResistanceFan',
      text: i18n('fibonacci_speed_resistance_fan', locale),
    },
    { key: 'fibonacciExtension', text: i18n('fibonacci_extension', locale) },
    { key: 'gannBox', text: i18n('gann_box', locale) },
  ];
}

export function createWaveOptions(locale: string): SelectDataSourceItem[] {
  return [
    { key: 'xabcd', text: i18n('xabcd', locale) },
    { key: 'abcd', text: i18n('abcd', locale) },
    { key: 'threeWaves', text: i18n('three_waves', locale) },
    { key: 'fiveWaves', text: i18n('five_waves', locale) },
    { key: 'eightWaves', text: i18n('eight_waves', locale) },
    { key: 'anyWaves', text: i18n('any_waves', locale) },
    {
      key: 'elliotTripleComboWaves',
      text: i18n('Elliot Triple Combo Waves', locale),
    },
    { key: 'headAndShoulders', text: i18n('Head and Shoulders', locale) },
    { key: 'measure', text: i18n('Price Measure', locale) },
    { key: 'simpleAnnotation', text: i18n('Simple Annotation', locale) },
    { key: 'simpleTag', text: i18n('Simple Tag', locale) },
  ];
}

export function createMagnetOptions(locale: string): SelectDataSourceItem[] {
  return [
    { key: 'weak_magnet', text: i18n('weak_magnet', locale) },
    { key: 'strong_magnet', text: i18n('strong_magnet', locale) },
  ];
}

interface IconProps {
  class?: string;
  name: string;
}

// @ts-expect-error
export const Icon: Component<IconProps> = (props) =>
  mapping[props.name](props.class);
