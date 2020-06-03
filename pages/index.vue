<template>
    <v-fade-transition>
		<div :info="info" @gameCredits="gameCredits" @playAgain="playAgain" @startGame="startGame" @preGame="preGame" :is="view" ></div>
    </v-fade-transition>
</template>

<script>
import tlStart from '@/components/tl-start.vue'
import tlPreGame from '@/components/tl-pre-game.vue'
import tlGame from '@/components/tl-game.vue'
import tlPreGame2 from '@/components/tl-pre-game-2.vue'
import gameCredits from '@/components/credits.vue'
// import * as firebase from 'firebase'

export default {
	data: () => ({
		html2canvas: undefined,
		view: 'tl-game',
		info: undefined
	}),
	components: {
		'tl-start': tlStart,
		'tl-pre-game': tlPreGame,
		'tl-game' : tlGame,
		'tl-pre-game2': tlPreGame2,
		gameCredits
	},
	methods: {
		preGame(val) {
			this.view = 'tl-pre-game'
			this.info = val
		},
		startGame(val) {
			this.view = 'tl-game'
		},
		playAgain() {
			this.view = 'tl-pre-game2'
		},
		gameCredits() {
			this.view = 'gameCredits'
		}
	},
	mounted() {
	}
}
</script>

<style>
@import url('assets/dq-fw-0.4.css');

.ps {
	font-family: 'Press Start 2P', cursive;
}
</style>

