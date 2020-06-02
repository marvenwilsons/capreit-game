<template>
    <span>{{dat}}
        <audio id="ding">
            <source src="sound-effects/SFX - Candypet Oven Ding.mp3" type="audio/mp3">
        </audio>
        <audio id="ing">
            <source src="sound-effects/SFX - Combo Sound11.mp3" type="audio/mp3">
        </audio>
    </span>
</template>

<script>
export default {
    props: ['val'],
    data: () => ({
        dat: 0
    }),
    mounted() {
        const ding = document.getElementById('ding')
        const pling = document.getElementById('pling')
        const ing = document.getElementById('ing')

        ding.volume = 0.4
        pling.volume = 0.1
        ing.volume = 0.1

        const playSound = () => {
            ding.currentTime = 0.0
            ding.play()
            pling.currentTime = 0.0
            pling.play()
            ing.currentTime = 0.0
            ing.play()
        }

        if(this.val != true) {
            const myInterval = setInterval(() => {
                if(this.dat != parseInt(this.val)) {
                    playSound()
                    this.dat++
                } else {
                    playSound()
                    clearInterval(myInterval)
                    this.$emit('done')
                }
            },95)
        } else {
            playSound()
            this.$emit('done')
        }

    }
}
</script>