import { createSignal, JSX } from 'solid-js';

interface TooltipProps {
  text: string;
  top_length: number;
  children: JSX.Element;
}

function Tooltip(props: TooltipProps) {
  let tooltipRef: HTMLDivElement | undefined;
  const [visible, setVisible] = createSignal(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      class="klinecharts-pro-tooltip-main"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {props.children}
      {visible() && (
        <div
          class="tooltip"
          style={{ top: `${props.top_length}px` }}
          ref={tooltipRef}
        >
          {props.text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
