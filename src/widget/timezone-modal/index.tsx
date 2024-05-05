import { Component, createSignal, createMemo } from 'solid-js';

import { Modal, Select } from '../../component';
import type { SelectDataSourceItem } from '../../component';
import i18n from '../../i18n';

import { createTimezoneSelectOptions } from './data';

export interface TimezoneModalProps {
  locale: string;
  timezone: SelectDataSourceItem;
  onClose: () => void;
  onConfirm: (timezone: SelectDataSourceItem) => void;
}

const TimezoneModal: Component<TimezoneModalProps> = (props) => {
  const [innerTimezone, setInnerTimezone] = createSignal(props.timezone);

  const timezoneOptions = createMemo(() =>
    createTimezoneSelectOptions(props.locale),
  );

  return (
    <Modal
      title={i18n('timezone', props.locale)}
      width={320}
      buttons={[
        {
          children: i18n('confirm', props.locale),
          onClick: () => {
            props.onConfirm(innerTimezone());
            props.onClose();
          },
        },
      ]}
      onClose={props.onClose}
    >
      <Select
        style={{ width: '100%', 'margin-top': '20px' }}
        value={innerTimezone().text}
        onSelected={(tz) => {
          setInnerTimezone(tz as SelectDataSourceItem);
        }}
        dataSource={timezoneOptions()}
      />
    </Modal>
  );
};

export default TimezoneModal;
