import TrackPlayer from 'react-native-track-player'
import { Subject, Observable } from 'rxjs'

export interface SoundPlayerTrack {
  id: string,
  url: string,
  title: string,
  artist: string,
  date?: string
  album?: string,
  genre?: string,
  artwork?: string,
}

export enum SoundPlayerState {
  NONE,
  PLAYING,
  PAUSED,
  STOPPED,
  BUFFERING
}

export default class SoundPlayer {

  private static instance: SoundPlayer

  static getInstance = () => {
    if (SoundPlayer.instance == null) {
      SoundPlayer.instance = new SoundPlayer
    }
    return SoundPlayer.instance
  }

  onStateChange: Observable<SoundPlayerState>

  onTrackChange: Observable<SoundPlayerTrack>

  private onStateChangeSubject = new Subject<SoundPlayerState>()

  private onTrackChangeSubject = new Subject<SoundPlayerTrack>()

  private tracks: SoundPlayerTrack[] = []

  private track?: SoundPlayerTrack

  private state = SoundPlayerState.NONE

  private constructor() {

    this.onStateChange = this.onStateChangeSubject.asObservable()
    this.onTrackChange = this.onTrackChangeSubject.asObservable()

    TrackPlayer.registerPlaybackService(() => async () => {
      TrackPlayer.addEventListener('remote-play', this.play);
      TrackPlayer.addEventListener('remote-pause', this.pause);
      TrackPlayer.addEventListener('remote-stop', this.stop);
      TrackPlayer.addEventListener('remote-next', this.next);
      TrackPlayer.addEventListener('remote-previous', this.previous);
      TrackPlayer.addEventListener('playback-track-changed', data => this.onTrackChangeSubject.next(this.track = this.tracks.find(x => x.id == data.nextTrack)))
      TrackPlayer.addEventListener('playback-queue-ended', console.log)
      TrackPlayer.addEventListener('playback-state', data => this.onStateChangeSubject.next(this.state = this.mapState(data.state)))
    });

    TrackPlayer.setupPlayer()
      .then(() => TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ],
      }))
  }

  getState = () => this.state
  
  getTrack = () => this.track

  setTracks = async (tracks: SoundPlayerTrack[]) => {
    await TrackPlayer.add(this.tracks = tracks)
  }

  play = async (trackId?: string) => {
    if (trackId) {
      await TrackPlayer.skip(trackId)
    }
    await TrackPlayer.play()
  }

  pause = async () => {
    await TrackPlayer.pause()
  }

  stop = async () => {
    await TrackPlayer.stop()
  }

  next = async () => {
    await TrackPlayer.skipToNext()
  }

  previous = async () => {
    await TrackPlayer.skipToPrevious()
  }

  private mapState = (state: TrackPlayer.State) => ({
    [TrackPlayer.STATE_NONE]: SoundPlayerState.NONE,
    [TrackPlayer.STATE_BUFFERING]: SoundPlayerState.BUFFERING,
    [TrackPlayer.STATE_PAUSED]: SoundPlayerState.PAUSED,
    [TrackPlayer.STATE_PLAYING]: SoundPlayerState.PLAYING,
    [TrackPlayer.STATE_STOPPED]: SoundPlayerState.STOPPED
  })[state]
}