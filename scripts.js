/* Defined in: "Textual.app -> Contents -> Resources -> JavaScript -> API -> core.js" */

var previousTime = 0;
var previousNickname = null;
var minimalTimeDistance = 1000 * 60 * 5;

Textual.viewBodyDidLoad = function() {
	Textual.fadeOutLoadingScreen(1.00, 0.95);
}

Textual.newMessagePostedToView = function(line) {
    var element = document.getElementById("line-" + line);

	ConversationTracking.updateNicknameWithNewMessage(element);

	var timeElement = element.querySelector( '.time' );
	var currentTime = new Date( element.getAttribute( 'timestamp' ) * 1000 );
	var isSmaller = false;
	if ( currentTime - previousTime < minimalTimeDistance ) {
		isSmaller = true;
		timeElement.classList.add( 'time_isRepeating' );
	}

	previousTime = currentTime;
	if ( element.getAttribute( 'ltype' ) !== 'privmsg' ) {
		previousUser = null;
		return;
	}

	var senderElement = element.querySelector( '.sender' );
	var currentNickname = senderElement.getAttribute( 'nickname' );
	if ( currentNickname && currentNickname == previousNickname ) {
		senderElement.classList.add( 'nickname_isRepeating' );
	}

	previousNickname = currentNickname;
}

Textual.nicknameSingleClicked = function(e) {
	ConversationTracking.nicknameSingleClickEventCallback(e);
}
