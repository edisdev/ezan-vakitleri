import React, { Component } from 'react';
import { StyleSheet, View , Dimensions , Image } from 'react-native';

const { height } = Dimensions.get('window')

export default () => {
  return (
    <View style={styles.loading}>
      <Image
        style={styles.loadingGif}
        source={ require('../assets/loading.gif') }/>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height
  },
  loadingGif: {
    width: 50,
    height: 50
  }
})