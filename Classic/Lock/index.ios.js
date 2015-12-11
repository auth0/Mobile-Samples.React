/**
 * Sample Lock + React Native App
 * https://github.com/auth0/react-native-lock-ios
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

var HeaderView = require('./header');
var TokenView = require('./token');

var Auth0credentials = require('./auth0_credentials');
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: Auth0credentials.clientId, domain: Auth0credentials.domain});

var LockReactProject = React.createClass({
  getInitialState: function() {
    return {
      logged: false,
    };
  },
  render: function() {
    if (this.state.logged) {
      return (
        <View style={styles.container}>
          <HeaderView/>
          <TokenView 
            style={styles.token}
            username={this.state.profile.name}
            email={this.state.profile.email}
            jwt={this.state.token.idToken}
            refreshToken={this.state.token.refreshToken}
          />
          <View style={styles.actionContainer}>
            <TouchableHighlight style={styles.actionButton} onPress={this._onLogout}>
              <Text style={styles.actionButtonText}>Logout</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <HeaderView/>
        <Text style={styles.message}>
          Please tap on one of the 'Login ...' buttons to continue.
        </Text>
        <View style={styles.actionContainer}>
          <TouchableHighlight style={styles.actionButton} onPress={this._onShowLock}>
            <Text style={styles.actionButtonText}>Login native</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.actionButton} onPress={this._onShowLockSMS}>
            <Text style={styles.actionButtonText}>Login with SMS</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.actionButton} onPress={this._onShowLockEmail}>
            <Text style={styles.actionButtonText}>Login with Email</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  _onShowLock: function() {
    lock.show({
      connections: ["google-oauth2", "facebook", "twitter"],
      closable: true,
      authParams: {
        scope: "openid email offline_access",
      },
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        token: token,
        profile: profile,
        logged: true,
      });
    });
  },
  _onShowLockSMS: function() {
    lock.show({
      connections: ["sms"],
      closable: true,
      authParams: {
        scope: "openid email offline_access",
      },
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        token: token,
        profile: profile,
        logged: true,
      });
    });
  },
  _onShowLockEmail: function() {
    lock.show({
      connections: ["email"],
      useMagicLink: true,
      closable: true,
      authParams: {
        scope: "openid email offline_access",
      },
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        token: token,
        profile: profile,
        logged: true,
      });
    });
  },
  _onLogout: function() {
    this.setState({logged: false});
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  token: {
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  actionButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16214D',
    borderRadius: 5,
    margin: 8,
  },
  actionButtonText: {
    color: '#ffffff',
  },
  message: {
    flex: 1,
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 14,
    alignSelf: 'center',
  },
});

AppRegistry.registerComponent('LockReactProject', () => LockReactProject);
