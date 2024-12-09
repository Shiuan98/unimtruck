// import React, { Component, useState } from 'react';
// import useSound from 'use-sound';
// import PlayButton from 'simple-play-button';
// import {Howl, Howler, HowlOptions} from 'howler';

 
// let sound = new Howl({
//   src: [
//     "https://cyberheist.wtf/static/media/Yakuza.18c4a70a.mp3", 
//   ],
//   loop: true,
// });

// const Sound = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//   	<div class="sound-btn">
//     <button 
//       onClick={() => {
//         // Toggles play / pause

//         if (isPlaying) {
//           sound.pause();
//           setIsPlaying(false);
//         } else {
//           sound.play();
//           setIsPlaying(true);
//         }
//         console.log("isPlaying", isPlaying);
//       }}
//     >
//       {!isPlaying ? <div><img src={MuteSong} /></div> : <div><img src={PlaySong} /></div>}
//     </button>
//     </div>
//   );
// };



// export default Sound;