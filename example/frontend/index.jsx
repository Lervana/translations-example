// // /* eslint-disable no-process-env */
import React                 from 'react';
import ReactDOM              from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { I18nextProvider }   from 'react-i18next';
import ExampleComponent      from './component';
import i18n                  from './i18n';

const content = (
  <I18nextProvider i18n={i18n}>
    <HashRouter>
      <Route exact path="/" component={ExampleComponent} />
    </HashRouter>
  </I18nextProvider>
);

ReactDOM.render(content, document.getElementById('root'));
