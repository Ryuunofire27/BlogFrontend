import React, { PureComponent } from 'react';
import { CardsContent } from '../cards-content/CardsContent';
import { AppContext } from '../../AppContext';
export const Home = () => {
  return (
    <AppContext.Consumer>
      {app => <CardsContent app={app}/>}
    </AppContext.Consumer>
  );
};