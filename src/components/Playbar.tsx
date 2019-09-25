import React, { Component, useState, useEffect } from 'react'
import { View, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Playbar.Styles';
import SoundPlayer, { SoundPlayerState, SoundPlayerTrack } from '../modules/SoundPlayer';

const Playbar = (props: { soundPlayer: SoundPlayer }) => {

  const { soundPlayer } = props

  const [isPlaying, setIsPlaying] = useState<boolean>(soundPlayer.getState() === SoundPlayerState.PLAYING)
  const [track, setTrack] = useState<SoundPlayerTrack | undefined>(soundPlayer.getTrack())

  useEffect(() => {
    const onStateChageSubscription = soundPlayer.onStateChange.subscribe(state => setIsPlaying(state === SoundPlayerState.PLAYING))
    const onTrackChageSubscription = soundPlayer.onTrackChange.subscribe(track => setTrack(track))
    return () => {
      onStateChageSubscription.unsubscribe()
      onTrackChageSubscription.unsubscribe()
    }
  }, [])

  if (!track) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.trackArtworkContainer}>
        <Image style={styles.trackArtwork} source={{ uri: track.artwork }}></Image>
      </View>
      <View style={styles.trackInfo}>
        <Text style={styles.trackInfoTitle}>{track.title}</Text>
        <Text style={styles.trackInfoSubtitle}>{track.artist}</Text>
      </View>
      <View style={styles.trackController}>
        <Icon name='skip-previous' size={26} color='white' onPress={() => soundPlayer.previous()} />
        {
          isPlaying
            ? <Icon name='pause' size={26} color='white' onPress={() => soundPlayer.pause()} />
            : <Icon name='play-arrow' size={26} color='white' onPress={() => soundPlayer.play()} />
        }
        <Icon name='skip-next' size={26} color='white' onPress={() => soundPlayer.next()} />
      </View>
    </View>
  )
}

export default Playbar