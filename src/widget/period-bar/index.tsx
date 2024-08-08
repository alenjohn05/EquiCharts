 
import { Component, Show, createSignal, onMount, onCleanup, createEffect } from 'solid-js'

import { SymbolInfo, Period } from '../../types'


import i18n from '../../i18n'
import Tooltip from '../../component/hoverTooltip'
import { List } from '../../component'
import { Icon, getCandleOptions } from './candle_icons'
import { DeepPartial, Styles } from  'equicharts'
import { getOptions } from '../setting-modal/data'

export interface PeriodBarProps {
  locale: string
  spread: boolean
  symbol: SymbolInfo
  period: Period
  periods: Period[],
  currentCandleType: string
  onMenuClick: () => void
  onSymbolClick: () => void
  onPeriodChange: (period: Period) => void
  onIndicatorClick: () => void
  onTimezoneClick: () => void
  onSettingClick: () => void
  onScreenshotClick: () => void
  onCandleTypeChange: (style: DeepPartial<Styles>, type: string) => void
}

const PeriodBar: Component<PeriodBarProps> = props => {
  let ref: Node
  const [selectedCandleType, setselectedCandleType] = createSignal<string>('candle_solid')
  const [options, setOptions] = createSignal(getOptions(props.locale))
  const [popoverKey, setPopoverKey] = createSignal('')

  const [fullScreen, setFullScreen] = createSignal(false)

  const fullScreenChange = () => {
    setFullScreen(full => !full)
  }

  onMount(() => {
    document.addEventListener('fullscreenchange', fullScreenChange)
    document.addEventListener('mozfullscreenchange', fullScreenChange)
    document.addEventListener('webkitfullscreenchange', fullScreenChange)
    document.addEventListener('msfullscreenchange', fullScreenChange)
  })

  onCleanup(() => {
    document.removeEventListener('fullscreenchange', fullScreenChange)
    document.removeEventListener('mozfullscreenchange', fullScreenChange)
    document.removeEventListener('webkitfullscreenchange', fullScreenChange)
    document.removeEventListener('msfullscreenchange', fullScreenChange)
  })

  createEffect(() => {
    setselectedCandleType(props.currentCandleType)
  });

  const getIconForSelectedCandleType = (type: string) => {
    return <Icon name={type} />
  }

  return (
    <div
      ref={el => { ref = el }}
      class="klinecharts-pro-period-bar-main">
      <div class='klinecharts-pro-period-bar'>

        <div class='menu-container'>
          <svg class={props.spread ? '' : 'rotate'} width="10px" height="10px" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" onClick={props.onMenuClick}>
            <path d="m13.279,18.342l-.707-.707,5.281-5.281c.095-.095.146-.22.146-.354s-.052-.259-.146-.354l-5.281-5.281.707-.707,5.281,5.281c.283.283.439.66.439,1.061s-.156.777-.439,1.061l-5.281,5.281Zm-1.475-5.871c.26-.26.26-.683,0-.942l-5.871-5.871-.707.707,5.635,5.635-5.635,5.635.707.707,5.871-5.871Z" />
          </svg>
        </div>
        <Show when={props.symbol}>
          <div
            class="symbol"
            onClick={props.onSymbolClick}>
            <Show when={props.symbol.logo}>
              <img alt="symbol" src={props.symbol.logo} />
            </Show>
            <span>{props.symbol.shortName ?? props.symbol.name ?? props.symbol.ticker}</span>
          </div>
        </Show>
        <div class='chart-list' tabIndex={0} onBlur={() => { setPopoverKey('') }}>
          <div
            class='item tools'
            onClick={() => setPopoverKey("candle_select")}>
            {getIconForSelectedCandleType(selectedCandleType())}
          </div>
          {
            popoverKey() === "candle_select" && <List class="list">
              {
                getCandleOptions(props.locale).map(data => (
                  <li
                    class={`${selectedCandleType() === data.key ? "selected" : ""}`}
                    onClick={() => {
                      props.onCandleTypeChange({
                        candle: {
                          type: data.type
                        },
                      }, data.key)
                      setPopoverKey('')
                    }}>
                    <Icon name={data.key} />
                    <span style="padding-left:8px">{data.text}</span>
                  </li>
                ))
              }
            </List>
          }

        </div>
        {
          props.periods.map(p => (
            <span
              class={`item period ${p.text === props.period.text ? 'selected' : ''}`}
              onClick={() => { props.onPeriodChange(p) }}>
              {p.text}
            </span>
          ))
        }
        <div
          class='item tools'
          onClick={props.onIndicatorClick}>
          <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
            <path d="m24,23v1H2.5c-1.378,0-2.5-1.122-2.5-2.5V.024h1v21.476c0,.827.673,1.5,1.5,1.5h21.5Zm-18-2.976v-8h-1v8h1Zm4,0h1v-10h-1v10Zm5,0h1v-7h-1v7Zm6,0v-11.024h-1v11.024h1ZM10,3.707l5,5L22.854.854l-.707-.707-7.146,7.146-5-5-5.854,5.854.707.707,5.146-5.146Z" />
          </svg>

          <span style={{ "font-size": "13px", "padding-left": "3px" }}>{i18n('Indicators', props.locale)}</span>
        </div>
      </div>
      <div class='klinecharts-pro-period-bar-setting'>
        <Tooltip top_length={32} text={i18n('Recent Updates', props.locale)}>
          <div
            class='item tools'
            onClick={props.onSettingClick}>
            <svg viewBox="0 0 24 24" fill='#FCB900'>
              <path d="m19,15.5c0,1.378-1.122,2.5-2.5,2.5s-2.5-1.122-2.5-2.5,1.122-2.5,2.5-2.5,2.5,1.122,2.5,2.5Zm5-6.55v15H0v-15c0-1.488,1.091-2.717,2.514-2.951L20.687,0l.627,1.899-12.27,4.05h11.956c1.654,0,3,1.346,3,3Zm-15,9.05h-5v2h5v-2Zm0-4h-5v2h5v-2Zm0-4h-5v2h5v-2Zm12,5.5c0-2.481-2.019-4.5-4.5-4.5s-4.5,2.019-4.5,4.5,2.019,4.5,4.5,4.5,4.5-2.019,4.5-4.5Z" />
            </svg>
          </div>
        </Tooltip>
        <Tooltip top_length={32} text={i18n('Settings', props.locale)}>
          <div
            class='item tools'
            onClick={props.onSettingClick}>
            <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12.51,6.9l.98,.2-2,10-.98-.2,2-10Zm-3.18,2.66l-.71-.71-2.19,2.19c-.58,.58-.58,1.52,0,2.1l2.16,2.16,.71-.71-2.16-2.16c-.19-.19-.19-.5,0-.69l2.19-2.19Zm6.07-.75l-.71,.71,2.18,2.18c.19,.19,.19,.5,0,.69l-2.18,2.18,.71,.71,2.18-2.18c.58-.58,.58-1.52,0-2.1l-2.18-2.18Zm5.39,5.09l3,1.85-3.15,5.11-3-1.85c-.8,.65-1.68,1.14-2.64,1.48v3.51h-6v-3.51c-.95-.34-1.84-.83-2.64-1.48l-3,1.85L.21,15.75l3-1.85c-.14-.64-.21-1.28-.21-1.9s.07-1.26,.21-1.9L.21,8.25,3.36,3.14l3,1.85c.8-.65,1.68-1.14,2.64-1.48V0h6V3.51c.95,.34,1.84,.83,2.64,1.48l3-1.85,3.15,5.11-3,1.85c.14,.64,.21,1.28,.21,1.9s-.07,1.26-.21,1.9Zm-1.15,.47l.09-.36c.18-.68,.27-1.35,.27-2.01s-.09-1.33-.27-2.01l-.09-.36,2.77-1.71-2.1-3.4-2.77,1.71-.28-.24c-.86-.75-1.84-1.3-2.91-1.63l-.35-.11V1h-4v3.24l-.35,.11c-1.07,.33-2.05,.88-2.91,1.63l-.28,.24-2.77-1.71L1.59,7.92l2.77,1.71-.09,.36c-.18,.68-.27,1.35-.27,2.01s.09,1.33,.27,2.01l.09,.36-2.77,1.71,2.1,3.4,2.77-1.71,.28,.24c.86,.75,1.84,1.3,2.91,1.63l.35,.11v3.24h4v-3.24l.35-.11c1.07-.33,2.05-.88,2.91-1.63l.28-.24,2.77,1.71,2.1-3.4-2.77-1.71Z" /></svg>

          </div>
        </Tooltip>
        <Tooltip top_length={32} text={'Take a Screenshot'}>
          <div
            class='item tools'
            onClick={props.onScreenshotClick}>
            <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="m12,9c-1.654,0-3,1.346-3,3s1.346,3,3,3,3-1.346,3-3-1.346-3-3-3Zm0,5c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2ZM7.5,6c-1.379,0-2.5,1.121-2.5,2.5v7c0,1.379,1.121,2.5,2.5,2.5h9c1.379,0,2.5-1.121,2.5-2.5v-7c0-1.379-1.121-2.5-2.5-2.5h-1.227l-.843-1.311c-.277-.432-.748-.689-1.262-.689h-2.338c-.514,0-.984.258-1.262.688l-.843,1.312h-1.227Zm10.5,2.5v7c0,.827-.673,1.5-1.5,1.5H7.5c-.827,0-1.5-.673-1.5-1.5v-7c0-.827.673-1.5,1.5-1.5h9c.827,0,1.5.673,1.5,1.5Zm-7.589-3.271c.092-.143.249-.229.42-.229h2.338c.171,0,.328.086.42.229l.495.771h-4.168l.495-.771Zm-2.411,18.271c0,.276-.224.5-.5.5h-3c-2.481,0-4.5-2.019-4.5-4.5v-3c0-.276.224-.5.5-.5s.5.224.5.5v3c0,1.93,1.57,3.5,3.5,3.5h3c.276,0,.5.224.5.5Zm16-7v3c0,2.481-2.019,4.5-4.5,4.5h-3c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h3c1.93,0,3.5-1.57,3.5-3.5v-3c0-.276.224-.5.5-.5s.5.224.5.5Zm0-12v3c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-1.93-1.57-3.5-3.5-3.5h-3c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h3c2.481,0,4.5,2.019,4.5,4.5ZM0,7.5v-3C0,2.019,2.019,0,4.5,0h3c.276,0,.5.224.5.5s-.224.5-.5.5h-3c-1.93,0-3.5,1.57-3.5,3.5v3c0,.276-.224.5-.5.5s-.5-.224-.5-.5Z" />
            </svg>
          </div>
        </Tooltip>
        <div
          class='item tools'
          onClick={() => {
            if (!fullScreen()) {
              const el = ref?.parentElement
              if (el) {
                // @ts-expect-error
                const enterFullScreen = el.requestFullscreen ?? el.webkitRequestFullscreen ?? el.mozRequestFullScreen ?? el.msRequestFullscreen
                enterFullScreen.call(el)
                // setFullScreen(true)
              }
            } else {
              // @ts-expect-error
              const exitFullscreen = document.exitFullscreen ?? document.msExitFullscreen ?? document.mozCancelFullScreen ?? document.webkitExitFullscreen
              exitFullscreen.call(document)
              // setFullScreen(false)
            }
          }}>
          {
            fullScreen() ? (
              <>
                <svg viewBox="0 0 20 20">
                  <path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z" />
                </svg>
                {/* <span>{i18n('exit_full_screen', props.locale)}</span> */}
              </>

            ) : (
              <>
                <svg viewBox="0 0 20 20">
                  <path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z" />
                </svg>
                {/* <span>{i18n('full_screen', props.locale)}</span> */}
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default PeriodBar
