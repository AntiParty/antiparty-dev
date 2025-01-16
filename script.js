const initialMessages = [
	'This is a random Message',
	'<img src="https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x.avif">Welcome to my Twitch chat codepen KonCha',
	'Enter some text',
	'LUL and some emotes',
	'And enjoy my little creation SeemsGood',
    'MercyWing1 PinkMercy MercyWing2',
];

const commands = {
    "!hello": () => "Hello there!",
}

window.onload = initiateApp;
const menu = document.querySelector('.menu');

// Function to start the app
function initiateApp() {
	setupEventListeners();
    initialMessages.forEach(message => convertFormMessageToChatMessage(message, 'AntipartyBot', "#07FF68"))
    setupEmotes();
}

function handleMenuClick(e) {
    if(e.target.tagName == 'IMG') {
        handleEmoteClickInEmoteListMenu(e);
    }
}

// Setting up event listeners
function setupEventListeners() {
	document.querySelector('.actions-form')
		.addEventListener('submit', handleFormSubmit);
    
	document.querySelector('.emotes-button')
		.addEventListener('click', handleEmoteButtonClick);
    
	document.querySelector('.actions-rewards') 
		.addEventListener('click', handleRewardsButtonClick);
    
    document.querySelector('.menu')
        .addEventListener('click', handleMenuClick);
    
    document.querySelector('.form-button')
        .addEventListener('click', () => document.querySelector('[type=submit]').click());
}

// Handle form submission
function handleFormSubmit(e) {
	e.preventDefault();
    const messageText = document.querySelector('.input-message').value;
    if(messageText.length <= 0) return;     
    
    if (messageText.startsWith('!')) {
        handleCommand(messageText);
    } else {
        convertFormMessageToChatMessage(messageText, 'You');
    }
	this.reset();
}

function handleCommand(commandText) {
    const command = commands[commandText];
    if (command) {
        const response = typeof 'function' ? command() : command;
        convertFormMessageToChatMessage(response, 'AntipartyBot', "#07FF68");
    } else {
        convertFormMessageToChatMessage('Command not found', 'AntipartyBot', "#07FF68");
    }
}

// Handle emote button click
function handleEmoteButtonClick() {
	handleMenuToggle('.emote-list')
}

// Handle rewards button click
function handleRewardsButtonClick () {
	handleMenuToggle('.rewards-list')
}

// Handle menu toggle logic
function handleMenuToggle(classCheck) {
	if(menu.classList.contains('menu-active')) {
		menu.classList.remove('menu-active');
	} else {
        const activeMenuChild = document.querySelector('.show');
        if(!activeMenuChild) {
            document.querySelector(classCheck).classList.add('show');
        } else if(!activeMenuChild.classList.contains(classCheck)) {
            activeMenuChild.classList.remove('show');
            document.querySelector(classCheck).classList.add('show');
        }
        menu.classList.add('menu-active');
	}
}


function convertFormMessageToChatMessage(messageText, user, color = '#9D9CFC') {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    
    const messageUser = document.createElement('span');
    messageUser.classList.add('message-user');
    messageUser.style.color = color;

    // Add badge in front if the user is the bot
    if (user === 'AntipartyBot') {
        const badge = document.createElement('img');
        badge.src = 'https://7tv.app/emotes/01GJ5JDNF8000DME7NTZSXDMYV'; 
        badge.alt = 'Bot Badge';
        badge.style.width = '16px';
        badge.style.height = '16px';
        badge.style.marginRight = '4px';
        messageUser.appendChild(badge); 
    }

    const usernameText = document.createTextNode(user);
    messageUser.appendChild(usernameText); 

    const messageP = document.createElement('span');
    messageP.classList.add('message-text');
    messageP.innerHTML = messageText;
    
    messageContainer.appendChild(messageUser);
    messageContainer.appendChild(messageP);
    
    document.querySelector('.messages').appendChild(messageContainer);
}
