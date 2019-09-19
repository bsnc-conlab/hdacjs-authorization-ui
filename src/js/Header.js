import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import logo from '../img/logo.png';

export default class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          fadeInDown : false
      }
    }
    
    open(effect) {
      this.setState({
        [effect] : true
      });
    }
  
    close(effect) {
      this.setState({
        [effect] : false
      });
    }
    createKeyPairs() {
      this.props.createKeyPairs();
      this.close('fadeInDown');
    }
    cancel() {
      document.getElementById('pwd').value = "" 
      this.close('fadeInDown')
    }

    render(){
        return (
          <div id="header">
            <div id="logo"><a href="javascript:location.reload()"><img src={logo}/></a></div>
            <div id="head-title"><a>HdacJs Test UI</a></div>
            <div id="head-btn"><button id="btn" onClick={() => this.open('fadeInDown')}>create key pairs</button>
            <Modal visible={this.state.fadeInDown} effect="fadeInDown" onClickAway={() => this.close('fadeInDown')} width="450" height="500">
              <div className="Modal">
                  <div id="modal_content"><table id="tb_content">
                    <tr>
                      <th>:: PIN-CODE ::<br></br><br></br>
                      <input type="password" id="pwd" ref="pwd"></input><br></br>
                      <a id="warning">warning) If you create without pin-code,<br></br>This program will display the unencrypted private key.</a>
                      </th>
                    </tr>
                  </table></div>
                  <div>
                    <table id="tb_btn"><tr><th><button id="modal_btn" onClick={this.cancel.bind(this)}>Cancel</button></th><th><button onClick={this.createKeyPairs.bind(this)} id="create" ref="create">Create</button></th></tr></table>
                  </div>
              </div>
            </Modal>
          </div>
          </div>
        );
    }
} 