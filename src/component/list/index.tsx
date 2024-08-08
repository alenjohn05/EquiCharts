 
import { ParentComponent, ParentProps, JSX, Show } from 'solid-js'

import Loading from '../loading'
import Empty from '../empty'

export interface ListProps extends ParentProps {
  class?: string
  style?: JSX.CSSProperties | string
  loading?: boolean
  dataSource?: any[]
  renderItem?: (data: any) => JSX.Element
}

const List: ParentComponent<ListProps> = props => {
  return (
    <ul
      style={props.style}
      class={`klinecharts-pro-list ${props.class ?? ''}`}>
      <Show when={props.loading}>
        <Loading/>
      </Show>
      <Show when={!props.loading && !props.children && !props.dataSource?.length}>
        <Empty/>
      </Show>
      <Show
        when={props.children}>
        {props.children}
      </Show>
      <Show
        when={!props.children}>
        {
          props.dataSource?.map(data => (
            props.renderItem?.(data) ?? <li></li>
          ))
        }
      </Show>
    </ul>
  )
}

export default List
