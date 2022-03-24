import React from 'react';
import Portfolio from './components/Portfolio';

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Portfolio />
    );
  }
}

export default App;
