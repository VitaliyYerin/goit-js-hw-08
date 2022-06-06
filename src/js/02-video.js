import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const getDataSeconds = function(data) {
  console.log(data.seconds)
  sessionStorage.setItem('videoplayer-current-time', data.seconds)
};
player.on('timeupdate', throttle(getDataSeconds, 1000));
player.setCurrentTime(JSON.parse(sessionStorage.getItem('videoplayer-current-time')));