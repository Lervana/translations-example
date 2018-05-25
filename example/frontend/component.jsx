import React, { Component } from 'react';
import { translate }        from 'react-i18next';
import Cookies        from 'universal-cookie';
import i18n                 from 'i18next';

import './component.scss';

const cookies = new Cookies();

@translate(['translation'], { wait: true })
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
          <div className="buttons">
            <button onClick={()=>this.setLang('pl-PL')}>{t('Polish')}</button>
            <button onClick={()=>this.setLang('en-GB')}>{t('English')}</button>
          </div>
          <div className="text">
            {t('Hello')}
          </div>
        </div>
      </div>
    );
  }
}
