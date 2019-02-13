export default function(player) {
  player.audio.addEventListener('play', onAudioPlay.bind(player))
  player.audio.addEventListener('pause', onAudioPause.bind(player))
  player.audio.addEventListener('abort', onAudioPause.bind(player))
  player.audio.addEventListener('waiting', onAudioWaiting.bind(player))
  player.audio.addEventListener('canplay', onAudioCanplay.bind(player))
  player.audio.addEventListener('progress', onAudioProgress.bind(player))
  player.audio.addEventListener(
    'durationchange',
    onAudioDurationChange.bind(player)
  )
  player.audio.addEventListener('seeking', onAudioSeeking.bind(player))
  player.audio.addEventListener('seeked', onAudioSeeked.bind(player))
  player.audio.addEventListener('timeupdate', onAudioTimeUpdate.bind(player))
  player.audio.addEventListener(
    'volumechange',
    onAudioVolumeChange.bind(player)
  )
  // player.audio.addEventListener('ended', player.onAudioEnded)
  player.audio.addEventListener(
    'loadedmetadata',
    onAudioLoadedMetadata.bind(player)
  )
}

function onAudioPlay() {
  this.isPlaying = true
}
function onAudioPause() {
  this.isPlaying = false
}
function onAudioWaiting() {
  this.isLoading = true
}
function onAudioCanplay() {
  this.isLoading = false
}
function onAudioProgress() {
  if (this.audio.buffered.length) {
    this.playStatLoadedTime = this.audio.buffered.end(
      this.audio.buffered.length - 1
    )
  } else {
    this.playStatLoadedTime = 0
  }
}
function onAudioDurationChange() {
  if (this.audio.duration !== 1) {
    this.playStatDuration = this.audio.duration
  }
}
function onAudioSeeking() {
  this.playStatPlayedTime = this.audio.currentTime
}
function onAudioSeeked() {
  this.playStatPlayedTime = this.audio.currentTime
}
function onAudioTimeUpdate() {
  this.playStatPlayedTime = this.audio.currentTime
  if (this.audio.buffered.length) {
    this.playStatLoadedTime = this.audio.buffered.end(
      this.audio.buffered.length - 1
    )
  } else {
    this.playStatLoadedTime = 0
  }
}
function onAudioVolumeChange() {
  this.audioVolume = this.audio.volume
  this.isAudioMuted = this.audio.muted
}
function onAudioLoadedMetadata() {
  if (this.audio.buffered.length) {
    this.playStatLoadedTime = this.audio.buffered.end(
      this.audio.buffered.length - 1
    )
  } else {
    this.playStatLoadedTime = 0
  }
}
