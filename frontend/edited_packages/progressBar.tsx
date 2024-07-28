import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { FunctionComponent, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const ProgressBar: FunctionComponent<{maxVal: number, userVal: number}> = ({maxVal, userVal}) => {
  const barWidth = React.useRef(new Animated.Value(0)).current;
  const pct = userVal / maxVal;
  const finalWidth = (350 * pct);

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: finalWidth,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: barWidth }}>
        <LinearGradient
          colors={['#782EEE', '#50E3C2']}
          style={styles.progressBar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
      <Text style={styles.info}>Today - {userVal}/{maxVal}</Text>
                <Text style={styles.percent}>{Math.round(pct*100)}%</Text>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#EAEAEA',
    width: 350,
    height: 30,
    borderRadius: 100
  },
  progressBar: {
    height: 30,
    borderRadius: 100
  },
  info: {
    position: 'absolute',
    top: 7,
    left: 10, 
    fontWeight: '600',
    color: '#FFFFFF'
  },
  percent: {
    position: 'absolute',
    top: 7,
    right: 10, 
    fontWeight: '600',
    color: '#000000'
}
})