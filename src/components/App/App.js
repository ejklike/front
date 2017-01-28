import React from 'react';
import Container from '../Container/Container';
import styles from './App.css';

class App extends React.Component {
  render() {
      return(
          <div>
            <div className={styles.container}>
                <Container/>
            </div>
          </div>
      );
  }
}

export default App;
