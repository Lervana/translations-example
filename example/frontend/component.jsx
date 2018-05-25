import React, { Component } from 'react';
import { translate }        from 'react-i18next';
import Cookies              from 'universal-cookie';
import i18n                 from 'i18next';

import './component.scss';

const cookies = new Cookies();

@translate(['translation'])
export default class Example extends Component {
  setLang = (code)=> {
    cookies.set('translations-example', code);
    i18n.changeLanguage(code);
    console.log('Language set to ' + code);
  };

  render() {
    const { t } = this.props;

    return (
      <div className="example-wrapper">
        <div className="example">
          <div className="example-title">
            {t('internationalization')}
          </div>
          <div className="section">
            <div className="section-title">
              {t('languages')}
            </div>
            <div className="buttons">
              <button onClick={()=> this.setLang('pl-PL')}>{t('polish')}</button>
              <button onClick={()=> this.setLang('en-GB')}>{t('english')}</button>
            </div>
          </div>
          <div className="section">
            <div className="section-title">
              {t('Example')}
            </div>
            <div className="text">
              {t('Hello')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
