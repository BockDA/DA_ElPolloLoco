class Sound {
  constructor() {
    this.activeSounds = {}; // Map: src → Audio-Objekt
  }


  soundPlay(src, volume, loop = false) {
    if (mute == "on") {
      // Wenn Sound schon läuft, nicht erneut starten
      if (this.activeSounds[src]) return;

      const sound = new Audio(src);
      sound.volume = volume;
      sound.loop = false; // wir loopen selbst

      this.activeSounds[src] = sound;

      sound.play().catch(e => {
        console.warn("Fehler beim Abspielen:", e);
        delete this.activeSounds[src];
      });

      sound.onended = () => {
        if (loop && this.activeSounds[src]) {
          // Neu abspielen (manueller Loop)
          sound.currentTime = 0;
          sound.play().catch(e => {
            console.warn("Fehler beim Loopen:", e);
          });
        } else {
          // Kein Loop oder gestoppt
          delete this.activeSounds[src];
        }
      };
    }
  }



  stopSound(src) {
    const sound = this.activeSounds[src];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      delete this.activeSounds[src];
    }
  }



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
