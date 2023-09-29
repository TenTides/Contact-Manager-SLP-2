<?php
// Connect to your database (same as in registration)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $inData = getRequestInfo();
    $servername = "localhost";
    $ServerUsername = "phpDealer";
    $ServerPassword = "tTimetocode9!u";
    $dbname = "COP4331";

    $conn = new mysqli($servername, $ServerUsername, $ServerPassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    }
    else
    {
        //BEFORE RUNNING THIS, MAKE SURE THE ID PASSED FROM JSON IS NOT CONFLATED WITH USERID
        $stmtDelete = $conn->prepare("DELETE FROM Contacts WHERE userID = ?");
        $stmtDelete->bind_param("i", $inData['userid']);
        if (!$stmtDelete->execute())
        {
            returnWithError("Failed to Delete User");
        }
        //BEFORE RUNNING THIS, MAKE SURE THE ID PASSED FROM JSON IS THE USERID
        $stmtDelete2 = $conn->prepare("DELETE FROM Users WHERE ID = ?");
        $stmtDelete2->bind_param("i", $inData['userid']);
        if (!$stmtDelete2->execute())
        {
            returnWithError("Failed to Delete User");
        }
        $stmtDelete2->close();
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
    $retValue = '{"id":0,"name":"","phone":"","email":"","userid":"","error":"' . $err .'"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $name, $phone,$email, $userid, $id )
{
    $retValue = '{"id":' . $id . ',"name":"' . $name . '","phone":"' . $phone . '","email":"' . $email . '","userid":"' . $userid . '","error":""}';
    sendResultInfoAsJson( $retValue );
}
?>