import {NavigationContext} from '@react-navigation/native';
import {PropsWithChildren, useContext, useEffect} from 'react';
import {BackButton, Header} from '../../components';

interface IProps extends PropsWithChildren {
  title?: string;
  headerType?: 'withBackButton' | 'home';
}

export const useHeader = ({title}: IProps) => {
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    navigation?.setOptions({
      header: () => <Header leftSide={<BackButton />} title={title} />,
    });
  }, []);
};
