import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Vakitler from './src/components/vaktitler'

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Vakitler/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})