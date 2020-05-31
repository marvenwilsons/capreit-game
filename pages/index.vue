<template>
    <v-fade-transition>
		<div :info="info" @startGame="startGame" @preGame="preGame" :is="view" ></div>
    </v-fade-transition>
</template>

<script>
import tlStart from '@/components/tl-start.vue'
import tlPreGame from '@/components/tl-pre-game.vue'
import tlGame from '@/components/tl-game.vue'

export default {
	data: () => ({
		html2canvas: undefined,
		view: 'tl-start',
		info: undefined
	}),
	components: {
		'tl-start': tlStart,
		'tl-pre-game': tlPreGame,
		'tl-game' : tlGame
	},
	methods: {
		preGame(val) {
			this.view = 'tl-pre-game'
			this.info = val
		},
		startGame(val) {
			this.view = 'tl-game'
			console.log(val)
		}	
	}
}
</script>

<style>
@import url('assets/dq-fw-0.4.css');

.ps {
	font-family: 'Press Start 2P', cursive;
}
</style>

