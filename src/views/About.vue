<template>
	<div class="about">
		<Plot id="plot"/>
	</div>
</template>

<script>
import Plot from '@/components/Plot.vue'

export default {
	name: 'About',
	components: {
		Plot
	}
}
</script>

<style lang="scss">
#plot {
	width: 800px;
	height: 600px;
}
</style>
