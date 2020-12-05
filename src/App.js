import React from 'react';
import './styles.min.css';

import Content from './components/Content'
import LanguageSelector from './components/LanguageSelector';

const App = () => {


  return (
    <div className="App">
      <LanguageSelector></LanguageSelector>
      <Content></Content>
    </div>
  );



}


export default App;