import React from 'react'

interface IconProps {
    src?: string;
    alt?: string;
    style?: React.CSSProperties;
    onClick?: () => void
  }

const Icon = ({src,alt,style,onClick}:IconProps) => {
  return (
    <img src={src} alt={alt} style={style} onClick={onClick}/>
  )
}

export default Icon
