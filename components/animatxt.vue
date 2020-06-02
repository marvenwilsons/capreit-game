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

        ding.volume = 0.2
        pling.volume = 0.5
        ing.volume = 0.6
        const myInterval = setInterval(() => {
            if(this.dat != parseInt(this.val)) {
                ding.currentTime = 0.0
                ding.play()
                pling.currentTime = 0.0
                pling.play()
                ing.currentTime = 0.0
                ing.play()
                this.dat++
            } else {
                clearInterval(myInterval)
                this.$emit('done')
            }
        },60)
    }
}
</script>