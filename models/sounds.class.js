class Sound {
  constructor() {
    this.activeSounds = {}; // Map: src → Audio-Objekt
  }


  /**
   *play sound system
   * @param {string} src - sound file (path)
   * @param {string} volume - volume set between 0 and 1
   * @param {string} loop -should play sound in a continuous loop
   * @returns
   */
  soundPlay(src, volume, loop = false) {
    if (mute == "on") {
      if (this.activeSounds[src]) return;
      const sound = new Audio(src);
      sound.volume = volume;
      sound.loop = false;
      this.activeSounds[src] = sound;
      sound.play().catch(e => {
        delete this.activeSounds[src];
      });
      sound.onended = () => {
        if (loop && this.activeSounds[src]) {
          sound.currentTime = 0;
          sound.play().catch(e => {
          });
        } else {
          delete this.activeSounds[src];
        }
      };
    }
  }

  /**
   *stop sound
   * @param {string} src - path of the sound to be stopped
   */
  stopSound(src) {
    const sound = this.activeSounds[src];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      delete this.activeSounds[src];
    }
  }

  /**
   *stop all sound
   */
  stopAllSounds() {
    for (const src in this.activeSounds) {
      const sound = this.activeSounds[src];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
        delete this.activeSounds[src];
      }
    }
  }
}
