<template>
	<div id="whenisitover">
		<header class="head">
			<div class="title">when is it over</div>
			<div class="about" ref="about">
				<div class="more">
					<button @click="toggleAbout">< mehr über</button>
				</div>

				<h5>When is it over</h5>
				<p>Wann ist die Corona-Krise endlich vorbei?! Mit dieser Webseite wollen wir gemeinsam gegen COVID-19 kämpfen. Denn nur, wenn wir alle an einem Strang ziehen und zuhause bleiben, können wir die Tage in Quarantäne und die Neuinfektionen des Virus vermindern.</p>

				<h5>Über das Projekt</h5>
				<p>Wir crowd-sourcen Informationen zum Social Distancing, genauer: Bürger:innen markieren auf der Webseite anonym, dass sie momentan zuhause bleiben. Mit diesen Daten können wir anhand von einfachen epidemiologischen Modellen abschätzen, wie lange die Pandemie noch anhalten wird (s.u.).</p>
				<p>Diese Schätzung ist noch sehr ungenau während nur wenige Bürger:innen an dem Projekt teilnehmen und wird mit steigender Teilnehmerzahl genauer. Wir zeigen transparent die Genauigkeit unserer Schätzung und motivieren die Teilnehmer dadurch das Projekt in ihren sozialen Netzwerken zu teilen, mit dem Ziel die angezeigte voraussichtliche Länge der Krise immer weiter zu senken. Indem Bürger an dem Projekt teilnehmen entscheiden sie sich aktiv dazu, momentan zuhause zu bleiben, und werden durch Feedback aus sozialen Netzwerken dafür belohnt und in ihrem Engagement bestärkt. Dadurch tragen wir dazu bei, dass das Social Distancing konsequenter eingehalten wird und die Länge der Krise tatsächlich sinkt.</p>

				<h5>Modelle zur Simulation</h5>
				<p>Wir verwenden ein einfaches logistisches Modell, welchem die tagesaktuellen Daten des Robert-Koch-Instituts zugrunde liegen. Wir ermitteln die Ansteckungsrate ohne Social Distancing Maßnahmen aus dem Datensatz des Robert-Koch-Instituts und verwenden dann unsere crowd-sourced Daten um die zukünftige Ansteckungsrate zu prognostizieren. Dies ergibt eine stückweise-logistische Funktion aus der wir den Zeitpunkt abschätzen...</p>
			</div>
		</header>

		<div class="start" ref="start" v-show="isStart">
			<div class="facts">
				<div class="fact">
					<span>In</span>
					<h1>8395</h1>
					<p>Tagen endet spätestens die Corona-Krise</p>
				</div>

				<div class="fact">
					<span></span>
					<h1>2</h1>
					<p>Personen heute zuhause, um die Verbreitung zu stoppen</p>
				</div>

				<div class="fact">
					<span>denn</span>
					<h1>18610</h1>
					<p>Menschen sind momentan in Deutschland infiziert</p>
				</div>
			</div>

			<div class="cta" @click="hideStart">
				<p>Hilf, COVID-19 aufzuhalten und bleibe zuhause.</p>
				<button class="btn">Ich bleibe zuhause.</button>
			</div>

			<span class="scroll-indicator"></span>
		</div>
		<EmojiMap :isStart="isStart"/>
	</div>
</template>

<script>
import Anime from 'animejs/lib/anime.es.js'
import EmojiMap from '@/components/EmojiMap.vue'

export default {
	name: 'App',
	components: {
		EmojiMap
	},
	data () {
		return {
			isStart: true,
			aboutIsOpen: false
		}
	},
	methods: {
		hideStart () {
			const that = this
			
			Anime({
				targets: this.$refs.start,
				scale: '0.9',
				duration: 350,
				easing: 'easeOutSine',
				opacity: 0,
				complete () {
					that.isStart = false
				}
			})
		},
		toggleAbout (ev) {
			this.aboutIsOpen = !this.aboutIsOpen

			Anime({
				targets: ev.target,
				left: this.aboutIsOpen ? ['0ch', '4ch'] : ['4ch', '0ch'],
				translateX: this.aboutIsOpen ? ['0%', '100%'] : ['100%', '0%'],
				color: this.aboutIsOpen ? '#0000ff' : '#ffffff',
				duration: 250,
				easing: 'easeOutSine'
			})

			Anime({
				targets: this.$refs.about,
				translateX: this.aboutIsOpen ? ['100%', '0%'] : ['0%', '100%'],
				duration: 250,
				easing: 'easeOutSine'
			})
		}
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');

* {
	box-sizing: border-box;
}

button {
	-webkit-appearance: none;
	outline: none;
	border: none;
	background: none;
	margin-left: auto;
	cursor: pointer;
}

#whenisitover {
	font-family: 'Raleway', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

.head {
	position: absolute;
	z-index: 99;
	display: flex;
	top: 0;
	left: 0;
	right: 0;
	padding: 1.5vw 2vw;
	color: #fff;

	.title {
		font-size: 40px;
		font-weight: 700;
	}

	.more {
		transform: translateX(-100%);
		margin-bottom: 10v;
		margin-left: -5ch;
		padding-top: 18px;
		text-align: right;

		button {
			position: relative;
			font-size: 20px;
			font-weight: 700;
			color: #fff
		}
	}

	.about {
		position: absolute;
		top: 0;
		right: 0;
		width: 32%;
		min-height: 100vh;
		padding: 1.5vh 5ch 0;
		color: #0000ff;
		background-color: #fff;
		transform: translateX(100%);
	}
}

.start {
	position: relative;
	z-index: 9;
	padding-top: 50px;
	color: #fff;
	background-color: rgba(0, 0, 255, 0.95);
	min-height: 100vh;

	.facts {
		display: flex;
		justify-content: space-around;
		padding: 12vh 5vw 0;

		.fact {
			flex: 1 1 33.333333%;
			margin-left: 2%;

			&:first-child {
				margin-left: 0%;
			}

			span {
				display: block;
				font-weight: 700;
				height: 2ex;
			}

			p {
				font-size: 24px;
			}
		}

		h1 {
			margin: 0;
			font-size: 104px;
			font-weight: 700;
		}
	}

	.cta {
		padding-top: 12vh;
		text-align: center;

		p {
			font-size: 24px;
		}

		.btn {
			padding: 1.5ch 2ex;
			border: 2px solid #fff;
			border-radius: 12px;
			font-size: 28px;
			color: #fff;
			font-weight: bold;
			
			&:hover {
				background-color: rgba(#fff, 0.15);
			}
		}
	}
}


</style>
