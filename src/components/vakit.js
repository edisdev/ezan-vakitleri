import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList , Dimensions } from 'react-native';
import PropTypes from 'prop-types';
//
import { colors } from '../../theme'
//
import Loading from './loading'

export default class Vakit extends Component {
  state = {
    data: [],
    isSettingData: true,
    diffTime: null
  }
  componentDidMount() {
    const { vakit } = this.props
    this.setState({
      data: [
        {
          name: 'İmsak',
          time: vakit.Imsak
        },
        {
          name: 'Güneş',
          time: vakit.Gunes
        },
        {
          name: 'Öğle',
          time: vakit.Ogle
        },
        {
          name: 'İkindi', 
          time: vakit.Ikindi
        },
        {
          name: 'Akşam',
          time: vakit.Aksam
        },
        {
          name: 'Yatsı',
          time: vakit.Yatsi
        }
      ],
      isSettingData: false
    })

    setInterval(() => {
      this.calculateDiffTime()
    }, 1000);
  }

  calculateDiffTime() {
    const { data } = this.state
    const now = new Date()
    let diffTimeInfo = null
    data.forEach(vakit => {
      const falt = vakit.time.split(':') // hour : minute
      dt2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), falt[0], falt[1], 0)
      diffMinute = dt2.getMinutes() - now.getMinutes() < 0 ? (60 + (dt2.getMinutes() - now.getMinutes())) : dt2.getMinutes() - now.getMinutes()
      diffHours =  dt2.getMinutes() - now.getMinutes() < 0 ? dt2.getHours() - (now.getHours() + 1) : dt2.getHours() - now.getHours()
      diffSecound = 60 + (dt2.getSeconds() - now.getSeconds())
      console.log(diffSecound)
      const diff = (diffHours * 60 ) + diffMinute
      if (diff > 0 && diffTimeInfo === null) {
        diffTimeInfo = {
          timeName: vakit.name,
          diff: diffHours === 0 ? `${diffMinute} dakika ${diffSecound} saniye` : `${diffHours} saat ${diffMinute} dakika ${diffSecound} saniye`
        }
        return 
      }
    })
    this.setState({
      diffTime: diffTimeInfo
    })
    return diffTimeInfo
  }

  renderItem = ({ item }) => {
    const { diffTime } = this.state
    return (
      <View style={[styles.row, diffTime ? styles.activeBgColor: '']}>
        <Text style={[styles.col, diffTime ? styles.activeTextColor: '']}>{item.name}</Text>
        <Text style={[styles.col, styles.time, diffTime ? styles.activeTextColor: '']}>{item.time}</Text>
      </View>
    )
  }

  render() {
    const { vakit, isToday } = this.props
    const { isSettingData, data, diffTime } = this.state
    return (
      <View>
        {
          isSettingData ? <Loading/> :
            <View style={styles.content}>
              <Image 
              style={styles.mountImage}
              resizeMode="contain"
              source={{ uri: vakit.AyinSekliURL }}/>
              <Text style={styles.today}>{ vakit.MiladiTarihUzun }</Text>
              { (diffTime && isToday) &&
                <View style={styles.counter}>
                  <Image style={styles.timerIcon}  resizeMode="contain" source={ require('../assets/timer.png') } />
                  <Text style={styles.counterText}>
                    {diffTime.timeName} Vaktine {diffTime.diff} kaldı..
                  </Text>
                </View>
              }
              <FlatList
              style={styles.table}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              data={data}/>
          </View>
        }
      </View>
    );
  }
}

Vakit.propTypes = {
  vakit: PropTypes.object.isRequired,
  isToday: PropTypes.bool.isRequired
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%'
  },
  mountImage: {
    width: 100,
    height: 100
  },
  today: {
    fontSize: 25,
    color: colors.darkOrange,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%'
  },
  table: {
    borderWidth: 2,
    borderColor: colors.lightOrange,
    backgroundColor: colors.darkOrange,
    borderRadius: 10,
    maxHeight: 300
  },
  row: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: .4,
    borderBottomColor: colors.lightOrange,
    color: colors.lightOrange
  },
  col: {
    width: '50%',
    fontSize: 18,
    color: colors.lightOrange
  },
  time: {
    textAlign: 'right'
  },
  activeBgColor: {
    backgroundColor: colors.lightOrange,
  },
  activeTextColor: {
    color: colors.darkOrange,
  },
  timerIcon: {
    width: 40,
    height: 40,
  },
  counter: {
    flexDirection: 'row',
    backgroundColor: colors.darkOrange,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center'
  },
  counterText: {
    fontSize: 15,
    color: colors.lightOrange,
    textAlign: 'center',
    fontWeight: '500',
    flexWrap: 'wrap'
  }
})