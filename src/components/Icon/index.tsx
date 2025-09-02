import * as Icons from '@assets/icons';
import {SvgProps} from 'react-native-svg';

declare global {
  type IconName = keyof typeof Icons;
}

interface Props extends SvgProps {
  name: IconName;
}

export const Icon = ({name, ...rest}: Props) => {
  const IconComponent = Icons[name];
  return <IconComponent {...rest} />;
};
