<template>
	<div class="home">
		<EmojiMap/>
	</div>
</template>

<script>
// @ is an alias to /src
import EmojiMap from '@/components/EmojiMap.vue'

export default {
	name: 'Home',
	components: {
		EmojiMap
	}
}
</script>
