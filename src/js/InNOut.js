import React, { Component } from 'react';
import Tabs from './lib/Tabs.js'
import TabContent from './lib/TabContent.js'
import TabLink from './lib/TabLink.js'
import * as hdac from 'hdacjs-lib';

import '../effect/styles.css';

const styles = {
  tabs: {
    width: '100%',
    display: 'inline-block',
    marginRight: '30px',
    verticalAlign: 'top',
  },
  links: {
    margin: 0,
    padding: 0,
  },
  tabLink: {
    height: '30px',
    lineHeight: '30px',
    padding: '0 15px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '2px solid transparent',
    display: 'inline-block',
  },
  activeLinkStyle: {
    borderBottom: '2px solid #333',
  },
  visibleTabStyle: {
    display: 'inline-block',
  },
  content: {
    width: '100%',
    padding: '0 15px',
  },
};
var effected;
export default class InNOut extends React.Component {

  Sign_action() {
    var pwd = document.getElementById('signIn3').value;
    var msg = document.getElementById('signIn1').value;
    var key = document.getElementById('signIn2').value;
    var value = JSON.parse(localStorage.getItem(sessionStorage.getItem('selected')));
    var error = '';
    if(key == ''){
      alert('Please Enter Your Private Key.');
      error ='error';
    }
    if(error != 'error'){
      try {
      var signature = hdac.sign(msg, key, pwd);
      } catch(e) {
        console.log(e);
        alert('Please check pin-code.');
      }
      document.getElementById('sign_out').value = '';
      document.getElementById('sign_out').value = signature;
    }
  }
  Verify_action() {
    var msg = document.getElementById('verifyIn1').value;
    var addr = document.getElementById('verifyIn2').value;
    var signature = document.getElementById('verifyIn3').value;
    var error = '';
    if(addr == '') {
      alert('Please check address.');
      error ='error';
    }
    if (error != 'error' && signature == '') {
      alert('Please check signed message.');
      error ='error';
    }
    if(error != 'error'){
      var result = hdac.verify(msg, addr, signature);
      document.getElementById('verify_out').value = result;
    }
  }
  RsaEnc_action(){
    var msg = document.getElementById('rsaEncIn1').value;
    var pubkey = document.getElementById('rsaEncIn2').value;
    var error = '';
    if(msg == '') {
      alert('Please check message.');
      error = 'error';
    }
    if(error != 'error' && pubkey == '') {
      alert('Please check uncompressed public key.');
      error = 'error';
    }
    if (error != 'error'){
      var result = hdac.rsaEncrypt(pubkey, msg).then(function(result) {      
        document.getElementById('rsaEnc_out').value = result.toString('hex');
      });
    }
  }
  RsaDec_action() {
    var encMsg = document.getElementById('rsaDecIn2').value;
    var prikey = document.getElementById('rsaDecIn1').value;
    var pin = document.getElementById('rsaDecIn3').value;
    encMsg = Buffer.from(encMsg, 'hex');
    var error = '';
    if(prikey == '') {
      alert('Please check private key.');
      error = 'error';
    }
    if (error != 'error' && encMsg == '') {
      alert('Please check RSA encypted message.');
      error = 'error';
    }
    if (error != 'error'){
      if(pin != ""){
        prikey = hdac.aesDecrypt(prikey, pin);
      }
      hdac.rsaDecrypt(prikey, encMsg).then(function(result) {            
        document.getElementById('rsaDec_out').value = result.toString();
      }).catch(function(e) {
        alert('Please check pin-code.')
      });
    }
  }
  EffectEnc_action() {
    var msg = document.getElementById('effectEncIn1').value;
    var pubkey = document.getElementById('effectEncIn2').value;
    var error = '';
    if(pubkey == '') {
      alert('Please check public key.');
      error = 'error';
    }
    if( error != 'error'){
      hdac.effectiveEncrypt(msg, pubkey).then(function(response) {
        effected = response;
        var result = "encryptedKey: "+response.key.toString('hex')+"\nencryptedMsg: "+response.msg;
      
        document.getElementById('effectEnc_out').value = result;
      });
    } 
  }
  EffectDec_action() {
    var prikey = document.getElementById('effectDecIn1').value;
    var encKey = document.getElementById('effectDecIn2').value;
    var encMsg = document.getElementById('effectDecIn3').value;
    var pin = document.getElementById('effectDecIn4').value;  
    var error = '';
    if(prikey == '') {
      alert('Please check private key.');
      error = 'error';
    }
    if(error != 'error' && encKey == '') {
      alert('Please check effect encypted key.');
      error = 'error';
    }
    if(error != 'error' && encMsg == '') {
      alert('Please check effect encypted message.');
      error = 'error';
    }
    if( error != 'error') {
      hdac.effectiveDecrypt(encMsg, encKey,prikey, pin).then(function(result) {  
        document.getElementById('effectDec_out').value = result;
      }).catch(function(e) {
        console.log(e);
        alert('Please check pin-code.');
      });
    }
  }

