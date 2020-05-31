<template>
    <v-flex style="background:black;" relative fullheight-percent flex1 flexcenter flexcol >
        <video autoplay muted loop id="myVideo">
            <source src="video/vid-bg2.mp4" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        <audio id="triton-audio">
            <source src="music/triton.mp3" type="audio/mp3">
        </audio>
        <audio id="cs6">
            <source src="sound-effects/SFX - Combo Sound6.mp3" type="audio/mp3">
        </audio>
        <audio id="infoOut">
            <source src="sound-effects/SFX - Info Out.mp3" type="audio/mp3">
        </audio>
        <audio id="buildUp">
            <source src="sound-effects/SFX - Prebooster Anim Buildup.mp3" type="audio/mp3">
        </audio>
        <audio id="win">
            <source src="music/winner.mp3" type="audio/mp3">
        </audio>
        <!--  -->
        <v-flex id="overlay" style="z-index:100;" fullwidth absolute fullheight-percent pad1ln flexcol>
            <div class="fullwidth" >
                <v-flex fullwidth spacebetween >
                    <div class="flex" >
                        <v-scroll-x-transition>
                            <div v-if="mounted1" id="mainContent" class="pad125 borderRad4 nodeShadow-w" >
                                <span class="cw ps" >Player: {{info.player}}</span>
                            </div>
                        </v-scroll-x-transition>
                        <v-scroll-y-transition>
                        <div v-if="mounted2" id="mainContent" class="pad125 borderRad4 nodeShadow-w marginleft125" >
                            <span class="cw ps" >Score: 0</span>
                        </div>
                        </v-scroll-y-transition>
                    </div>
                    <v-scroll-x-transition>
                        <div v-if="mounted3" id="mainContent" style="background" class="pad125 borderRad4 nodeShadow-w" >
                            <span class="cw ps" >Time Remaining: 00:{{countDown}}</span>
                        </div>
                    </v-scroll-x-transition>
                </v-flex>
            </div>
            <!-- game area -->
            <v-flex  style="z-index:100;" flexcenter >
                <v-expand-transition>
                    <v-flex v-if="mounted3 != true" flexcenter >
                        <h1 style="font-size:180px;" class="ps cw" >{{startGameCountDown}}</h1>
                    </v-flex>
                </v-expand-transition>
                <v-expand-transition>
                    <v-flex v-if="isStarting"  fullheight-percent  flexcenter>
                        <div class="fullheight-percent" >
                            <div style="width: 600px; height: 600px;">
                                <v-flex fullheight-percent flexcol>
                                    <v-flex flexcenter >
                                        <div class="flex1 marginleft125 marginright125" >
                                            <h1 style="text-shadow: 2px 2px #f03304;" class="cw ps" >Guess <br> who ?</h1>
                                        </div>
                                        <div class="flex1 borderred fullheight-percent" >pic</div>
                                    </v-flex>
                                    <v-flex style="max-height:320px;" margintop125 flexcol >
                                        <v-flex class="flex1 cw margintop050" >
                                            <button class="video-game-button ps marginright125" >
                                                <div class="pad125" >Bard Pit</div>
                                            </button>
                                        </v-flex>
                                        <v-flex class="flex1 cw margintop050" >
                                            <button class="video-game-button ps marginright125" >
                                                <div class="pad125" >Angelina Jolie</div>
                                            </button>
                                        </v-flex>
                                        <v-flex class="flex1 cw margintop050" >
                                            <button class="video-game-button ps marginright125" >
                                                <div class="pad125" >Justin Beiber</div>
                                            </button>
                                        </v-flex>
                                        <v-flex class="flex1 cw margintop050" >
                                            <button class="video-game-button ps marginright125" >
                                                <div class="pad125" >Bard Pit</div>
                                            </button>
                                        </v-flex>
                                    </v-flex>
                                </v-flex>
                            </div>
                        </div>
                    </v-flex>
                </v-expand-transition>
            </v-flex>
        </v-flex>

    </v-flex>
</template>

<script>
export default {
    props: ['info'],
    data: () => ({
        mounted1: false,
        mounted2: false,
        mounted3: false,
        isStarting: false,
        startGameCountDown: 5,
        countDown: 59
    }),
    methods: {
        startGameOnLoadCountDown() {
            // test 2
            const cssound = document.getElementById('cs6')
            const buildUp = document.getElementById('buildUp')
            const myInterval = setInterval(() => {
                this.startGameCountDown = this.startGameCountDown - 1
                cssound.play()
                if(this.startGameCountDown == 0) {
                    clearInterval(myInterval)
                    const triton = document.getElementById('triton-audio')
                    triton.volume = '0.5'
                    triton.play()

                    buildUp.play()
                    buildUp.volume = 0.6
                    setTimeout(() => {
                        this.isStarting = true
                        this.startcountDown()
                    }, 1000);
                }

                if(this.startGameCountDown == 1) {
                    this.loadInfos()
                }
            },1000)
        },
        loadInfos() {
            const infoOut = document.getElementById('infoOut')
            setTimeout(() => {
            this.mounted1 = true
            infoOut.play()
                setTimeout(() => {
                    this.mounted2 = true
                    infoOut.play()
                    setTimeout(() => {
                        this.mounted3 = true
                        infoOut.play()
                    }, 500);
                }, 500);
            }, 500);
        },
        startcountDown() {
            const myCountDown = setInterval(() => {
                this.countDown = this.countDown - 1
                if(this.countDown == 0) {
                    clearInterval(myCountDown)
                    const win = document.getElementById('win')
                    win.play()

                    const triton = document.getElementById('triton-audio')
                    triton.pause()
                }
            }, 1000);
        }
    }, 
    mounted() {
        this.startGameOnLoadCountDown()        
    }
}
</script>

<style>
#overlay {
    background: rgb(36,0,16);
    background: linear-gradient(273deg, rgba(36,0,16,0.8981967787114846) 32%, rgba(5,116,139,0.9150035014005602) 100%);
}
.nodeShadow-w{
    box-shadow: 0px 0px 13px -5px rgba(241, 241, 241, 0.75);
}
</style>