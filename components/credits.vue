<template>
    <v-flex style="background:black" relative fullheight-percent flex1 flexcenter flexcol  >
        <v-flex pad1ln margin125 style="z-index: 900; background:rgba(51, 51, 51, 0.89); max-height:80%;" borderRad4 flexcol nodeShadow-w >
            <audio id="cyclone-audio" autoplay loop>
                <source src="music/cyclone.mp3" type="audio/mp3">
            </audio>
            <h4 class="cw ps" >Special Thanks to:</h4>
            <button  class="video-game-button ps marginbottom125" >
                <div class="pad125 flex" >
                    Abhishek Gandhi - contributor
                </div>     
            </button>
            <button  class="video-game-button ps marginbottom125" >
                <div class="pad125 flex" >
                    Varvara Azimova - contributor
                </div>     
            </button>
            <button  class="video-game-button ps marginbottom125" >
                <div class="pad125 flex" >
                    Jose Valenzuela - contributor
                </div>     
            </button>
            <button  class="video-game-button ps marginbottom125" >
                <div class="pad125 flex" >
                    Jennifer Singco - contributor
                </div>     
            </button>
            <br> <br>
            <h5 class="cw ps" >Volunteer</h5>
            <button  class="video-game-button ps " >
                <div class="pad125 flex" >
                    Marven Singco - webapp developer
                </div>     
            </button>
        </v-flex>
        <video style="z-index:100;" autoplay muted loop id="myVideo">
                <source src="video/vid-bg2.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
        </video>                        
    </v-flex>
</template>

<script>
export default {
    mounted() {
    }
}
</script>