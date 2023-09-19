
<?php

	$inData = getRequestInfo();
	
    $servername = "localhost";
    $ServerUsername = "phpDealer";
    $ServerPassword = "tTimetocode9!u";
    $dbname = "COP4331";

	$conn = new mysqli($servername, $ServerUsername, $ServerPassword, $dbname);
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $username = $inData['login'];
        $password = $inData['password'];

		$stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Users WHERE Login=?");
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
            if (password_verify($password, $row['Password'])) 
            {
                returnWithInfo( $row['FirstName'], $row['LastName'], $row['ID'] );
            } 
            else 
            {
                returnWithError("Invalid Username or Password");
            }
        }
		else
		{
			returnWithError("Invalid Username or Password");
		}

		$stmt->close();
		$conn->close();
	}
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
