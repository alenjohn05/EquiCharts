/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare type ActionCallback = (data?: any) => void;

export declare enum ActionType {
    OnDataReady = "onDataReady",
    OnZoom = "onZoom",
    OnScroll = "onScroll",
    OnVisibleRangeChange = "onVisibleRangeChange",
    OnTooltipIconClick = "onTooltipIconClick",
    OnCrosshairChange = "onCrosshairChange",
    OnCandleBarClick = "onCandleBarClick",
    OnPaneDrag = "onPaneDrag"
}

export declare interface ArcAttrs extends CircleAttrs {
    startAngle: number;
    endAngle: number;
}

export declare interface Axis {
    convertToPixel: (value: number) => number;
    convertFromPixel: (px: number) => number;
}

export declare type AxisCreateTicksCallback = (params: AxisCreateTicksParams) => AxisTick[];

export declare interface AxisCreateTicksParams {
    range: AxisRange;
    bounding: Bounding;
    defaultTicks: AxisTick[];
}

export declare type AxisLineStyle = Omit<StateLineStyle, 'style' | 'dashedValue'>;

export declare interface AxisRange extends VisibleRange {
    readonly range: number;
    readonly realRange: number;
}

export declare interface AxisStyle {
    show: boolean;
    size: number | 'auto';
    axisLine: AxisLineStyle;
    tictView: AxisTictViewStyle;
    tickText: AxisTickTextStyle;
}

export declare interface AxisTemplate {
    name: string;
    createTicks: AxisCreateTicksCallback;
}

export declare interface AxisTick {
    coord: number;
    value: number | string;
    text: string;
}

export declare interface AxisTickTextStyle extends Pick<StateTextStyle, 'show' | 'color' | 'weight' | 'family' | 'size'> {
    marginStart: number;
    marginEnd: number;
}

