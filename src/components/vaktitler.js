import React, { Component } from 'react';
import { StyleSheet, View, ScrollView , Dimensions } from 'react-native';
//
import { colors } from '../../theme'
//
import Loading from './loading'
import Vakit from './vakit'

export default class Vakitler extends Component {
  state = {
    isFetchingList: true,
    ezanlar: []
  }
  async componentWillMount() {
    const res = await fetch('https://ezanvakti.herokuapp.com/vakitler?ilce=9541')
    const ezanlar = await res.json()
    await this.setState({
      ezanlar,
      isFetchingList: false
    })
  }
  render() {
    const { ezanlar, isFetchingList } = this.state
    return (
      <View style={styles.container}>
        {
          isFetchingList ? <Loading/> :
          <ScrollView 
          horizontal={true}
          pagingEnabled={true}>
            {
              ezanlar.map((ezan, index) => {
              const key= `ezan-${index}`
              return (
                <View key={key} style={styles.ezan}>
                  <Vakit isToday={index === 0} vakit={ezan} />
                </View>
              )
              })
            }
          </ScrollView>
        }
      </View>
    );
  }
}

const { width , height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    flexDirection: 'row',
    justifyContent:'center'
  },
  ezan: {
    width,
    minHeight: height,
    paddingHorizontal: 20
  }
})