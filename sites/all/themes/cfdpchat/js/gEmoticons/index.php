<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Live Text Search with JavaScipt | WebSpeaks.in</title>
	<style>
	body {
		width: 600px;
		margin: auto;
		font-family: arial,sans-serif;
	}
	h2{
		text-align: center;
		font: italic 32px Georgia,"Times New Roman",Times,serif;
	}
	#main {
		background: none repeat scroll 0 0 #9CBC2C;
		border-radius: 5px 5px 5px 5px;
		counter-reset: fieldsets;
		padding: 20px;
		margin: auto;
		width: 400px;
	}
	textarea {
		background: none repeat scroll 0 0 #FFFFFF;
		border: medium none;
		outline: medium none;
		padding: 5px;
		width: 380px;
		height: 30px;
		font-size: 12px;
		font-family: arial,sans-serif;
	}
	.symbols{
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 14px;
		line-height: 14px;
		margin: auto;
		width: 400px;
		color: #666666;
	}
	.chatbox {
		padding: 5px 20px;
		margin: auto;
		width: 400px;
	}
	.chat {
		border-bottom:1px dotted #E3E3E3;
		padding-bottom: 5px;
		padding-top: 5px;
		font-size: 14px;
		line-height: 14px;
	}
	</style>
	<link href="style/gemoticons.css" type="text/css" rel="stylesheet" />
	<script src="js/jquery.min.js"></script>
	<script src="js/jquery.gemoticons.js"></script>
	<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery('#clickme').click(function(){
			var htm = '';
			var val = jQuery('#text').val();
			jQuery('#text').val('');
			var el = jQuery('<div class="chat">'+val+'</div>');
			jQuery('.chatbox').append(el);
			jQuery(el).gemoticon();
		});
	});
	</script>
</head>
<body>
<h2>Gmail Like Animated Emoticons Plugin</h2>
<div id="main">
	<textarea name="text" id="text">I <3 love you</textarea>
	<button id="clickme">Send chat</button>
</div>
	<div class="symbols">
		Symbols: :), :D, ;), :'(, :-o, :-/, x-(, :(, B-), :P, <3, :-|
	</div>
<div class="chatbox">
	<div class="chat">Hello world :)</div>
	<div class="chat">I am B-) cool...</div>
</div>
<script type="text/javascript">
jQuery(document).ready(function(){
	$(".chat").gemoticon();
});
</script>
<body>
</html>