<template>
	<div>
		<canvas id="emojimap" @mousemove="onmousemove" @click="onmouseclick"></canvas>
		<span id="indicator" ref="indicator"></span>
		<span id="prediction" ref="prediction"></span>

		<div class="tooltips">
			<div class="tooltip select-emoji" v-show="!isStart">
				<button><span @click="selectEmoji">😍</span> <span @click="selectEmoji">💙</span> <span @click="selectEmoji">🌈</span> <span></span></button>
				<p>Wähle dein Emoji aus und platziere es auf der Karte, um gemeinsam dem Corona Ausbreitungsfläche wegzunehmen.</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EmojiMap',
	props: ['isStart'],
	data () {
		const data = {
			emojis: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','💋','💌','💘','💝','💖','💗','💓','💞','💕','💟','❣️','💔','❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍','💯','💢','💥','💫','💦','💨','🕳️','💣','💬','👁️‍🗨️','🗨️','🗯️','💭','💤','👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','🦷','🦴','👀','👁️','👅','👄','👶','🧒','👦','👧','🧑','👱','👨','🧔','👨‍🦰','👨‍🦱','👨‍🦳','👨‍🦲','👩','👩‍🦰','🧑‍🦰','👩‍🦱','🧑‍🦱','👩‍🦳','🧑‍🦳','👩‍🦲','🧑‍🦲','👱‍♀️','👱‍♂️','🧓','👴','👵','🙍','🙍‍♂️','🙍‍♀️','🙎','🙎‍♂️','🙎‍♀️','🙅','🙅‍♂️','🙅‍♀️','🙆','🙆‍♂️','🙆‍♀️','💁','💁‍♂️','💁‍♀️','🙋','🙋‍♂️','🙋‍♀️','🧏','🧏‍♂️','🧏‍♀️','🙇','🙇‍♂️','🙇‍♀️','🤦','🤦‍♂️','🤦‍♀️','🤷','🤷‍♂️','🤷‍♀️','🧑‍⚕️','👨‍⚕️','👩‍⚕️','🧑‍🎓','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍⚖️','👨‍⚖️','👩‍⚖️','🧑‍🌾','👨‍🌾','👩‍🌾','🧑‍🍳','👨‍🍳','👩‍🍳','🧑‍🔧','👨‍🔧','👩‍🔧','🧑‍🏭','👨‍🏭','👩‍🏭','🧑‍💼','👨‍💼','👩‍💼','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍💻','👨‍💻','👩‍💻','🧑‍🎤','👨‍🎤','👩‍🎤','🧑‍🎨','👨‍🎨','👩‍🎨','🧑‍✈️','👨‍✈️','👩‍✈️','🧑‍🚀','👨‍🚀','👩‍🚀','🧑‍🚒','👨‍🚒','👩‍🚒','👮','👮‍♂️','👮‍♀️','🕵️','🕵️‍♂️','🕵️‍♀️','💂','💂‍♂️','💂‍♀️','🥷','👷','👷‍♂️','👷‍♀️','🤴','👸','👳','👳‍♂️','👳‍♀️','👲','🧕','🤵','🤵‍♂️','🤵‍♀️','👰','👰‍♂️','👰‍♀️','🤰','🤱','👩‍🍼','👨‍🍼','🧑‍🍼','👼','🎅','🤶','🧑‍🎄','🦸','🦸‍♂️','🦸‍♀️','🦹','🦹‍♂️','🦹‍♀️','🧙','🧙‍♂️','🧙‍♀️','🧚','🧚‍♂️','🧚‍♀️','🧛','🧛‍♂️','🧛‍♀️','🧜','🧜‍♂️','🧜‍♀️','🧝','🧝‍♂️','🧝‍♀️','🧞','🧞‍♂️','🧞‍♀️','🧟','🧟‍♂️','🧟‍♀️','💆','💆‍♂️','💆‍♀️','💇','💇‍♂️','💇‍♀️','🚶','🚶‍♂️','🚶‍♀️','🧍','🧍‍♂️','🧍‍♀️','🧎','🧎‍♂️','🧎‍♀️','🧑‍🦯','👨‍🦯','👩‍🦯','🧑‍🦼','👨‍🦼','👩‍🦼','🧑‍🦽','👨‍🦽','👩‍🦽','🏃','🏃‍♂️','🏃‍♀️','💃','🕺','🕴️','👯','👯‍♂️','👯‍♀️','🧖','🧖‍♂️','🧖‍♀️','🧗','🧗‍♂️','🧗‍♀️','🤺','🏇','⛷️','🏂','🏌️','🏌️‍♂️','🏌️‍♀️','🏄','🏄‍♂️','🏄‍♀️','🚣','🚣‍♂️','🚣‍♀️','🏊','🏊‍♂️','🏊‍♀️','⛹️','⛹️‍♂️','⛹️‍♀️','🏋️','🏋️‍♂️','🏋️‍♀️','🚴','🚴‍♂️','🚴‍♀️','🚵','🚵‍♂️','🚵‍♀️','🤸','🤸‍♂️','🤸‍♀️','🤼','🤼‍♂️','🤼‍♀️','🤽','🤽‍♂️','🤽‍♀️','🤾','🤾‍♂️','🤾‍♀️','🤹','🤹‍♂️','🤹‍♀️','🧘','🧘‍♂️','🧘‍♀️','🛀','🛌','🧑‍🤝‍🧑','👭','👫','👬','💏','👩‍❤️‍💋‍👨','👨‍❤️‍💋‍👨','👩‍❤️‍💋‍👩','💑','👩‍❤️‍👨','👨‍❤️‍👨','👩‍❤️‍👩','👪','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦','👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👨‍👨‍👦','👨‍👨‍👧','👨‍👨‍👧‍👦','👨‍👨‍👦‍👦','👨‍👨‍👧‍👧','👩‍👩‍👦','👩‍👩‍👧','👩‍👩‍👧‍👦','👩‍👩‍👦‍👦','👩‍👩‍👧‍👧','👨‍👦','👨‍👦‍👦','👨‍👧','👨‍👧‍👦','👨‍👧‍👧','👩‍👦','👩‍👦‍👦','👩‍👧','👩‍👧‍👦','👩‍👧‍👧','🗣️','👤','👥','🫂','👣','🐵','🐒','🦍','🦧','🐶','🐕','🦮','🐕‍🦺','🐩','🐺','🦊','🦝','🐱','🐈','🐈‍⬛','🦁','🐯','🐅','🐆','🐴','🐎','🦄','🦓','🦌','🦬','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪','🐫','🦙','🦒','🐘','🦣','🦏','🦛','🐭','🐁','🐀','🐹','🐰','🐇','🐿️','🦫','🦔','🦇','🐻','🐻‍❄️','🐨','🐼','🦥','🦦','🦨','🦘','🦡','🐾','🦃','🐔','🐓','🐣','🐤','🐥','🐦','🐧','🕊️','🦅','🦆','🦢','🦉','🦤','🪶','🦩','🦚','🦜','🐸','🐊','🐢','🦎','🐍','🐲','🐉','🦕','🦖','🐳','🐋','🐬','🦭','🐟','🐠','🐡','🦈','🐙','🐚','🐌','🦋','🐛','🐜','🐝','🪲','🐞','🦗','🪳','🕷️','🕸️','🦂','🦟','🪰','🪱','🦠','💐','🌸','💮','🏵️','🌹','🥀','🌺','🌻','🌼','🌷','🌱','🪴','🌲','🌳','🌴','🌵','🌾','🌿','☘️','🍀','🍁','🍂','🍃','🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🫐','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅','🍄','🥜','🌰','🍞','🥐','🥖','🫓','🥨','🥯','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🫔','🥙','🧆','🥚','🍳','🥘','🍲','🫕','🥣','🥗','🍿','🧈','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🥤','🧋','🧃','🧉','🧊','🥢','🍽️','🍴','🥄','🔪','🏺','🌍','🌎','🌏','🌐','🗺️','🗾','🧭','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🧱','🪨','🪵','🛖','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','⛩️','🕋','⛲','⛺','🌁','🌃','🏙️','🌄','🌅','🌆','🌇','🌉','♨️','🎠','🎡','🎢','💈','🎪','🚂','🚃','🚄','🚅','🚆','🚇','🚈','🚉','🚊','🚝','🚞','🚋','🚌','🚍','🚎','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗','🚘','🚙','🛻','🚚','🚛','🚜','🏎️','🏍️','🛵','🦽','🦼','🛺','🚲','🛴','🛹','🛼','🚏','🛣️','🛤️','🛢️','⛽','🚨','🚥','🚦','🛑','🚧','⚓','⛵','🛶','🚤','🛳️','⛴️','🛥️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🛎️','🧳','⌛','⏳','⌚','⏰','⏱️','⏲️','🕰️','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕡','🕖','🕢','🕗','🕣','🕘','🕤','🕙','🕥','🕚','🕦','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌙','🌚','🌛','🌜','🌡️','☀️','🌝','🌞','🪐','⭐','🌟','🌠','🌌','☁️','⛅','⛈️','🌤️','🌥️','🌦️','🌧️','🌨️','🌩️','🌪️','🌫️','🌬️','🌀','🌈','🌂','☂️','☔','⛱️','⚡','❄️','☃️','⛄','☄️','🔥','💧','🌊','🎃','🎄','🎆','🎇','🧨','✨','🎈','🎉','🎊','🎋','🎍','🎎','🎏','🎐','🎑','🧧','🎀','🎁','🎗️','🎟️','🎫','🎖️','🏆','🏅','🥇','🥈','🥉','⚽','⚾','🥎','🏀','🏐','🏈','🏉','🎾','🥏','🎳','🏏','🏑','🏒','🥍','🏓','🏸','🥊','🥋','🥅','⛳','⛸️','🎣','🤿','🎽','🎿','🛷','🥌','🎯','🪀','🪁','🎱','🔮','🪄','🧿','🎮','🕹️','🎰','🎲','🧩','🧸','🪅','🪆','♠️','♥️','♦️','♣️','♟️','🃏','🀄','🎴','🎭','🖼️','🎨','🧵','🪡','🧶','🪢','👓','🕶️','🥽','🥼','🦺','👔','👕','👖','🧣','🧤','🧥','🧦','👗','👘','🥻','🩱','🩲','🩳','👙','👚','👛','👜','👝','🛍️','🎒','🩴','👞','👟','🥾','🥿','👠','👡','🩰','👢','👑','👒','🎩','🎓','🧢','🪖','⛑️','📿','💄','💍','💎','🔇','🔈','🔉','🔊','📢','📣','📯','🔔','🔕','🎼','🎵','🎶','🎙️','🎚️','🎛️','🎤','🎧','📻','🎷','🪗','🎸','🎹','🎺','🎻','🪕','🥁','🪘','📱','📲','☎️','📞','📟','📠','🔋','🔌','💻','🖥️','🖨️','⌨️','🖱️','🖲️','💽','💾','💿','📀','🧮','🎥','🎞️','📽️','🎬','📺','📷','📸','📹','📼','🔍','🔎','🕯️','💡','🔦','🏮','🪔','📔','📕','📖','📗','📘','📙','📚','📓','📒','📃','📜','📄','📰','🗞️','📑','🔖','🏷️','💰','🪙','💴','💵','💶','💷','💸','💳','🧾','💹','✉️','📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳️','✏️','✒️','🖋️','🖊️','🖌️','🖍️','📝','💼','📁','📂','🗂️','📅','📆','🗒️','🗓️','📇','📈','📉','📊','📋','📌','📍','📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗑️','🔒','🔓','🔏','🔐','🔑','🗝️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','🔫','🪃','🏹','🛡️','🪚','🔧','🪛','🔩','⚙️','🗜️','⚖️','🦯','🔗','⛓️','🪝','🧰','🧲','🪜','⚗️','🧪','🧫','🧬','🔬','🔭','📡','💉','🩸','💊','🩹','🩺','🚪','🛗','🪞','🪟','🛏️','🛋️','🪑','🚽','🪠','🚿','🛁','🪤','🪒','🧴','🧷','🧹','🧺','🧻','🪣','🧼','🪥','🧽','🧯','🛒','🚬','⚰️','🪦','⚱️','🗿','🪧','🏧','🚮','🚰','♿','🚹','🚺','🚻','🚼','🚾','🛂','🛃','🛄','🛅','⚠️','🚸','⛔','🚫','🚳','🚭','🚯','🚱','🚷','📵','🔞','☢️','☣️','⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔃','🔄','🔙','🔚','🔛','🔜','🔝','🛐','⚛️','🕉️','✡️','☸️','☯️','✝️','☦️','☪️','☮️','🕎','🔯','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔀','🔁','🔂','▶️','⏩','⏭️','⏯️','◀️','⏪','⏮️','🔼','⏫','🔽','⏬','⏸️','⏹️','⏺️','⏏️','🎦','🔅','🔆','📶','📳','📴','♀️','♂️','⚧️','✖️','➕','➖','➗','♾️','‼️','⁉️','❓','❔','❕','❗','〰️','💱','💲','⚕️','♻️','⚜️','🔱','📛','🔰','⭕','✅','☑️','✔️','❌','❎','➰','➿','〽️','✳️','✴️','❇️','©️','®️','™️','#️⃣','*️⃣','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔠','🔡','🔢','🔣','🔤','🅰️','🆎','🅱️','🆑','🆒','🆓','ℹ️','🆔','Ⓜ️','🆕','🆖','🅾️','🆗','🅿️','🆘','🆙','🆚','🈁','🈂️','🈷️','🈶','🈯','🉐','🈹','🈚','🈲','🉑','🈸','🈴','🈳','㊗️','㊙️','🈺','🈵','🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪','🟥','🟧','🟨','🟩','🟦','🟪','🟫','⬛','⬜','◼️','◻️','◾','◽','▪️','▫️','🔶','🔷','🔸','🔹','🔺','🔻','💠','🔘','🔳','🔲','🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️','🇦🇨','🇦🇩','🇦🇪','🇦🇫','🇦🇬','🇦🇮','🇦🇱','🇦🇲','🇦🇴','🇦🇶','🇦🇷','🇦🇸','🇦🇹','🇦🇺','🇦🇼','🇦🇽','🇦🇿','🇧🇦','🇧🇧','🇧🇩','🇧🇪','🇧🇫','🇧🇬','🇧🇭','🇧🇮','🇧🇯','🇧🇱','🇧🇲','🇧🇳','🇧🇴','🇧🇶','🇧🇷','🇧🇸','🇧🇹','🇧🇻','🇧🇼','🇧🇾','🇧🇿','🇨🇦','🇨🇨','🇨🇩','🇨🇫','🇨🇬','🇨🇭','🇨🇮','🇨🇰','🇨🇱','🇨🇲','🇨🇳','🇨🇴','🇨🇵','🇨🇷','🇨🇺','🇨🇻','🇨🇼','🇨🇽','🇨🇾','🇨🇿','🇩🇪','🇩🇬','🇩🇯','🇩🇰','🇩🇲','🇩🇴','🇩🇿','🇪🇦','🇪🇨','🇪🇪','🇪🇬','🇪🇭','🇪🇷','🇪🇸','🇪🇹','🇪🇺','🇫🇮','🇫🇯','🇫🇰','🇫🇲','🇫🇴','🇫🇷','🇬🇦','🇬🇧','🇬🇩','🇬🇪','🇬🇫','🇬🇬','🇬🇭','🇬🇮','🇬🇱','🇬🇲','🇬🇳','🇬🇵','🇬🇶','🇬🇷','🇬🇸','🇬🇹','🇬🇺','🇬🇼','🇬🇾','🇭🇰','🇭🇲','🇭🇳','🇭🇷','🇭🇹','🇭🇺','🇮🇨','🇮🇩','🇮🇪','🇮🇱','🇮🇲','🇮🇳','🇮🇴','🇮🇶','🇮🇷','🇮🇸','🇮🇹','🇯🇪','🇯🇲','🇯🇴','🇯🇵','🇰🇪','🇰🇬','🇰🇭','🇰🇮','🇰🇲','🇰🇳','🇰🇵','🇰🇷','🇰🇼','🇰🇾','🇰🇿','🇱🇦','🇱🇧','🇱🇨','🇱🇮','🇱🇰','🇱🇷','🇱🇸','🇱🇹','🇱🇺','🇱🇻','🇱🇾','🇲🇦','🇲🇨','🇲🇩','🇲🇪','🇲🇫','🇲🇬','🇲🇭','🇲🇰','🇲🇱','🇲🇲','🇲🇳','🇲🇴','🇲🇵','🇲🇶','🇲🇷','🇲🇸','🇲🇹','🇲🇺','🇲🇻','🇲🇼','🇲🇽','🇲🇾','🇲🇿','🇳🇦','🇳🇨','🇳🇪','🇳🇫','🇳🇬','🇳🇮','🇳🇱','🇳🇴','🇳🇵','🇳🇷','🇳🇺','🇳🇿','🇴🇲','🇵🇦','🇵🇪','🇵🇫','🇵🇬','🇵🇭','🇵🇰','🇵🇱','🇵🇲','🇵🇳','🇵🇷','🇵🇸','🇵🇹','🇵🇼','🇵🇾','🇶🇦','🇷🇪','🇷🇴','🇷🇸','🇷🇺','🇷🇼','🇸🇦','🇸🇧','🇸🇨','🇸🇩','🇸🇪','🇸🇬','🇸🇭','🇸🇮','🇸🇯','🇸🇰','🇸🇱','🇸🇲','🇸🇳','🇸🇴','🇸🇷','🇸🇸','🇸🇹','🇸🇻','🇸🇽','🇸🇾','🇸🇿','🇹🇦','🇹🇨','🇹🇩','🇹🇫','🇹🇬','🇹🇭','🇹🇯','🇹🇰','🇹🇱','🇹🇲','🇹🇳','🇹🇴','🇹🇷','🇹🇹','🇹🇻','🇹🇼','🇹🇿','🇺🇦','🇺🇬','🇺🇲','🇺🇳','🇺🇸','🇺🇾','🇺🇿','🇻🇦','🇻🇨','🇻🇪','🇻🇬','🇻🇮','🇻🇳','🇻🇺','🇼🇫','🇼🇸','🇽🇰','🇾🇪','🇾🇹','🇿🇦','🇿🇲','🇿🇼','🏴','🏴','🏴'],
			infectedEmoji: '🟥',
			selectedEmoji: null,
			BLOCKS: [],
			STOREDBLOCKS: this.$store.state.BLOCKS,
			STOREDEMOJIS: [],
			infections: 18610,
			tileSquare: 100,
			tileSize: 8,
			gutter: 3,
			// Zoom relevant
			mouseX: -1,
			mouseY: -1,
			dragPosition: null,
			mouseIsMoving: false,
			scaleFactor: 1.1,
		}

		return data
	},
	mounted () {
		const SVG = document.createElementNS("http://www.w3.org/2000/svg",'svg')
		
		this.$canvas = document.getElementById('emojimap')
		this.$ctx = this.$canvas.getContext('2d')

		this.SVGPoint = SVG.createSVGPoint()
		this.SVGMatrix = SVG.createSVGMatrix();

		this.setupZoom()
		this.setup()

		this.$nextTick(function() {
			window.addEventListener('resize', this.setup)
			this.$canvas.addEventListener('DOMMouseScroll', this.onmousescroll, false)
			this.$canvas.addEventListener('mousewheel', this.onmousescroll, false)
			this.$canvas.addEventListener('mousedown', this.onmousedown, false)
			this.$canvas.addEventListener('mousemove', this.onmousemove, false)
			this.$canvas.addEventListener('mouseup', this.onmouseup, false)
		})
		
		// Perfomance wise add offscreen canvas
		/*
		const offscreen = this.$canvas.transferControlToOffscreen()
		const worker = new Worker('service-worker.js');
		worker.postMessage({ canvas: offscreen }, [offscreen]);
		*/
	},
	methods: {
		onmousemove (ev) {
			this.mouseX = ev.offsetX || (ev.pageX - this.$canvas.offsetLeft)
			this.mouseY = ev.offsetY || (ev.pageY - this.$canvas.offsetTop)

			this.mouseIsMoving = true
			if (this.dragPosition){
				const SVGPoint = this.$ctx.transformedPoint(this.mouseX, this.mouseY)
				this.$ctx.translate(SVGPoint.x - this.dragPosition.x, SVGPoint.y - this.dragPosition.y)
				this.draw()
			} else {
				this.predictPosition(this.mouseY, this.mouseX)

				this.$refs.indicator.style.top = `${this.mouseY}px`
				this.$refs.indicator.style.left = `${this.mouseX}px`
			}
		},
		onmouseclick (ev) {
			if (this.selectedEmoji) {
				this.mouseX = ev.offsetX || (ev.pageX - this.$canvas.offsetLeft)
				this.mouseY = ev.offsetY || (ev.pageY - this.$canvas.offsetTop)

				let x = Math.round(this.mouseX / this.tileSize)
				let y = Math.round(this.mouseY / this.tileSize)

				this.addEmoji(x, y)
			}
		},
		onmousescroll (ev) {
			var delta = ev.wheelDelta ? ev.wheelDelta / 40 : ev.detail ? -ev.detail : 0

			if (delta) this.zoom(delta)

			return ev.preventDefault() && false
		},
		onmousedown (ev) {
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';

			this.mouseX = ev.offsetX || (ev.pageX - this.$canvas.offsetLeft)
			this.mouseY = ev.offsetY || (ev.pageY - this.$canvas.offsetTop)

			this.dragPosition = this.$ctx.transformedPoint(this.mouseX, this.mouseY)
			this.mouseIsMoving = false
		},
		onmouseup (ev) {
			this.dragPosition = null
		},
		setupZoom () {
			this.$ctx.transformedPoint = (x, y) => {
				this.SVGPoint.x = x
				this.SVGPoint.y = y
				return this.SVGPoint.matrixTransform(this.SVGMatrix.inverse());
			}

			this.$ctx.getTransform = () => {
				return this.SVGMatrix
			}

			const savedTransforms = []
			let save = this.$ctx.save
			this.$ctx.save = () => {
				savedTransforms.push(this.SVGMatrix.translate(0, 0))
				return save.call(this.$ctx)
			}

			var restore = this.$ctx.restore
			this.$ctx.restore = () => {
				this.SVGMatrix = savedTransforms.pop()
				return restore.call(this.$ctx)
			}

			var scale = this.$ctx.scale
			this.$ctx.scale = (sx, sy) => {
				this.SVGMatrix = this.SVGMatrix.scaleNonUniform(sx, sy)
				return scale.call(this.$ctx, sx, sy)
			}

			var rotate = this.$ctx.rotate
			this.$ctx.rotate = (radians) => {
				this.SVGMatrix = this.SVGMatrix.rotate(radians * 180 / Math.PI)
				return rotate.call(this.$ctx, radians)
			}

			var translate = this.$ctx.translate
			this.$ctx.translate = (dx, dy) => {
				this.SVGMatrix = this.SVGMatrix.translate(dx, dy)
				return translate.call(this.$ctx, dx, dy)
			}

			var transform = this.$ctx.transform
			this.$ctx.transform = (a, b, c, d, e, f) => {
				var m2 = svg.createSVGMatrix()
					m2.a = a
					m2.b = b
					m2.c = c
					m2.d = d
					m2.e = e
					m2.f = f

				this.SVGMatrix = this.SVGMatrix.multiply(m2)
				return transform.call(this.$ctx, a, b, c, d, e, f)
			}

			var setTransform = this.$ctx.setTransform
			this.$ctx.setTransform = (a, b, c, d, e, f) => {
				this.SVGMatrix.a = a
				this.SVGMatrix.b = b
				this.SVGMatrix.c = c
				this.SVGMatrix.d = d
				this.SVGMatrix.e = e
				this.SVGMatrix.f = f
				return setTransform.call(this.$ctx, a, b, c, d, e, f)
			}
		},
		setup () {
			this.$canvas.width = `${this.$canvas.offsetWidth}`
			this.$canvas.height = `${this.$canvas.offsetHeight}`

			this.offsetX = this.$canvas.width / 2
			this.offsetY = this.$canvas.height / 2

			this.$refs.prediction.style.top = `-${this.tileSize}px`
			this.$refs.prediction.style.left = `-${this.tileSize}px`

			this.$refs.prediction.style.width = `${this.tileSize}px`
			this.$refs.prediction.style.height = `${this.tileSize}px`
			
			this.draw()
		},
		draw () {
			// Performance wise use this and just do a whole redraw when it is neccessary
			// this.$ctx.save()
			// this.$ctx.setTransform(1, 0, 0, 1, 0, 0)
			// this.$ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
			// this.$ctx.restore()

			// Clear
			const p1 = this.$ctx.transformedPoint(0, 0)
			const p2 = this.$ctx.transformedPoint(this.$canvas.width, this.$canvas.height)
			this.$ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y)

			// Draw red blocks
			for (let i = this.STOREDBLOCKS.length - 1; i >= 0; i--) {
				let column = this.STOREDBLOCKS[i][0]
				let row = this.STOREDBLOCKS[i][1]
				let x = column * this.tileSize + this.offsetX
				let y = row * this.tileSize + this.offsetY

				this.$ctx.font = `${this.tileSize-this.gutter}px Arial`
				this.$ctx.fillText(this.infectedEmoji, x, y)
			}

			/*
			// Draw random red blocks
			for (let i = this.infections - 1; i >= 0; i--) {
				let position = this.getRandomUniquePosition(i)
				
				this.BLOCKS.push(`${position[0]}-${position[1]}`)

				//this.$ctx.font = `${this.tileSize-this.gutter}px Arial`
				//this.$ctx.fillText(this.infectedEmoji, position[0], position[1])
				this.$ctx.fillRect(position[0], position[1], this.tileSize, this.tileSize)
			}
			*/
			
			for (let j = this.STOREDEMOJIS.length - 1; j >= 0; j--) {
				let unicode = this.STOREDEMOJIS[j][0]
				let column = this.STOREDEMOJIS[j][1]
				let row = this.STOREDEMOJIS[j][2]

				let x = column * this.tileSize
				let y = row * this.tileSize

				console.log(row)

				this.$ctx.font = `${this.tileSize}px Arial`
				this.$ctx.fillText(unicode, x, y)
			}
		},
		zoom (clicks) {
			var pt = this.$ctx.transformedPoint(this.mouseX, this.mouseY)

			this.$ctx.translate(pt.x,pt.y)

			var factor = Math.pow(this.scaleFactor, clicks)

			this.$ctx.scale(factor, factor)
			this.$ctx.translate(-pt.x,-pt.y)

			this.draw()
		},
		selectEmoji (ev) {
			this.selectedEmoji = ev.target.innerHTML
			this.$refs.indicator.innerHTML = ev.target.innerHTML
		},
		addEmoji (column, row) {
			this.STOREDEMOJIS.push([this.selectedEmoji, column, row])

			this.selectedEmoji = null
			this.$refs.indicator.innerHTML = ''

			this.draw()
		},
		predictPosition (x, y) {
			x = Math.round(x / this.tileSize) * this.tileSize
			y = Math.round(y / this.tileSize) * this.tileSize

			this.$refs.prediction.style.left = `${y}px`
			this.$refs.prediction.style.top = `${x}px`
		},
		getUniqueNeighbourPosition (tileRadius, calls = 1) {
			// Cancel after pow of 10
			if (calls > 10) {
				return null
			}

			if (this.BLOCKS.includes(id)) {
				// Find empty neighbour
				return this.getUniqueNeighbourPosition(tileRadius, calls + 1)
			}
		},
		getRandomUniquePosition (i) {
			// Die erste Zelle ist 1/1 px. Von da an, kann Random ausgegangen werden
			// Dann werden beim Rendern alle Zellen mit einem Offset gesetzt, damit es mittig ist.
			let t = 1 - (i / this.infections)
			let rad = Math.random() * (Math.PI * 2)

			// it is wrong to use the radius of infections, because if we do a unique position it with be a rectangle
			// Do something without rely on radius. Just create a radius increasing by iteration e. g.
			let tileRadius = Math.pow(t, 4) * (this.infections * (this.tileSize / 100))

			let x = (tileRadius * Math.cos(rad)) + this.tileSize
			let y = (tileRadius * Math.sin(rad)) + this.tileSize

			x = Math.round(x / this.tileSize) * this.tileSize
			y = Math.round(y / this.tileSize) * this.tileSize

			let id = `${x}-${y}`

			/*
			// Performance issue: It 
			if (this.BLOCKS.includes(id)) {
				// Find empty neighbour
				return this.getUniqueNeighbourPosition(tileRadius)

				return this.getRandomUniquePosition(i)
			}
			*/

			return [x, y]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
html, body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	//cursor: none;
}

#emojimap {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
}

#indicator {
	position: absolute;
	pointer-events: none;
	font-size: 32px;
	line-height: 0;
}

#prediction {
	position: absolute;
	pointer-events: none;
	border: 1px solid #0000ff;
	transform: translate(50%, -100%)
}

.tooltip {
	position: fixed;
	z-index: 999;
	background: #fff;
	border-radius: 20px;
	border: 2px solid #0000ff;
	width: 33.333333vw;
	margin: auto;
	padding: 2ch;
	font-weight: 700;
	text-align: center;

	button {
		border-radius: 12px;
		border: 2px solid #0000ff;
		padding: 2ch;
		width: 100%;
		font-size: 32px;
		line-height: 0;

		> span:hover {
			text-shadow: 0 0 12px rgba(#0000ff, 0.35);
		}
	}

	&.select-emoji {
		bottom: 12vh;
		left: 0;
		right: 0;
	}
}
</style>
