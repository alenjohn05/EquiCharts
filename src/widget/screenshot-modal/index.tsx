import { Component } from 'solid-js';

import { Modal } from '../../component';

import i18n from '../../i18n';

export interface ScreenshotModalProps {
  locale: string;
  url: string;
  onClose: () => void;
}

const ScreenshotModal: Component<ScreenshotModalProps> = (props) => {
  return (
    <Modal
      title={i18n('screenshot', props.locale)}
      width={540}
      buttons={[
        {
          type: 'confirm',
          children: i18n('save', props.locale),
          onClick: () => {
            const a = document.createElement('a');
            a.download = 'screenshot';
            a.href = props.url;
            document.body.appendChild(a);
            a.click();
            a.remove();
          },
        },
      ]}
      onClose={props.onClose}
    >
      <img style="width:500px;margin-top: 20px" src={props.url} />
    </Modal>
  );
};

export default ScreenshotModal;
