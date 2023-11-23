type Props = {
  name: string;
  style?: Record<string, string>;
}

const Icon = (props: Props) => {
  return <>
    <svg className={`icon h-20 w-20`} style={props.style} aria-hidden={true}>
      <use xlinkHref={`#icon-${props.name}`} style={{ fill: "black" }} />
    </svg>
  </>
}

export default Icon