class Sound extends MovableObject {


  songPlay = new Audio()






  soundPlay(src) {

    console.log("Walkin Song ");


    this.songPlay.src = src;
    this.songPlay.volume = 1;




  }




}
