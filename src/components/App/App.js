import React from 'react';
import Container from '../Container/Container';
import styles from './App.css';

class App extends React.Component {
  render() {
      return(
        <div className={styles.container}>
          <Container/>
        </div>
      );
  }
}

export default App;
