import { IconProp } from '../types';
import SVG from 'react-inlinesvg';
function IconsComponent({name, className}:IconProp) {
  return <SVG src={name} className={className} />
}

export default IconsComponent