  verify_tab(){
    var msg = document.getElementById('verifyIn1');
    var addr = document.getElementById('verifyIn2');
    var signed_msg = document.getElementById('verifyIn3');
    var value = JSON.parse(localStorage.getItem(sessionStorage.getItem('selected')));

    
    msg.value = document.getElementById('signIn1').value;    
    if(value != null){
      addr.value = value.address;
      addr.setAttribute("disabled","true");
    }
    signed_msg.value = document.getElementById('sign_out').value;    
  }
  rsaEnc_tab() {
    var msg = document.getElementById('rsaEncIn1');
    var pubkey = document.getElementById('rsaEncIn2');
    var value = JSON.parse(localStorage.getItem(sessionStorage.getItem('selected')));

    if(value != null){
      pubkey.value = value.uncompressedPubkey;
      pubkey.setAttribute("disabled","true");
    }
    msg.value = document.getElementById('signIn1').value;  
  }
  rsaDec_tab() {
    var encMsg = document.getElementById('rsaDecIn2');
    var prikey = document.getElementById('rsaDecIn1');
    var value = JSON.parse(localStorage.getItem(sessionStorage.getItem('selected')));
    
    if(value != null){
      prikey.value = value.privateKey;
      prikey.setAttribute("disabled","true");
    }
    encMsg.value = document.getElementById('rsaEnc_out').value;
    document.getElementById('rsaDecIn3').value = document.getElementById('signIn3').value
  }
  effectEnc_tab() {
    var msg = document.getElementById('effectEncIn1');
    var pubkey = document.getElementById('effectEncIn2');
    var value = JSON.parse(localStorage.getItem(sessionStorage.getItem('selected')));

    if(value != null){
      pubkey.value = value.compressedPubkey;
      pubkey.setAttribute("disabled","true");
    }
    msg.value = document.getElementById('signIn1').value;
  }
  effectDec_tab() {
    var prikey = document.getElementById('effectDecIn1');
    var encMsg = document.getElementById('effectDecIn3');
    var encKey = document.getElementById('effectDecIn2');
    var value = JSON.parse(localStorage.getItem(sessionStorage.getItem('selected')));
    document.getElementById('effectDecIn4').value = document.getElementById('signIn3').value
 
    if(value != null){
      prikey.value = value.privateKey;
      prikey.setAttribute("disabled","true");
    }
    if( effected != null) {
      encMsg.value = effected.msg.toString('hex');
      encMsg.setAttribute("disabled","true");
      encKey.value = effected.key.toString('hex');
      encKey.setAttribute("disabled","true");
    }
  }

