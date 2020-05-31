<template>
	<div>
        <audio id="dong">
            <source src="sound-effects/dong-sound-effect.mp3" type="audio/mp3">
        </audio>
		<v-btn @mouseover="soundEffect" :style="{color:textColor}" :color="color" >
			<slot></slot>
		</v-btn>
	</div>
</template>

<script>
// import html2canvas from 'html2canvas';

export default {
    props: ['color','text-color'],
	data: () => ({
		html2canvas: undefined
	}),
	components: {
    },
    methods: {
        soundEffect() {
            const n = document.getElementById('dong')
            n.play()
        }
    }
}
</script>

<style>
@import url('assets/dq-fw-0.4.css');


</style>

