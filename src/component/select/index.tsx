 
import { createSignal, Component, JSX } from 'solid-js'

export interface SelectDataSourceItem {
  key: string
  text: JSX.Element
}

export interface SelectProps {
  class?: string
  style?: JSX.CSSProperties | string
  value?: JSX.Element
  valueKey?: string
  dataSource?: SelectDataSourceItem[] | string[]
  onSelected?: (data: SelectDataSourceItem | string) => void
}

const Select: Component<SelectProps> = props => {
  const [open, setOpen] = createSignal(false)

  return (
    <div
      style={props.style}
      class={`klinecharts-pro-select ${props.class ?? ''} ${open() ? 'klinecharts-pro-select-show' : ''}`}
      tabIndex="0"
      onClick={_ => { setOpen(o => !o) }}
      onBlur={_ => { setOpen(false) }}>
      <div
        class="selector-container">
        <span class="value">{props.value}</span>
        <i class="arrow"/>
      </div>
      {
        (props.dataSource && props.dataSource.length > 0) &&
        <div
          class="drop-down-container">
          <ul>
            {
              props.dataSource.map(data => {
                const d = data as SelectDataSourceItem
                // @ts-expect-error
                const v = d[props.valueKey ?? 'text'] ?? data
                return (
                  <li
                    onClick={e => {
                      e.stopPropagation()
                      if (props.value !== v) {
                        props.onSelected?.(data)
                      }
                      setOpen(false)
                    }}>
                    {v}
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Select
