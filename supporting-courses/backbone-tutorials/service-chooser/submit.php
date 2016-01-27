<!DOCTYPE html>
<html>
	
    <head>
        <meta charset="utf-8" />
        <title>Your first Backbone.js App | Tutorialzine </title>
        
        <!-- Google web fonts -->
		<link href="http://fonts.googleapis.com/css?family=PT+Sans:400,700" rel='stylesheet' />

        <!-- The main CSS file -->
		<link href="assets/css/style.css" rel="stylesheet" />
		
    </head>
    
    <body>
    	
		<div id="main" method="post" action="submit.php">
			<h1>My Services</h1>

			<p id="services">
				You chose: <?php echo htmlspecialchars(implode(array_keys($_POST), ', '));?> <br />
				<a href="index.html">Go back</a>
			</p>

		</div>
		
		<!-- Only used for the demos. Please ignore and remove. --> 
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="http://cdn.tutorialzine.com/misc/enhance/v1.js" async></script>
    </body>
</html>

