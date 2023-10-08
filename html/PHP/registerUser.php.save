<?php
// Connect to your database 
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    // Check connection
    $inData = getRequestInfo();
    $servername = "localhost";
    $ServerUsername = "phpDealer";
    $ServerPassword = "tTimetocode9!u";
    $dbname = "COP4331";

    $conn = new mysqli($servername, $ServerUsername, $ServerPassword, $dbname);
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
        echo $conn->connect_error;
    }
    else
    {
        // Get data from the HTML form
        $firstName = $inData['firstName'];
        $lastName = $inData['lastName'];
        $username = $inData['login'];
        $password = $inData['password'];
        $confirm_password = $inData['confirm_password'];

        // Validate input
        if (strcmp($password,$confirm_password) != 0) {
            returnWithError("Passwords Don't Match");
        }
        else
        {
            $sql = "SELECT * FROM Users WHERE Login='$username'";
            $stmtSearch = $conn->prepare($sql);
            $stmtSearch->execute();
            $result = $stmtSearch->get_result();
            //Check for duplicate username
            if ($result->num_rows > 0) {
                returnWithError("Username Exists");
            }
            else
            {
                //Close Search instance
                $stmtSearch->close();
                // Hash the new user's password
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                $sqlInsert = "INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?,?,?,?)";
                $stmtInsert = $conn->prepare($sqlInsert);
                $stmtInsert->bind_param("ssss", $firstName, $lastName, $username, $hashed_password);
                if ($stmtInsert->execute()) {
                    //Close Insert instance
                    $stmtInsert->close();
                    // Fetch the newly inserted user's information via an SQL query (Can be taken out later)
                    $sqlFind = "SELECT ID, FirstName, LastName FROM Users WHERE Login=? AND Password =?";
                    $stmtFind = $conn->prepare($sqlFind);
                    $stmtFind->bind_param("ss",$username, $hashed_password);
                    $stmtFind->execute();
                    $resultFind = $stmtFind->get_result();    
                    if ($row = $resultFind->fetch_assoc()) {
                        // Return new user information by confirming proper insertion
                        returnWithInfo( $row['FirstName'], $row['LastName'], $row['ID'] );
                    } 
                    else 
                    {
                        returnWithError("Failed to register new User");

                    }
                    //Close Find instance
                    $stmtFind->close();
                }
                else 
                {
                    returnWithError("Failed to register new User: Var Len");

                }
                //Close General instance
                $conn->close();
            }
        }
    }
}
else
{
	returnWithError("Invalid Request Method");
}
//Helper Functions
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
