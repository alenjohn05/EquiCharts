 
import { Component, createSignal, onCleanup } from 'solid-js';
import { SelectDataSourceItem } from '../select';
import i18n from '../../i18n';
import Tooltip from '../hoverTooltip';

export interface FooterProps {
  locale: string
  timezone: SelectDataSourceItem
  onTimezoneClick: () => void
  onMoveToClick: () => void
}

const Footer: Component<FooterProps> = (props) => {
  const [time, setTime] = createSignal(new Date());
  console.log(props.timezone)
  const updateClock = () => {
    setTime(new Date());
  };
  const interval = setInterval(updateClock, 1000);
  onCleanup(() => clearInterval(interval));
  return (
    <div class='klinecharts-pro-footer-container'>
      <div class='klinecharts-pro-footer-container-start'></div>
      <div class="klinecharts-pro-footer-container-clock">
        {time().toLocaleTimeString()}
      </div>
      <Tooltip top_length={-37} text={i18n('Time Zone', props.locale)}>
        <div onClick={props.onTimezoneClick} class='klinecharts-pro-footer-container-timezone'>{props.timezone.text}</div>
      </Tooltip>
      <Tooltip top_length={-37} text={i18n('Move to a Date', props.locale)}>
        <div onClick={props.onMoveToClick} class='klinecharts-pro-footer-container-moveto' >
          <svg viewBox="0 0 24 24">
            <path d="m2.805,18.562c-1.114-.617-1.805-1.791-1.805-3.062v-7.5h19v8.5c0,.276.224.5.5.5s.5-.224.5-.5V6.5c0-2.481-2.019-4.5-4.5-4.5h-.5V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5H6V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-.5C2.019,2,0,4.019,0,6.5v9c0,1.635.889,3.144,2.32,3.938.077.042.16.062.242.062.176,0,.346-.093.438-.257.134-.242.046-.546-.195-.68Zm1.695-15.562h12c1.93,0,3.5,1.57,3.5,3.5v.5H1v-.5c0-1.93,1.57-3.5,3.5-3.5Zm19.5,20.5c0,.276-.224.5-.5.5s-.5-.224-.5-.5c0-1.637-.994-3.026-2.596-3.627l-5.08-1.905c-.195-.073-.324-.26-.324-.468v-4.893c0-.789-.535-1.471-1.244-1.586-.451-.074-.886.045-1.227.336-.336.286-.529.703-.529,1.143v7.424c0,.42-.235.795-.614.978-.378.182-.818.133-1.147-.128,0,0-1.715-1.368-1.719-1.372-.606-.562-1.553-.529-2.115.073-.565.604-.534,1.557.064,2.118l1.633,1.551c.325.309.107.856-.342.856-.127,0-.249-.048-.341-.135l-1.64-1.548c-1-.937-1.048-2.518-.106-3.524.928-.994,2.481-1.054,3.489-.15.003.003,1.698,1.349,1.698,1.349l.138-.067v-7.424c0-.734.321-1.429.881-1.905.56-.476,1.306-.678,2.035-.562,1.188.194,2.084,1.3,2.084,2.573v4.546l4.756,1.783c2.001.751,3.244,2.5,3.244,4.563Z" />
          </svg>
        </div>
      </Tooltip>
    </div>

  );
};

export default Footer;

