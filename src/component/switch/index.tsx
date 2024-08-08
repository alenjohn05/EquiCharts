 
import { Component, JSX } from 'solid-js'

export interface SwitchProps {
  class?: string
  style?: JSX.CSSProperties | string
  open: boolean
  onChange: () => void
}

const Switch: Component<SwitchProps> = props => {
  return (
    <div
      style={props.style}
      class={`klinecharts-pro-switch ${props.open ? 'turn-on' : 'turn-off'} ${props.class ?? ''}`}
      onClick={_ => {
        props.onChange && props.onChange()
      }}>
      <i
        class="thumb"/>
    </div>
  )
}

export default Switch
