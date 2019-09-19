import React from 'react';
import '../effect/App.css';
import Header from './Header.js';
import KeyListNew from './KeyListNew';
import InNOut from './InNOut.js';
import * as hdac from 'hdacjs-lib';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storage: localStorage.length }
        this.createKeyPairs = this.createKeyPairs.bind(this);
        this.delete = this.delete.bind(this);
    }

    createKeyPairs() {
        var password = document.getElementById('pwd').value;
        document.getElementById('pwd').value = ""
        var keyPairs = hdac.createKeypairs(password);
        
        localStorage.setItem(keyPairs.address,JSON.stringify(keyPairs));        
        this.setState({ storage: localStorage.length });
      }
      delete() {
        this.setState({ storage: localStorage.length });
      }

  render(){
      return  (
          <div>
              <Header createKeyPairs={this.createKeyPairs} />
              <KeyListNew storage={this.state.storage} delete={this.delete}/>
              <InNOut/>
          </div>
      );
  }
}
export default App;
