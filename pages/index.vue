<template>
	<div :is="view" ></div>
</template>

<script>
import tlStart from '@/components/tl-start.vue'

export default {
	data: () => ({
		html2canvas: undefined,
		view: 'tl-start'
	}),
	components: {
		'tl-start': tlStart
	}
}
</script>

<style>
@import url('assets/dq-fw-0.4.css');

.ps {
	font-family: 'Press Start 2P', cursive;
}
</style>

