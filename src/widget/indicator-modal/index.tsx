import { Component, createMemo } from 'solid-js';

import { Modal, List, Checkbox } from '../../component';

import i18n from '../../i18n';

type OnIndicatorChange = (params: {
  name: string;
  paneId: string;
  added: boolean;
}) => void;

export interface IndicatorModalProps {
  locale: string;
  mainIndicators: string[];
  subIndicators: object;
  onMainIndicatorChange: OnIndicatorChange;
  onSubIndicatorChange: OnIndicatorChange;
  onClose: () => void;
}

const IndicatorModal: Component<IndicatorModalProps> = (props) => {
  return (
    <Modal
      title={i18n('indicator', props.locale)}
      width={400}
      onClose={props.onClose}
    >
      <List class="equicharts-indicator-modal-list">
        <li class="title">{i18n('main_indicator', props.locale)}</li>
        {['MA', 'EMA', 'SMA', 'BOLL', 'SAR', 'BBI', 'candle_volume'].map(
          (name) => {
            const checked = props.mainIndicators.includes(name);
            return (
              <li
                class="row"
                onClick={(_) => {
                  props.onMainIndicatorChange({
                    name,
                    paneId: 'candle_pane',
                    added: !checked,
                  });
                }}
              >
                <Checkbox
                  checked={checked}
                  label={i18n(name.toLowerCase(), props.locale)}
                />
              </li>
            );
          },
        )}
        <li class="title">{i18n('sub_indicator', props.locale)}</li>
        {[
          'MA',
          'EMA',
          'VOL',
          'MACD',
          'BOLL',
          'KDJ',
          'RSI',
          'BIAS',
          'BRAR',
          'CCI',
          'DMI',
          'CR',
          'PSY',
          'DMA',
          'TRIX',
          'OBV',
          'VR',
          'WR',
          'MTM',
          'EMV',
          'SAR',
          'SMA',
          'ROC',
          'PVT',
          'BBI',
          'AO',
        ].map((name) => {
          const checked = name in props.subIndicators;
          return (
            <li
              class="row"
              onClick={(_) => {
                props.onSubIndicatorChange({
                  name,
                  // @ts-expect-error
                  paneId: props.subIndicators[name] ?? '',
                  added: !checked,
                });
              }}
            >
              <Checkbox
                checked={checked}
                label={i18n(name.toLowerCase(), props.locale)}
              />
            </li>
          );
        })}
      </List>
    </Modal>
  );
};

export default IndicatorModal;
