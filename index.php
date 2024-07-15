<?php 
session_start();

	include("connection.php");
	include("functions.php");

	$user_data = check_login($con);

?>

<!DOCTYPE html>
<html>
<head>
	<title>My website</title>
</head>
<body>

	<a href="logout.php">Logout</a>
	<link rel="link" type="link" href="scratchcard.html"><h1>Click Here to See Your Reward </h1>



	<br>
	Hello, <?php echo $user_data['user_name']; ?>
</body>
</html>