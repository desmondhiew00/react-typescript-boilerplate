import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import WebFont from 'webfontloader';
import { RootState } from 'store/types';
import Scrollbars from 'react-custom-scrollbars';
import { requestRevoke } from '@actions/auth.actions';

// import { GlobalStyle } from 'styles/global-styles';
import 'styles/main.scss';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import AuthRoutes from '../Authentication';
import PrivateRoutes from './containers/App';

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,500,600,700', 'sans-serif', 'Source Sans Pro:200,300,400,600,700,900']
  }
});

const AppComponent = (props: Props) => {
  const { isAuthenticated, isRevoking } = props;
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [revoking, setRevoking] = useState(isRevoking);

  useEffect(() => {
    requestRevoke(true)();
  }, []);

  useEffect(() => {
    setAuthenticated(isAuthenticated);
    setRevoking(isRevoking);
  }, [isAuthenticated, isRevoking]);

  if (revoking)
    return (
      <div className="fixed flex w-full h-full justify-center items-center">
        <LoadingOutlined />
      </div>
    );
  return (
    <Scrollbars className="w-full h-full">
      <BrowserRouter>
        <Helmet titleTemplate="%s - React Boilerplate" defaultTitle="React Boilerplate">
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Switch>
          <Route exact path="/404" component={NotFoundPage} />
          {/* Public routes here... */}
          {authenticated ? <PrivateRoutes /> : <AuthRoutes />}

          <Route render={() => <Redirect to={authenticated ? '/' : '/404'} />} />
        </Switch>

        {/* <GlobalStyle /> */}
      </BrowserRouter>
    </Scrollbars>
  );
};

const mapStateToProps = (state: RootState) => ({
  isRevoking: state.auth.isRevoking,
  isAuthenticated: state.auth.isAuthenticated
});

const connector = connect(mapStateToProps, {});
const App = connector(AppComponent);

export { App };
export default App;

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};
