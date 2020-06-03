<template>
    <div style="width: 600px; height: 600px;">
        <audio id="dong">
            <source src="sound-effects/dong-sound-effect.mp3" type="audio/mp3">
        </audio>
        <v-flex fullheight-percent flexcol>
            <v-flex flexcenter >
                <div class="flex1 marginleft125 marginright125" >
                    <h1 style="text-shadow: 2px 2px #f03304;" class="cw ps" >Guess <br> who ?</h1>
                </div>
                <div class="flex1  fullheight-percent" >
                    <img style="max-height:265px" :src="item.pic" alt="">
                </div>
            </v-flex>
            <v-flex style="max-height:320px;" margintop125 flexcol flexcenter >
                <v-flex v-for="(i,index) in item.choices" :key="index" class="flex1 cw margintop050 sf" >
                    <button @mouseover="dong" @click="answer(i)" class="video-game-button ps marginright125" >
                        <div class="pad050 padleft125 padright125 sf" >{{i ? i : 'none of the above'}}</div>
                    </button>
                </v-flex>
            </v-flex>
        </v-flex>
    </div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        answer(val) {
            if(val == this.item.answer) {
                this.$emit('onDone', 1)
            } else {
                this.$emit('onDone', 0)
            }
        },
        dong() {
            const dong = document.getElementById('dong')
            dong.volume = 1
            dong.currentTime = 0.0
            dong.play()
        }
    }
}
</script>