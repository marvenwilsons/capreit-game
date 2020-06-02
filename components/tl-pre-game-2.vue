<template>
    <v-flex style="background:black;" relative fullheight-percent flex1 flexcenter flexcol >
        <video autoplay muted loop id="myVideo">
                <source src="video/vid-bg3.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
        </video>
        <audio id="cyclone-audio" autoplay loop>
            <source src="music/cyclone.mp3" type="audio/mp3">
        </audio>
        <v-expand-transition>
            <div v-if="ready" style="height:10%; width:700px;" class="pad1ln borderRad4" id="mainContent" >
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
        
        setTimeout(() => {
            this.ready = true

            const myItnerval = setInterval(() => {
                this.count = this.count + 1
                if(this.count == 100) {
                    clearInterval(myItnerval)
                    setTimeout(() => {
                        this.$emit('startGame', {
                            player: this.playerName,
                            capreit_email: this.email
                        })
                    },30)
                }
            }, 100)
        }, 300);
    }
}
</script>