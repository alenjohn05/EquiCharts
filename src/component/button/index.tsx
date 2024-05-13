import { ParentComponent, ParentProps, JSX } from 'solid-js';

export type ButtonType = 'confirm' | 'cancel';

export interface ButtonProps extends ParentProps {
  class?: string;
  style?: JSX.CSSProperties | string;
  type?: ButtonType;
  onClick?: () => void;
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      style={props.style}
      class={`equicharts-button ${props.type ?? 'confirm'} ${props.class ?? ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
