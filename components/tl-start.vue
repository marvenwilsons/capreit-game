<template>
    <v-fade-transition>
        <v-flex v-if="ready" relative fullheight-percent flex1 flexcenter flexcol >
            <video autoplay muted loop id="myVideo">
                <source src="video/vid-bg1.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <audio id="tl-audio" autoplay loop>
                <source src="music/epic.mp3" type="audio/mp3">
            </audio>
            <audio id="dong">
                <source src="sound-effects/dong-sound-effect.mp3" type="audio/mp3">
            </audio>
            <audio id="tong">
                <source src="sound-effects/tong-keyboard.mp3" type="audio/mp3">
            </audio>
            <audio id="play">
                <source src="sound-effects/SFX - Evil Spawner Dispense.mp3" type="audio/mp3">
            </audio>
            <v-expand-transition>
                <div v-if="show" id="mainContent" style="min-width:500px;" class="borderRad4 pad1ln nodeShadow" >
                    <h4 class="ps h" >
                        <div style="color:white;text-shadow: 2px 2px #f03304;" class="flex flexcol flexcenter" >
                            <span>
                                Young celebrity 
                            </span>
                            <span>
                                pics game
                            </span>
                        </div>
                    </h4>
                    <v-flex flexcol style="" pad1ln >
                        <v-text-field
                            v-model="playerName"
                            background-color="white"
                            class="ps"
                            outlined
                            placeholder="Player Name"
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            background-color="white"
                            class="ps"
                            outlined
                            placeholder="Capreit Email Address"
                        ></v-text-field>
                    </v-flex>
                    <v-flex  flexend >
                        <button @click="playGame" @mouseover="soundEffect" class="ps start-btn h" >
                            Play
                        </button>
                    </v-flex>
                </div>
            </v-expand-transition>
        </v-flex>
    </v-fade-transition>
</template>

<script>
export default {
    data: () => ({
        playerName: undefined,
        email: undefined,
        show: false,
        ready: true
    }),
    mounted() {
        const audio = document.getElementById('tl-audio')
        audio.play()
        audio.volume = 0.2;
        setTimeout(() => {
            audio.play()
            this.show = true
        }, 100);
    },
    watch: {
        playerName() {
            this.keyboardEffect()
        },
        email() {
            this.keyboardEffect()
        }
    },
    methods: {
        soundEffect() {
            const n = document.getElementById('dong')
            n.play()
            n.volume = 1
        },
        keyboardEffect() {
            const n = document.getElementById('tong')
            n.play()
            n.volume = 0.1
        },
        playGame() {
            if(this.playerName && this.email) {
                const n = document.getElementById('play')
                n.play()

                setTimeout(() => {
                    this.show = false
                    setTimeout(() => {
                        setTimeout(() => {
                            this.$emit('preGame', {
                                player: this.playerName,
                                capreit_email: this.email
                            })
                        }, 100);
                    }, 700);
                }, 100);

                
            }
        }
    }
}
</script>

<style>
@import url('assets/dq-fw-0.4.css');

.cw{
    color: white;
}

#myVideo {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
}
#mainContent{
    z-index: 9999;
    background: rgb(2,0,36);
    background: linear-gradient(7deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.8799894957983193) 39%, rgba(0,212,255,1) 100%);
}
.h {
  font-size: 30pt;
}
body {
  background-color: black;
  font-family: 'Press Start 2p';
}
.video-game-button {
	text-shadow: 1px 1px pink, -1px -1px maroon;

	line-height: 1.5em;
	text-align: center;
	display: inline-block;
	-webkit-border-radius: .75em;
	-moz-border-radius: .75em;
	-o-border-radius: .75em;
		border-radius: .75em;
	background-color: red;
	-webkit-box-shadow:  0 .2em maroon;
	-moz-box-shadow:  0 .2em maroon;
	-o-box-shadow:  0 .2em maroon;
	box-shadow:  0 .2em maroon;
	color: white;
	margin: 5px;
    background: rgb(2,0,36);
    background: linear-gradient(7deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.8799894957983193) 39%, rgba(0,212,255,1) 100%);
	cursor: pointer;
    padding-left: 5px;
    font-size: 15pt;

}
.start-btn{
    text-align: center;
	display: inline-block;
	margin:5px;
    font-weight: bold;
    padding: 10px 0 10px 10px ;
    background-color: lightgray;
    text-shadow: -1px -1px black, 1px 1px white;
    color: gray;
    -webkit-border-radius: 7px;
	-moz-border-radius: 7px;
	-o-border-radius: 7px;
	border-radius: 7px;
    box-shadow: 0 .2em gray; 
    cursor: pointer;

}
.start-btn:hover {
    color: greenyellow;
}

.video-game-button:hover {
    color: greenyellow;
}
.video-game-button:active, .start-btn:active {
	box-shadow: none;
	position: relative;
    top: .2em;
}
</style>