export declare interface AxisTictViewStyle extends AxisLineStyle {
    length: number;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface BarSpace {
    bar: number;
    halfBar: number;
    gapBar: number;
    halfGapBar: number;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface Bounding {
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
}

/**
 * Measure the width of text
 * @param text
 * @returns {number}
 */
export declare function calcTextWidth(text: string, size?: number, weight?: string | number, family?: string): number;

export declare interface CandleAreaPointStyle {
    show: boolean;
    color: string;
    radius: number;
    rippleColor: string;
    rippleRadius: number;
    animation: boolean;
    animationDuration: number;
}

export declare interface CandleAreaStyle {
    lineSize: number;
    lineColor: string;
    value: string;
    smooth: boolean;
    backgroundColor: string | GradientColor[];
    point: CandleAreaPointStyle;
}

export declare interface CandleBarColor extends ChangeColor {
    upBorderColor: string;
    downBorderColor: string;
    noChangeBorderColor: string;
    upWickColor: string;
    downWickColor: string;
    noChangeWickColor: string;
}

export declare interface CandleHighLowPriceMarkStyle {
    show: boolean;
    color: string;
    textOffset: number;
    textSize: number;
    textFamily: string;
    textWeight: string;
}

export declare interface CandleHighLowStyle {
    color: string;
}

export declare interface CandleLastPriceMarkStyle extends ChangeColor {
    show: boolean;
    line: CandleLastPriceMartViewStyle;
    text: LastValueMarkTextStyle;
}

export declare type CandleLastPriceMartViewStyle = Omit<StateLineStyle, 'color'>;

export declare interface CandleLinePointStyle {
    show: boolean;
    color: string;
    radius: number;
    rippleColor: string;
    rippleRadius: number;
    animation: boolean;
    animationDuration: number;
}

export declare interface CandleLineStyle {
    lineSize: number;
    lineColor: string;
    value: string;
    smooth: boolean;
    point: CandleLinePointStyle;
}

export declare interface CandlePriceMarkStyle {
    show: boolean;
    high: CandleHighLowPriceMarkStyle;
    low: CandleHighLowPriceMarkStyle;
    last: CandleLastPriceMarkStyle;
}

export declare interface CandleStyle {
    type: CandleType;
    bar: CandleBarColor;
    area: CandleAreaStyle;
    highLow: CandleHighLowStyle;
    line: CandleLineStyle;
    priceMark: CandlePriceMarkStyle;
    visiblePriceMark: CandleVisiblePriceMarkStyle;
    tooltip: CandleTooltipStyle;
}

export declare type CandleTooltipCustomCallback = (data: CandleTooltipCustomCallbackData, styles: CandleStyle) => TooltipLegend[];

export declare interface CandleTooltipCustomCallbackData {
    prev: Nullable<TViewData>;
    current: TViewData;
    next: Nullable<TViewData>;
}

export declare enum CandleTooltipRectPosition {
    Fixed = "fixed",
    Pointer = "pointer"
}

export declare interface CandleTooltipRectStyle extends Omit<RectStyle, 'style' | 'borderDashedValue' | 'borderStyle'>, Padding, Offset {
    position: CandleTooltipRectPosition;
}

export declare interface CandleTooltipStyle extends TooltipStyle, Offset {
    custom: CandleTooltipCustomCallback | TooltipLegend[];
    rect: CandleTooltipRectStyle;
}

export declare enum CandleType {
    CandleSolid = "candle_solid",
    CandleStroke = "candle_stroke",
    CandleUpStroke = "candle_up_stroke",
    CandleDownStroke = "candle_down_stroke",
    Ohlc = "ohlc",
    Area = "area",
    Line = "line",
    LineMark = "line_marks",
    StepLine = "step_line",
    HeikinAshi = "heikin_ashi",
    CandleHighLow = "candle_high_low",
    CandleVolume = "candle_volume"
}

export declare interface CandleVisiblePriceMarkStyle {
    show: boolean;
    high: CandleHighLowPriceMarkStyle;
    low: CandleHighLowPriceMarkStyle;
    last: CandleLastPriceMarkStyle;
}

export declare interface ChangeColor {
    upColor: string;
    downColor: string;
    noChangeColor: string;
}

export declare interface Chart {
    id: string;
    getDom: (paneId?: string, position?: DomPosition) => Nullable<HTMLElement>;
    getSize: (paneId?: string, position?: DomPosition) => Nullable<Bounding>;
    setLocale: (locale: string) => void;
    getLocale: () => string;
    setStyles: (styles: string | DeepPartial<Styles>) => void;
    getStyles: () => Styles;
    setCustomApi: (customApi: Partial<CustomApi>) => void;
    setPriceVolumePrecision: (pricePrecision: number, volumePrecision: number) => void;
    getPriceVolumePrecision: () => Precision;
    setTimezone: (timezone: string) => void;
    getTimezone: () => string;
    setOffsetRightDistance: (distance: number) => void;
    getOffsetRightDistance: () => number;
    setMaxOffsetLeftDistance: (distance: number) => void;
    setMaxOffsetRightDistance: (distance: number) => void;
    setLeftMinVisibleBarCount: (barCount: number) => void;
    setRightMinVisibleBarCount: (barCount: number) => void;
    setBarSpace: (space: number) => void;
    getBarSpace: () => number;
    getVisibleRange: () => VisibleRange;
    clearData: () => void;
    getDataList: () => TViewData[];
    applyNewData: (dataList: TViewData[], more?: boolean, callback?: () => void) => void;
    /**
     * @deprecated
     * Since v9.8.0 deprecated, since v10 removed
     */
    applyMoreData: (dataList: TViewData[], more?: boolean, callback?: () => void) => void;
    updateData: (data: TViewData, callback?: () => void) => void;
    /**
     * @deprecated
     * Since v9.8.0 deprecated, since v10 removed
     */
    loadMore: (cb: LoadMoreCallback) => void;
    setLoadDataCallback: (cb: LoadDataCallback) => void;
    createIndicator: (value: string | IndicatorCreate, isStack?: boolean, paneOptions?: PaneOptions, callback?: () => void) => Nullable<string>;
    overrideIndicator: (override: IndicatorCreate, paneId?: string, callback?: () => void) => void;
    getIndicatorByPaneId: (paneId?: string, name?: string) => Nullable<Indicator> | Nullable<Map<string, Indicator>> | Map<string, Map<string, Indicator>>;
    removeIndicator: (paneId: string, name?: string) => void;
    createOverlay: (value: string | OverlayCreate | Array<string | OverlayCreate>, paneId?: string) => Nullable<string> | Array<Nullable<string>>;
    getOverlayById: (id: string) => Nullable<Overlay>;
    overrideOverlay: (override: Partial<OverlayCreate>) => void;
    removeOverlay: (remove?: string | OverlayRemove) => void;
    setPaneOptions: (options: PaneOptions) => void;
    setZoomEnabled: (enabled: boolean) => void;
    isZoomEnabled: () => boolean;
    setScrollEnabled: (enabled: boolean) => void;
    isScrollEnabled: () => boolean;
    setYScrolling: (locale: boolean) => void;
    getYScrolling: () => boolean;
    scrollByDistance: (distance: number, animationDuration?: number) => void;
    scrollToRealTime: (animationDuration?: number) => void;
    scrollToDataIndex: (dataIndex: number, animationDuration?: number) => void;
    scrollToTimestamp: (timestamp: number, animationDuration?: number) => void;
    zoomAtCoordinate: (scale: number, coordinate?: Coordinate, animationDuration?: number) => void;
    zoomAtDataIndex: (scale: number, dataIndex: number, animationDuration?: number) => void;
    zoomAtTimestamp: (scale: number, timestamp: number, animationDuration?: number) => void;
    convertToPixel: (points: Partial<Point> | Array<Partial<Point>>, finder: ConvertFinder) => Partial<Coordinate> | Array<Partial<Coordinate>>;
    convertFromPixel: (coordinates: Array<Partial<Coordinate>>, finder: ConvertFinder) => Partial<Point> | Array<Partial<Point>>;
    executeAction: (type: ActionType, data: any) => void;
    subscribeAction: (type: ActionType, callback: ActionCallback) => void;
    unsubscribeAction: (type: ActionType, callback?: ActionCallback) => void;
    getConvertPictureUrl: (includeOverlay?: boolean, type?: string, backgroundColor?: string) => string;
    resize: () => void;
}

export declare function checkCoordinateOnArc(coordinate: Coordinate, attrs: ArcAttrs | ArcAttrs[]): boolean;

export declare function checkCoordinateOnCircle(coordinate: Coordinate, attrs: CircleAttrs | CircleAttrs[]): boolean;

export declare function checkCoordinateOnLine(coordinate: Coordinate, attrs: LineAttrs | LineAttrs[]): boolean;

export declare function checkCoordinateOnPolygon(coordinate: Coordinate, attrs: PolygonAttrs | PolygonAttrs[]): boolean;

export declare function checkCoordinateOnRect(coordinate: Coordinate, attrs: RectAttrs | RectAttrs[]): boolean;

export declare function checkCoordinateOnText(coordinate: Coordinate, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>): boolean;

export declare interface CircleAttrs {
    x: number;
    y: number;
    r: number;
}

export declare function clone<T>(target: T): T;

export declare interface ConvertFinder {
    paneId?: string;
    absolute?: boolean;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface Coordinate {
    x: number;
    y: number;
}

export declare interface Crosshair extends Partial<Coordinate> {
    paneId?: string;
    realX?: number;
    TViewData?: TViewData;
    dataIndex?: number;
    realDataIndex?: number;
}

export declare interface CrosshairDirectionStyle {
    show: boolean;
    line: StateLineStyle;
    text: StateTextStyle;
}

export declare interface CrosshairStyle {
    show: boolean;
    horizontal: CrosshairDirectionStyle;
    vertical: CrosshairDirectionStyle;
}

export declare interface CustomApi {
    formatDate: FormatDate;
    formatBigNumber: FormatBigNumber;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer X> ? ReadonlyArray<DeepPartial<X>> : T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Destroy chart instance
 * @param dcs
 */
export declare function dispose(dcs: HTMLElement | Chart | string): void;

export declare enum DomPosition {
    Root = "root",
    Main = "main",
    YAxis = "yAxis"
}

export declare function drawArc(ctx: CanvasRenderingContext2D, attrs: ArcAttrs | ArcAttrs[], styles: Partial<LineStyle>): void;

export declare function drawCircle(ctx: CanvasRenderingContext2D, attrs: CircleAttrs | CircleAttrs[], styles: Partial<PolygonStyle>): void;

export declare function drawLine(ctx: CanvasRenderingContext2D, attrs: LineAttrs | LineAttrs[], styles: Partial<SmoothLineStyle>): void;

export declare function drawPolygon(ctx: CanvasRenderingContext2D, attrs: PolygonAttrs | PolygonAttrs[], styles: Partial<PolygonStyle>): void;

export declare function drawRect(ctx: CanvasRenderingContext2D, attrs: RectAttrs | RectAttrs[], styles: Partial<RectStyle>): void;

export declare function drawText(ctx: CanvasRenderingContext2D, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>): void;

export declare type ExcludePickPartial<T, K extends keyof T> = PickRequired<Partial<T>, K>;

export declare interface Figure<A = any, S = any> {
    name: string;
    attrs: A;
    styles: S;
    draw: (ctx: CanvasRenderingContext2D, attrs: A, styles: S) => void;
    checkEventOn: (coordinate: Coordinate, attrs: A, styles: S) => boolean;
}

export declare type FigureConstructor<A = any, S = any> = new (figure: FigureCreate<A, S>) => {
    draw: (ctx: CanvasRenderingContext2D) => void;
};

export declare type FigureCreate<A = any, S = any> = Pick<Figure<A, S>, 'name' | 'attrs' | 'styles'>;

export declare type FigureTemplate<A = any, S = any> = Pick<Figure<A, S>, 'name' | 'draw' | 'checkEventOn'>;

export declare type FormatBigNumber = (value: string | number) => string;

export declare function formatBigNumber(value: string | number): string;

export declare type FormatDate = (dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string, type: FormatDateType) => string;

export declare function formatDate(dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string): string;

export declare enum FormatDateType {
    Tooltip = 0,
    Crosshair = 1,
    XAxis = 2
}

export declare function formatFoldDecimal(value: string | number, threshold: number): string;

export declare function formatPrecision(value: string | number, precision?: number): string;

export declare function formatThousands(value: string | number, sign: string): string;

/**
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare function formatValue(data: unknown, key: string, defaultValue?: unknown): unknown;

export declare function getFigureClass<A = any, S = any>(name: string): Nullable<FigureConstructor<A, S>>;

export declare function getLinearSlopeIntercept(coordinate1: Coordinate, coordinate2: Coordinate): Nullable<number[]>;

/**
 * 获取点在两点决定的一次函数上的y值
 * @param coordinate1
 * @param coordinate2
 * @param targetCoordinate
 */
export declare function getLinearYFromCoordinates(coordinate1: Coordinate, coordinate2: Coordinate, targetCoordinate: Coordinate): number;

export declare function getLinearYFromSlopeIntercept(kb: Nullable<number[]>, coordinate: Coordinate): number;

export declare function getOverlayClass(name: string): Nullable<OverlayConstructor>;

export declare function getSupportedFigures(): string[];

export declare function getSupportedIndicators(): string[];

export declare function getSupportedLocales(): string[];

export declare function getSupportedOverlays(): string[];

export declare interface GradientColor {
    offset: number;
    color: string;
}

export declare interface GridStyle {
    show: boolean;
    horizontal: StateLineStyle;
    vertical: StateLineStyle;
}

export declare interface Indicator<D = any> {
    /**
     * Indicator name
     */
    name: string;
    /**
     * Short name, for display
     */
    shortName: string;
    /**
     * Precision
     */
    precision: number;
    /**
     * Calculation parameters
     */
    calcParams: any[];
    /**
     * Whether ohlc column is required
     */
    shouldOhlc: boolean;
    /**
     * Whether large data values need to be formatted, starting from 1000, for example, whether 100000 needs to be formatted with 100K
     */
    shouldFormatBigNumber: boolean;
    /**
     * Whether the indicator is visible
     */
    visible: boolean;
    /**
     * Z index
     */
    zLevel: number;
    /**
     * Extend data
     */
    extendData: any;
    /**
     * Indicator series
     */
    series: IndicatorSeries;
    /**
     * Figure configuration information
     */
    figures: Array<IndicatorFigure<D>>;
    /**
     * Specified minimum value
     */
    minValue: Nullable<number>;
    /**
     * Specified maximum value
     */
    maxValue: Nullable<number>;
    /**
     * Style configuration
     */
    styles: Nullable<Partial<IndicatorStyle>>;
    /**
     *  Should update, should calc or draw
     */
    shouldUpdate: (prev: Indicator<D>, current: Indicator<D>) => IndicatorShouldUpdateReturn;
    /**
     * Indicator calculation
     */
    calc: IndicatorCalcCallback<D>;
    /**
     * Regenerate figure configuration
     */
    regenerateFigures: Nullable<IndicatorRegenerateFiguresCallback<D>>;
    /**
     * Create custom tooltip text
     */
    createTooltipDataSource: Nullable<IndicatorCreateTooltipDataSourceCallback>;
    /**
     * Custom draw
     */
    draw: Nullable<IndicatorDrawCallback<D>>;
    /**
     * Calculation result
     */
    result: D[];
}

export declare type IndicatorCalcCallback<D> = (dataList: TViewData[], indicator: Indicator<D>) => Promise<D[]> | D[];

export declare type IndicatorCreate<D = any> = ExcludePickPartial<Omit<Indicator<D>, 'result'>, 'name'>;

export declare type IndicatorCreateTooltipDataSourceCallback<D = any> = (params: IndicatorCreateTooltipDataSourceParams<D>) => IndicatorTooltipData;

export declare interface IndicatorCreateTooltipDataSourceParams<D = any> {
    TViewDataList: TViewData[];
    indicator: Indicator<D>;
    visibleRange: VisibleRange;
    bounding: Bounding;
    crosshair: Crosshair;
    defaultStyles: IndicatorStyle;
    xAxis: XAxis;
    yAxis: YAxis;
}

export declare type IndicatorDrawCallback<D = any> = (params: IndicatorDrawParams<D>) => boolean;

export declare interface IndicatorDrawParams<D = any> {
    ctx: CanvasRenderingContext2D;
    TViewDataList: TViewData[];
    indicator: Indicator<D>;
    visibleRange: VisibleRange;
    bounding: Bounding;
    barSpace: BarSpace;
    defaultStyles: IndicatorStyle;
    xAxis: XAxis;
    yAxis: YAxis;
}

export declare interface IndicatorFigure<D = any> {
    key: string;
    title?: string;
    type?: string;
    baseValue?: number;
    attrs?: IndicatorFigureAttrsCallback<D>;
    styles?: IndicatorFigureStylesCallback<D>;
}

export declare type IndicatorFigureAttrs = Partial<ArcAttrs> & Partial<LineStyle> & Partial<RectAttrs> & Partial<TextAttrs> & Record<string, any>;

export declare type IndicatorFigureAttrsCallback<D> = (params: IndicatorFigureAttrsCallbackParams<D>) => IndicatorFigureAttrs;

export declare type IndicatorFigureAttrsCallbackCoordinate<D> = IndicatorFigureCallbackBrother<Record<keyof D, number> & {
    x: number;
}>;

export declare type IndicatorFigureAttrsCallbackData<D> = IndicatorFigureCallbackBrother<D>;

export declare interface IndicatorFigureAttrsCallbackParams<D> {
    data: IndicatorFigureAttrsCallbackData<Nullable<D>>;
    coordinate: IndicatorFigureAttrsCallbackCoordinate<D>;
    bounding: Bounding;
    barSpace: BarSpace;
    xAxis: XAxis;
    yAxis: YAxis;
}

export declare interface IndicatorFigureCallbackBrother<PCN> {
    prev: PCN;
    current: PCN;
    next: PCN;
}

export declare type IndicatorFigureStyle = Partial<Omit<SmoothLineStyle, 'style'>> & Partial<Omit<RectStyle, 'style'>> & Partial<TextStyle> & Partial<{
    style: LineType[keyof LineType] | PolygonType[keyof PolygonType];
}> & Record<string, any>;

export declare type IndicatorFigureStylesCallback<D> = (data: IndicatorFigureStylesCallbackData<D>, indicator: Indicator<D>, defaultStyles: IndicatorStyle) => IndicatorFigureStyle;

export declare type IndicatorFigureStylesCallbackData<D> = IndicatorFigureCallbackBrother<IndicatorFigureStylesCallbackDataChild<D>>;

export declare interface IndicatorFigureStylesCallbackDataChild<D> {
    TViewData?: TViewData;
    indicatorData?: D;
}

export declare interface IndicatorLastValueMarkStyle {
    show: boolean;
    text: LastValueMarkTextStyle;
}

export declare type IndicatorPolygonStyle = Omit<PolygonStyle, 'color' | 'borderColor'> & ChangeColor;

export declare type IndicatorRegenerateFiguresCallback<D = any> = (calcParams: any[]) => Array<IndicatorFigure<D>>;

export declare enum IndicatorSeries {
    Normal = "normal",
    Price = "price",
    Volume = "volume"
}

export declare type IndicatorShouldUpdateReturn = boolean | {
    calc: boolean;
    draw: boolean;
};

export declare interface IndicatorStyle {
    ohlc: ChangeColor;
    bars: IndicatorPolygonStyle[];
    lines: SmoothLineStyle[];
    circles: IndicatorPolygonStyle[];
    lastValueMark: IndicatorLastValueMarkStyle;
    tooltip: IndicatorTooltipStyle;
    [key: string]: any;
}

export declare type IndicatorTemplate<D = any> = ExcludePickPartial<Omit<Indicator<D>, 'result'>, 'name' | 'calc'>;

export declare interface IndicatorTooltipData {
    name: string;
    calcParamsText: string;
    icons: TooltipIconStyle[];
    values: TooltipLegend[];
}

export declare interface IndicatorTooltipStyle extends TooltipStyle, Offset {
    showName: boolean;
    showParams: boolean;
}

/**
 * Init chart instance
 * @param ds
 * @param options
 * @returns {Chart}
 */
export declare function init(ds: HTMLElement | string, options?: Options): Nullable<Chart>;

export declare function isArray<T = any>(value: any): value is T[];

export declare function isBoolean(value: any): value is boolean;

export declare function isFunction<T = (...args: any) => any>(value: any): value is T;

export declare function isNumber(value: any): value is number;

export declare function isObject(value: any): value is object;

export declare function isString(value: any): value is string;

export declare function isValid<T>(value: T | null | undefined): value is T;

export declare type LastValueMarkTextStyle = Omit<StateTextStyle, 'backgroundColor'>;

export declare interface LayoutChild {
    type: LayoutChildType;
    content?: Array<string | IndicatorCreate>;
    options?: PaneOptions;
}

export declare const enum LayoutChildType {
    Candle = "candle",
    Indicator = "indicator",
    XAxis = "xAxis"
}

export declare interface LineAttrs {
    coordinates: Coordinate[];
}

export declare interface LineStyle {
    style: LineType;
    size: number;
    color: string;
    dashedValue: number[];
}

/**
 * line type
 */
export declare enum LineType {
    Dashed = "dashed",
    Solid = "solid"
}

export declare type LoadDataCallback = (params: LoadDataParams) => void;

export declare interface LoadDataParams {
    type: LoadDataType;
    data: Nullable<TViewData>;
    callback: (dataList: TViewData[], more?: boolean) => void;
}

export declare enum LoadDataType {
    Init = "init",
    Forward = "forward",
    Backward = "backward"
}

/**
 * Since v9.8.0 deprecated, since v10 removed
 * @deprecated
 */
export declare type LoadMoreCallback = (timestamp: Nullable<number>) => void;

export declare interface Locales {
    time: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    change: string;
    turnover: string;
    [key: string]: string;
}

export declare interface Margin {
    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare function merge(target: any, source: any): void;

export declare interface MouseTouchEvent extends Coordinate {
    pageX: number;
    pageY: number;
    isTouch?: boolean;
    preventDefault?: () => void;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare type Nullable<T> = T | null;

export declare interface Offset {
    offsetLeft: number;
    offsetTop: number;
    offsetRight: number;
    offsetBottom: number;
}

export declare interface Options {
    layout?: LayoutChild[];
    locale?: string;
    yScrolling?: boolean;
    timezone?: string;
    styles?: string | DeepPartial<Styles>;
    customApi?: Partial<CustomApi>;
    thousandsSeparator?: string;
    decimalFoldThreshold?: number;
}

export declare interface Overlay {
    /**
     * Unique identification
     */
    id: string;
    /**
     * Group id
     */
    groupId: string;
    /**
     * Pane id
     */
    paneId: string;
    /**
     * Name
     */
    name: string;
    /**
     * Total number of steps required to complete mouse operation
     */
    totalStep: number;
    /**
     * Current step
     */
    currentStep: number;
    /**
     * Whether it is locked. When it is true, it will not respond to events
     */
    lock: boolean;
    /**
     * Whether the overlay is visible
     */
    visible: boolean;
    /**
     * Draw level
     */
    zLevel: number;
    /**
     * Whether the default figure corresponding to the point is required
     */
    needDefaultPointFigure: boolean;
    /**
     * Whether the default figure on the Y axis is required
     */
    needDefaultXAxisFigure: boolean;
    /**
     * Whether the default figure on the X axis is required
     */
    needDefaultYAxisFigure: boolean;
    /**
     * Mode
     */
    mode: OverlayMode;
    /**
     * When mode is weak_magnet is the response distance
     */
    modeSensitivity: number;
    /**
     * Time and value information
     */
    points: Array<Partial<Point>>;
    /**
     * Extended Data
     */
    extendData: any;
    /**
     * The style information and format are consistent with the overlay in the unified configuration
     */
    styles: Nullable<DeepPartial<OverlayStyle>>;
    /**
     * Create figures corresponding to points
     */
    createPointFigures: Nullable<OverlayCreateFiguresCallback>;
    /**
     * Create figures on the Y axis
     */
    createXAxisFigures: Nullable<OverlayCreateFiguresCallback>;
    /**
     * Create figures on the X axis
     */
    createYAxisFigures: Nullable<OverlayCreateFiguresCallback>;
    /**
     * Special handling callbacks when pressing events
     */
    performEventPressedMove: Nullable<(params: OverlayPerformEventParams) => void>;
    /**
     * In drawing, special handling callback when moving events
     */
    performEventMoveForDrawing: Nullable<(params: OverlayPerformEventParams) => void>;
    /**
     * Start drawing event
     */
    onDrawStart: Nullable<OverlayEventCallback>;
    /**
     * In drawing event
     */
    onDrawing: Nullable<OverlayEventCallback>;
    /**
     * Draw End Event
     */
    onDrawEnd: Nullable<OverlayEventCallback>;
    /**
     * Click event
     */
    onClick: Nullable<OverlayEventCallback>;
    /**
     * Double Click event
     */
    onDoubleClick: Nullable<OverlayEventCallback>;
    /**
     * Right click event
     */
    onRightClick: Nullable<OverlayEventCallback>;
    /**
     * Pressed move start event
     */
    onPressedMoveStart: Nullable<OverlayEventCallback>;
    /**
     * Pressed moving event
     */
    onPressedMoving: Nullable<OverlayEventCallback>;
    /**
     * Pressed move end event
     */
    onPressedMoveEnd: Nullable<OverlayEventCallback>;
    /**
     * Mouse enter event
     */
    onMouseEnter: Nullable<OverlayEventCallback>;
    /**
     * Mouse leave event
     */
    onMouseLeave: Nullable<OverlayEventCallback>;
    /**
     * Removed event
     */
    onRemoved: Nullable<OverlayEventCallback>;
    /**
     * Selected event
     */
    onSelected: Nullable<OverlayEventCallback>;
    /**
     * Deselected event
     */
    onDeselected: Nullable<OverlayEventCallback>;
}

export declare type OverlayConstructor = new () => {
    getOverlay: () => Overlay;
};

export declare type OverlayCreate = ExcludePickPartial<Omit<Overlay, 'currentStep' | 'totalStep' | 'createPointFigures' | 'createXAxisFigures' | 'createYAxisFigures' | 'performEventPressedMove' | 'performEventMoveForDrawing'>, 'name'>;

export declare type OverlayCreateFiguresCallback = (params: OverlayCreateFiguresCallbackParams) => OverlayFigure | OverlayFigure[];

export declare interface OverlayCreateFiguresCallbackParams {
    overlay: Overlay;
    coordinates: Coordinate[];
    bounding: Bounding;
    barSpace: BarSpace;
    precision: OverlayPrecision;
    thousandsSeparator: string;
    decimalFoldThreshold: number;
    dateTimeFormat: Intl.DateTimeFormat;
    defaultStyles: OverlayStyle;
    xAxis: Nullable<XAxis>;
    yAxis: Nullable<YAxis>;
}

export declare interface OverlayEvent extends Partial<MouseTouchEvent> {
    figureKey?: string;
    figureIndex?: number;
    overlay: Overlay;
}

export declare type OverlayEventCallback = (event: OverlayEvent) => boolean;

export declare interface OverlayFigure {
    key?: string;
    type: string;
    attrs: any;
    styles?: any;
    ignoreEvent?: boolean | OverlayFigureIgnoreEventType[];
}

export declare type OverlayFigureIgnoreEventType = 'mouseClickEvent' | 'mouseRightClickEvent' | 'tapEvent' | 'doubleTapEvent' | 'mouseDownEvent' | 'touchStartEvent' | 'mouseMoveEvent' | 'touchMoveEvent' | 'mouseDoubleClickEvent';

export declare enum OverlayMode {
    Normal = "normal",
    WeakMagnet = "weak_magnet",
    StrongMagnet = "strong_magnet"
}

export declare interface OverlayPerformEventParams {
    currentStep: number;
    mode: OverlayMode;
    points: Array<Partial<Point>>;
    performPointIndex: number;
    performPoint: Partial<Point>;
}

export declare interface OverlayPointStyle {
    color: string;
    borderColor: string;
    borderSize: number;
    radius: number;
    activeColor: string;
    activeBorderColor: string;
    activeBorderSize: number;
    activeRadius: number;
}

export declare interface OverlayPrecision extends Precision {
    max: number;
    min: number;
    excludePriceVolumeMax: number;
    excludePriceVolumeMin: number;
    [key: string]: number;
}

export declare type OverlayRemove = Partial<Pick<Overlay, 'id' | 'groupId' | 'name'>>;

export declare interface OverlayStyle {
    point: OverlayPointStyle;
    line: SmoothLineStyle;
    rect: RectStyle;
    polygon: PolygonStyle;
    circle: PolygonStyle;
    arc: LineStyle;
    text: TextStyle;
    /**
     * @deprecated
     * Starting from v10, it will be deleted
     */
    rectText: TextStyle;
    [key: string]: any;
}

export declare type OverlayTemplate = ExcludePickPartial<Omit<Overlay, 'id' | 'groupId' | 'paneId' | 'points' | 'currentStep'>, 'name'>;

export declare interface Padding {
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
}

export declare interface PaneAxisOptions {
    name?: string;
    scrollZoomEnabled?: boolean;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface PaneGap {
    top?: number;
    bottom?: number;
}

export declare interface PaneOptions {
    id?: string;
    height?: number;
    minHeight?: number;
    dragEnabled?: boolean;
    position?: PanePosition;
    gap?: PaneGap;
    axisOptions?: PaneAxisOptions;
}

export declare const enum PanePosition {
    Top = "top",
    Bottom = "bottom"
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare type PickRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface Point {
    dataIndex: number;
    timestamp: number;
    value: number;
}

export declare interface PolygonAttrs {
    coordinates: Coordinate[];
}

export declare interface PolygonStyle {
    style: PolygonType;
    color: string | CanvasGradient;
    borderColor: string;
    borderSize: number;
    borderStyle: LineType;
    borderDashedValue: number[];
}

export declare enum PolygonType {
    Stroke = "stroke",
    Fill = "fill",
    StrokeFill = "stroke_fill"
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface Precision {
    price: number;
    volume: number;
}

export declare interface RectAttrs {
    x: number;
    y: number;
    width: number;
    height: number;
}

export declare interface RectStyle extends PolygonStyle {
    borderRadius: number;
}

export declare function registerFigure<A = any, S = any>(figure: FigureTemplate<A, S>): void;

export declare function registerIndicator<D>(indicator: IndicatorTemplate<D>): void;

export declare function registerLocale(locale: string, ls: Locales): void;

export declare function registerOverlay(template: OverlayTemplate): void;

export declare function registerStyles(name: string, ss: DeepPartial<Styles>): void;

export declare function registerXAxis(axis: AxisTemplate): void;

export declare function registerYAxis(axis: AxisTemplate): void;

export declare interface SeparatorStyle {
    size: number;
    color: string;
    fill: boolean;
    activeBackgroundColor: string;
}

export declare interface SmoothLineStyle extends LineStyle {
    smooth: boolean | number;
}

export declare interface StateLineStyle extends LineStyle {
    show: boolean;
}

export declare interface StateTextStyle extends TextStyle {
    show: boolean;
}

export declare interface Styles {
    grid: GridStyle;
    candle: CandleStyle;
    indicator: IndicatorStyle;
    xAxis: XAxisStyle;
    yAxis: YAxisStyle;
    separator: SeparatorStyle;
    crosshair: CrosshairStyle;
    overlay: OverlayStyle;
}

export declare interface TextAttrs {
    x: number;
    y: number;
    text: string;
    width?: number;
    height?: number;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
}

export declare interface TextStyle extends Padding {
    style: PolygonType;
    color: string;
    size: number;
    family: string;
    weight: number | string;
    borderStyle: LineType;
    borderDashedValue: number[];
    borderSize: number;
    borderColor: string;
    borderRadius: number;
    backgroundColor: string | CanvasGradient;
}

export declare enum TooltipIconPosition {
    Left = "left",
    Middle = "middle",
    Right = "right"
}

export declare interface TooltipIconStyle extends Padding, Margin {
    id: string;
    position: TooltipIconPosition;
    color: string;
    activeColor: string;
    size: number;
    fontFamily: string;
    icon: string;
    backgroundColor: string;
    activeBackgroundColor: string;
}

export declare interface TooltipLegend {
    title: string | TooltipLegendChild;
    value: string | TooltipLegendChild;
}

export declare interface TooltipLegendChild {
    text: string;
    color: string;
}

export declare enum TooltipShowRule {
    Always = "always",
    FollowCross = "follow_cross",
    None = "none"
}

export declare enum TooltipShowType {
    Standard = "standard",
    Rect = "rect"
}

export declare interface TooltipStyle {
    showRule: TooltipShowRule;
    showType: TooltipShowType;
    defaultValue: string;
    text: TooltipTextStyle;
    icons: TooltipIconStyle[];
}

export declare type TooltipTextStyle = Pick<TextStyle, 'color' | 'size' | 'family' | 'weight'> & Margin;

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface TViewData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
    turnover?: number;
    [key: string]: any;
}

export declare const utils: {
    clone: typeof clone;
    merge: typeof merge;
    isString: typeof isString;
    isNumber: typeof isNumber;
    isValid: typeof isValid;
    isObject: typeof isObject;
    isArray: typeof isArray;
    isFunction: typeof isFunction;
    isBoolean: typeof isBoolean;
    formatValue: typeof formatValue;
    formatPrecision: typeof formatPrecision;
    formatBigNumber: typeof formatBigNumber;
    formatDate: typeof formatDate;
    formatThousands: typeof formatThousands;
    formatFoldDecimal: typeof formatFoldDecimal;
    calcTextWidth: typeof calcTextWidth;
    getLinearSlopeIntercept: typeof getLinearSlopeIntercept;
    getLinearYFromSlopeIntercept: typeof getLinearYFromSlopeIntercept;
    getLinearYFromCoordinates: typeof getLinearYFromCoordinates;
    checkCoordinateOnArc: typeof checkCoordinateOnArc;
    checkCoordinateOnCircle: typeof checkCoordinateOnCircle;
    checkCoordinateOnLine: typeof checkCoordinateOnLine;
    checkCoordinateOnPolygon: typeof checkCoordinateOnPolygon;
    checkCoordinateOnRect: typeof checkCoordinateOnRect;
    checkCoordinateOnText: typeof checkCoordinateOnText;
    drawArc: typeof drawArc;
    drawCircle: typeof drawCircle;
    drawLine: typeof drawLine;
    drawPolygon: typeof drawPolygon;
    drawRect: typeof drawRect;
    drawText: typeof drawText;
    drawRectText: typeof drawText;
};

/**
 * Chart version
 * @return {string}
 */
export declare function version(): string;

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface VisibleRange {
    readonly from: number;
    readonly to: number;
    readonly realFrom: number;
    readonly realTo: number;
}

export declare type XAxis = Axis;

export declare type XAxisStyle = AxisStyle;

export declare interface YAxis extends Axis {
    isFromZero: () => boolean;
    isInCandle: () => boolean;
}

export declare enum YAxisPosition {
    Left = "left",
    Right = "right"
}

export declare interface YAxisStyle extends AxisStyle {
    type: YAxisType;
    position: YAxisPosition;
    inside: boolean;
    reverse: boolean;
}

export declare enum YAxisType {
    Normal = "normal",
    Percentage = "percentage",
    Log = "log"
}

export { }
