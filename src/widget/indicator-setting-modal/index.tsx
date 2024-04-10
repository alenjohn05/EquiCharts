import { Component, createSignal } from 'solid-js';

import { utils } from '../../../core/dist';

import { Modal, Input } from '../../component';

import i18n from '../../i18n';

import data from './data';

export interface IndicatorSettingModalProps {
  locale: string;
  params: { indicatorName: string; paneId: string; calcParams: any[] };
  onClose: () => void;
  onConfirm: (calcParams: any) => void;
}

const IndicatorSettingModal: Component<IndicatorSettingModalProps> = (
  props,
) => {
  const [calcParams, setCalcParams] = createSignal(
    utils.clone(props.params.calcParams),
  );

  const getConfig: (name: string) => any[] = (name: string) => {
    // @ts-expect-error
    return data[name];
  };

  return (
    <Modal
      title={props.params.indicatorName}
      width={360}
      buttons={[
        {
          type: 'confirm',
          children: i18n('confirm', props.locale),
          onClick: () => {
            const config = getConfig(props.params.indicatorName);
            const params: any[] = [];
            utils.clone(calcParams()).forEach((param: any, i: number) => {
              if (!utils.isValid(param) || param === '') {
                if ('default' in config[i]) {
                  params.push(config[i]['default']);
                }
              } else {
                params.push(param);
              }
            });
            props.onConfirm(params);
            props.onClose();
          },
        },
      ]}
      onClose={props.onClose}
    >
      <div class="equicharts-indicator-setting-modal-content">
        {getConfig(props.params.indicatorName).map((d, i) => {
          return (
            <>
              <span>{i18n(d.paramNameKey, props.locale)}</span>
              <Input
                style={{ width: '200px' }}
                value={calcParams()[i] ?? ''}
                precision={d.precision}
                min={d.min}
                onChange={(value) => {
                  const params = utils.clone(calcParams());
                  params[i] = value;
                  setCalcParams(params);
                }}
              />
            </>
          );
        })}
      </div>
    </Modal>
  );
};

export default IndicatorSettingModal;
