// priceUnitModule.ts

import { DeepPartial, Styles, YAxisType, utils } from  'equicharts';
import { Setter } from 'solid-js';
import { SymbolInfo } from '../types';


export function createPriceUnitElement(): HTMLSpanElement {
  const priceUnitDom = document.createElement('span');
  priceUnitDom.className = 'klinecharts-pro-price-unit';
  return priceUnitDom;
}

export function createButtonsContainer(): HTMLDivElement {
  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'flex';
  buttonsDiv.className = 'klinecharts-pro-price-type';
  return buttonsDiv;
}

export function createLogarithmicButton(
  setIsLogarithmic: Setter<boolean>,
  isLogarithmic: () => boolean,
  isPercentage: () => boolean,
  handleSelectedYAxisDataSource: (style: DeepPartial<Styles>) => void
): HTMLDivElement {
  const logarthimic = document.createElement('div');
  logarthimic.className = 'price-type-buttons';
  logarthimic.innerHTML = "L";
  const tooltip = createTooltip("Toggle Logarthimic View");
  document.body.appendChild(tooltip);
  logarthimic.onmouseover = (e: MouseEvent) => {
    tooltip.style.display = 'block';
    tooltip.style.right = 10 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
  };
  logarthimic.onmouseout = () => {
    tooltip.style.display = 'none';
  };
  logarthimic.onclick = () => {
    setIsLogarithmic(!isLogarithmic());
    if (!isPercentage()) {
      logarthimic.style.backgroundColor = isLogarithmic() ? "#2962ff" : "";
    } else {
      logarthimic.style.backgroundColor = "";
    }
    handleSelectedYAxisDataSource({
      yAxis: {
        type: isLogarithmic() ? YAxisType.Log : YAxisType.Normal
      }
    });
  };
  return logarthimic;
}

export function createPercentageButton(
  setIsPercentage: Setter<boolean>,
  isPercentage: () => boolean,
  isLogarithmic: () => boolean,
  logarthimic: HTMLElement,
  handleSelectedYAxisDataSource: (style: DeepPartial<Styles>) => void
): HTMLDivElement {
  const percentage = document.createElement('div');
  percentage.className = 'price-type-buttons';
  percentage.innerHTML = "P";
  const tooltip = createTooltip("Toggle Percentage View");
  document.body.appendChild(tooltip);
  percentage.onmouseover = (e: MouseEvent) => {
    tooltip.style.display = 'block';
    tooltip.style.right = 10 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
  };
  percentage.onmouseout = () => {
    tooltip.style.display = 'none';
  };
  percentage.onclick = () => {
    setIsPercentage(!isPercentage());
    if (isPercentage()) {
      percentage.style.backgroundColor = "#2962ff";
      logarthimic.style.backgroundColor = "";
    } else {
      percentage.style.backgroundColor = "";
      if (isLogarithmic()) {
        logarthimic.style.backgroundColor = "#2962ff";
      }
    }
    handleSelectedYAxisDataSource({
      yAxis: {
        type: isPercentage() ? YAxisType.Percentage : YAxisType.Normal
      }
    })
  };

  return percentage;
}

function createTooltip(title: string): HTMLDivElement {
  const tooltip = document.createElement('div');
  tooltip.className = 'price-type-tooltip-log';
  tooltip.innerHTML = title;
  tooltip.style.display = 'none';
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '31';
  return tooltip;
}

interface WatermarkProps {
  watermark: string | Node;
}

export function createWatermark(props: WatermarkProps): HTMLDivElement {
  const watermark = document.createElement('div');
  watermark.className = 'klinecharts-pro-watermark';
  if (utils.isString(props.watermark)) {
    const str = (props.watermark as string).replace(/(^\s*)|(\s*$)/g, '');
    watermark.innerHTML = str;
  } else {
    watermark.appendChild(props.watermark as Node);
  }
  return watermark;
}

export function createSymbolHeading(symbol: SymbolInfo): string {
  return symbol.name ? `${symbol.name} - ${symbol.exchange}` : symbol.ticker;
}