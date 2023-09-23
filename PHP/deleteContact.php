<?php
// Connect to your database (same as in registration)

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $inData = getRequestInfo();
    // Retrieve the contact ID from the URL
    // $contactId = $_GET['id']; Depends on frontend
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
        $stmtDelete = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
        $stmtDelete->bind_param("i", $inData['id']);
        if (!$stmtDelete->execute())
        {
            returnWithError("Failed to Delete Contact");
        }
        $stmtDelete->close();
    }
}
else {
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