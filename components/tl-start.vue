<template>
    <v-flex  relative fullheight-percent flex1 flexcenter flexcol >
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
        <div id="mainContent" style="min-width:500px;" class="borderRad4 pad1ln nodeShadow" >
            <h4 class="ps" >
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
                <button @mouseover="soundEffect" class="ps start-btn" >
                    Play
                </button>
            </v-flex>
	    </div>
    </v-flex>
</template>

<script>
export default {
    data: () => ({
        playerName: undefined,
        email: undefined
    }),
    mounted() {
        const audio = document.getElementById('tl-audio')
        audio.volume = 0.2;
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
            console.log('keyboard effect')
            const n = document.getElementById('tong')
            n.play()
            n.volume = 0.1
        },
        playGame() {
            if(this.playerName && this.email) {
                
            }
        }
    }
}
</script>

<style>
@import url('assets/dq-fw-0.4.css');

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
body {
  background-color: black;
  font-size: 30pt;
  font-family: 'Press Start 2p';
}
.video-game-button {
	text-shadow: 1px 1px pink, -1px -1px maroon;

	line-height: 1.5em;
	text-align: center;
	display: inline-block;
	width: 1.5em;
	-webkit-border-radius: .75em;
	-moz-border-radius: .75em;
	-o-border-radius: .75em;
		border-radius: .75em;
	background-color: red;
	-webkit-box-shadow:  0 .2em maroon;
	-moz-box-shadow:  0 .2em maroon;
	-o-box-shadow:  0 .2em maroon;
	box-shadow:  0 .2em maroon;
	color: red;
	margin: 5px;
	background-color: red;
	background-image: -o-linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	background-image: -moz-linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	background-image: -webkit-linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	background-image: linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	cursor: pointer;
  padding-left: 5px;
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
    color: rgba(0,212,255,1)
}
.video-game-button:active, .start-btn:active {
	box-shadow: none;
	position: relative;
	top: .2em;
}
</style>