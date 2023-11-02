type Props = {
  name: string;
  style?: Record<string, string>;
}

const Icon = (props: Props) => {
  return <>
    <svg className={`icon h-24 w-24`} style={props.style} aria-hidden={true}>
      <use xlinkHref={`#icon-${props.name}`} />
    </svg>
  </>
}

export default Icon