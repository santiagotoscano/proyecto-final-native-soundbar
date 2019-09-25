import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from './modules/colors';
import Playbar from './components/Playbar';
import SoundPlayer, { SoundPlayerTrack } from './modules/SoundPlayer';

export default class App extends Component {

  render() {

    const sp = SoundPlayer.getInstance()

    const tracks: SoundPlayerTrack[] = [
      {
        id: '1',
        artist: 'Metallica',
        title: 'The Unforgiven',
        url: 'https://www.bensound.org/bensound-music/bensound-memories.mp3',
        artwork: 'https://c8.alamy.com/comp/KY1N4Y/metalica-madison-square-garden-103009-photo-michael-brito-KY1N4Y.jpg'
      },
      {
        id: '2',
        artist: 'Sonata Arctica',
        title: 'Life',
        url: 'https://www.bensound.org/bensound-music/bensound-creativeminds.mp3',
        artwork: 'https://yt3.ggpht.com/a-/AAuE7mATKhhCNrYaSWl-evTrhNhfAEjWNFPMp4CgxQ=s900-mo-c-c0xffffffff-rj-k-no'
      },
      {
        id: '3',
        artist: 'Nirvana',
        title: 'Come As You Are',
        url: 'https://www.bensound.org/bensound-music/bensound-happyrock.mp3',
        artwork: 'https://m.media-amazon.com/images/I/918tR77Q6hL._SS500_.jpg'
      }
    ]

    sp.setTracks(tracks)

    return (
      <View style={styles.container}>
        <Playbar soundPlayer={sp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.a,
  }
});