  render(){
    return (
      <Tabs
      activeLinkStyle={styles.activeLinkStyle}
      visibleTabStyle={styles.visibleTabStyle}
      style={styles.tabs}
    >
      <div style={styles.links}>
        <TabLink to="tab1" style={styles.tabLink}>
          SIGN
        </TabLink>
        <TabLink to="tab2" style={styles.tabLink} onClick={this.verify_tab.bind(this)} >
          VERIFY
        </TabLink>
        <TabLink to="tab3" style={styles.tabLink} onClick={this.rsaEnc_tab.bind(this)}>
          RSA ENCRYPT
        </TabLink>
        <TabLink to="tab4" style={styles.tabLink} onClick={this.rsaDec_tab.bind(this)}>
          RSA DECRYPT
        </TabLink>
        <TabLink to="tab5" style={styles.tabLink} onClick={this.effectEnc_tab.bind(this)}>
          EFFECT ENCRYPT
        </TabLink>
        <TabLink to="tab6" style={styles.tabLink} onClick={this.effectDec_tab.bind(this)}>
          EFFECT DECRYPT
        </TabLink>
      </div>

      <div id="tab_content" style={styles.content}>
        <TabContent for="tab1">
          <div id="sign">
            <div id="space"><div><br></br></div></div>
            <div id="sign_in1">
              <h1>Input</h1>
              <table id="input">
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Message&nbsp;&nbsp;</a><input id="signIn1" type="text" placeholder="message to sign" title="Please write a message to sign."></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Private Key&nbsp;&nbsp;</a><input id="signIn2" type="text" placeholder="private key" title="Please Enter or Select a key."></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag_pin2">&nbsp;&nbsp;Pin-Code&nbsp;&nbsp;</a><input id="signIn3" type="password" placeholder="pincode" title="Please enter the Pin-cod for the selected key."></input></td></tr>
              </table>
            </div>
            <div id="semi-space"><div><br></br></div></div>
            <div id="sign_in2">
              <h1>Output</h1>
              <table id="output">
                <tr id="output"><td id="output" colSpan="3"><textarea id="sign_out" readOnly="readonly" placeholder="result"></textarea></td></tr>
                <tr id="output"><td id="output_btn"><button id="sign_btn" onClick={this.Sign_action.bind(this)}>SIGN</button></td></tr>
              </table>
            </div>
            <div id="space"><div><br></br></div></div>
          </div>
        </TabContent>
        <TabContent for="tab2">
        <div id="sign">
          <div id="space"><div><br></br></div></div>
          <div id="verify_in1">
            <h1>Input</h1>
            <table id="input">
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Message&nbsp;&nbsp;</a><input id="verifyIn1" type="text" placeholder="message"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Address&nbsp;&nbsp;</a><input id="verifyIn2" type="text" placeholder="address"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Signed Message&nbsp;&nbsp;</a><input id="verifyIn3" type="text" placeholder="signed message"></input></td></tr>
              </table>
            </div>
            <div id="semi-space"><div><br></br></div></div>
            <div id="sign_in2">
              <h1>Output</h1>
              <table id="output">
                <tr id="output"><td id="output" colSpan="3"><textarea id="verify_out" readOnly="readonly" placeholder="result"></textarea></td></tr>
                <tr id="output"><td id="output_btn"><button id="verify_btn" onClick={this.Verify_action.bind(this)}>VERIFY</button></td></tr>
              </table>
          </div>
          <div id="space"><div><br></br></div></div>
        </div>
        </TabContent>
        <TabContent for="tab3">
        <div id="sign">
          <div id="space"><div><br></br></div></div>
          <div id="rsa_in1">
            <h1>Input</h1>
            <table id="input">
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Message&nbsp;&nbsp;</a><input id="rsaEncIn1" type="text" placeholder="message"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Uncompressed PublicKey&nbsp;&nbsp;</a><input id="rsaEncIn2" type="text" placeholder="uncompressed pubkey"></input></td></tr>
              </table>
            </div>
            <div id="semi-space"><div><br></br></div></div>
            <div id="sign_in2">
              <h1>Output</h1>
              <table id="output">
                <tr id="output"><td id="output" colSpan="3"><textarea id="rsaEnc_out" readOnly="readonly" placeholder="result"></textarea></td></tr>
                <tr id="output"><td id="output_btn"><button id="encrypt_btn" onClick={this.RsaEnc_action.bind(this)}>RSA ENCRYPT</button></td></tr>
              </table>
          </div>
          <div id="space"><div><br></br></div></div>
        </div>
        </TabContent>
        <TabContent for="tab4">
        <div id="sign">
          <div id="space"><div><br></br></div></div>
          <div id="rsa_in1">
            <h1>Input</h1>
            <table id="input">
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Private key&nbsp;&nbsp;</a><input id="rsaDecIn1" type="text" placeholder="privatekey"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;RSA Encypted Message&nbsp;&nbsp;</a><input id="rsaDecIn2" type="text" placeholder="rsa encypted message"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag_pin">&nbsp;&nbsp;Pin-Code&nbsp;&nbsp;</a><input id="rsaDecIn3" type="password" placeholder="pincode" title="Please enter the Pin-cod for the selected key."></input></td></tr>
              </table>
            </div>
            <div id="semi-space"><div><br></br></div></div>
            <div id="sign_in2">
              <h1>Output</h1>
              <table id="output">
                <tr id="output"><td id="output" colSpan="3"><textarea id="rsaDec_out" readOnly="readonly" placeholder="result"></textarea></td></tr>
                <tr id="output"><td id="output_btn"><button id="decrypt_btn" onClick={this.RsaDec_action.bind(this)}>RSA DECRYPT</button></td></tr>
              </table>
          </div>
          <div id="space"><div><br></br></div></div>
        </div>
        </TabContent>
        <TabContent for="tab5">
        <div id="sign">
          <div id="space"><div><br></br></div></div>
          <div id="effect_in1">
            <h1>Input</h1>
            <table id="input">
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Message&nbsp;&nbsp;</a><input id="effectEncIn1" type="text" placeholder="message"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Public Key&nbsp;&nbsp;</a><input id="effectEncIn2" type="text" placeholder="public key"></input></td></tr>
              </table>
            </div>
            <div id="semi-space"><div><br></br></div></div>
            <div id="sign_in2">
              <h1>Output</h1>
              <table id="output">
                <tr id="output"><td id="output" colSpan="3"><textarea id="effectEnc_out" readOnly="readonly" placeholder="result"></textarea></td></tr>
                <tr id="output"><td id="output_btn"><button id="encrypt_btn" onClick={this.EffectEnc_action.bind(this)}>EFFECT ENCRYPT</button></td></tr>
              </table>
          </div>
          <div id="space"><div><br></br></div></div>
        </div>
        </TabContent>
        <TabContent for="tab6">
        <div id="sign">
          <div id="space"><div><br></br></div></div>
          <div id="effect_in1">
            <h1>Input</h1>
            <table id="input">
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Private Key&nbsp;&nbsp;</a><input id="effectDecIn1" type="text" placeholder="private key"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Effect Encypted Key&nbsp;&nbsp;</a><input id="effectDecIn2" type="text" placeholder="effect encrypted key"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag">&nbsp;&nbsp;Effect Encypted Message&nbsp;&nbsp;</a><input id="effectDecIn3" type="text" placeholder="effect encrypted message"></input></td></tr>
                <tr id="input"><td id="input"><a id ="aTag_pin3">&nbsp;&nbsp;Pin-Code&nbsp;&nbsp;</a><input id="effectDecIn4" type="password" placeholder="pincode" title="Please enter the Pin-cod for the selected key."></input></td></tr>
              </table>
            </div>
            <div id="semi-space"><div><br></br></div></div>
            <div id="sign_in2">
              <h1>Output</h1>
              <table id="output">
                <tr id="output"><td id="output" colSpan="3"><textarea id="effectDec_out" readOnly="readonly" placeholder="result"></textarea></td></tr>
                <tr id="output"><td id="output_btn"><button id="decrypt_btn" onClick={this.EffectDec_action.bind(this)}>EFFECT DECRYPT</button></td></tr>
              </table>
          </div>
          <div id="space"><div><br></br></div></div>
        </div>
        </TabContent>
      </div>
    </Tabs>
    );
}
}