<template>
    <v-flex style="background:black;" relative fullheight-percent flex1 flexcenter flexcol >
        <video autoplay muted loop id="myVideo">
                <source src="video/vid-bg3.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
        </video>
        <audio id="cyclone-audio" autoplay loop>
            <source src="music/cyclone.mp3" type="audio/mp3">
        </audio>
        <audio id="game-mech">
            <source src="sound-effects/game-mech.mp3" type="audio/mp3">
        </audio>
        <v-expand-transition>
            <div v-if="ready" style="height:552px; width:700px;" class="pad1ln borderRad4" id="mainContent" >
                <div class="ps cw">
                    <v-flex h >Game Mechanics</v-flex>
                    <v-flex class="sf" >
                        <br>
                        welcome to employee  engagement game 
                        <br> <br>
                        brought to you by Corporate Services and Marketing Department
                        <br> <br>
                        guess the name of the person in the picture as quick as possible
                        <br> <br>
                        you have a chance to select one answer by clicking the multiple choices
                        <br> <br>
                        you have 15 seconds to select an answer then the game will tell if the
                        answer is correct or wrong
                        <br> <br>
                        a point will be added to your score if you guess the correct answer
                        <br> <br>
                        you have a total of 2 minutes and 30 seconds to play the game
                    </v-flex>
                </div>
                <br><br>
                <v-flex flexcol >
                    <div class="pad050" :style="{background:'white', width: count + '%'}" ></div>
                    <v-flex class="cw padtop025" >Loading... {{count}}%</v-flex>
                </v-flex>
            </div>

        </v-expand-transition>
    </v-flex>
</template>

<script>
export default {
    data: () => ({
        ready: false,
        count: 0
    }),
    mounted() {
        const n = document.getElementById('cyclone-audio')
        n.volume = 0.3

        const gm = document.getElementById('game-mech')
        gm.volume = 0.4
        gm.currentTime = 0.0
        gm.play()

        setTimeout(() => {
            this.ready = true

            const myItnerval = setInterval(() => {
                this.count = this.count + 1
                if(this.count == 100) {
                    clearInterval(myItnerval)
                    setTimeout(() => {
                        this.$emit('startGame', {
                            player: this.playerName,
                            office_location: this.office_location
                        })
                    },100)
                }
            }, 311)
        }, 1000);
    }
}
</script>