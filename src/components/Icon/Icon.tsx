import type { CSSProperties } from 'react'

type Props = {
  name: string;
}

const style: CSSProperties = {
  width: 24,
  height: 24,
}

const Icon = (props: Props) => {
  return <>
    <svg className={'icon'} style={style} aria-hidden={true}>
      <use xlinkHref={`#icon-${props.name}`} />
    </svg>
  </>
}

export default Icon