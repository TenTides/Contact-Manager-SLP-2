<?php
// Connect to your database (same as in registration)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
        $name = $inData["searchquery"];
        $userid = $inData['userid'];
        $sql = "SELECT Name,Phone,Email,UserID,ID FROM Contacts WHERE Name LIKE ? AND UserID =?";
        $finalname = "%".$name."%";
        $stmtSearch = $conn->prepare($sql);    
        $stmtSearch->bind_param("ss", $finalname, $userid);
        $stmtSearch->execute();
        $result = $stmtSearch->get_result();
        $resultList = []; // Initialize an empty array to store the JSON records
        $count = 0;
        while ($row = $result->fetch_assoc()) {
            // Construct a JSON record for each row and append it to the result list
            $count++;
            $record = '{"id":' . $row["ID"] . ',"name":"' . $row["Name"] . '","phone":"' . $row["Phone"] . '","email":"' . $row["Email"] . '","userid":"' . $row["UserID"] . '","error":""}';
            $resultList[] = $record;
        }
        $jsonResult = '[' . implode(',', $resultList) . ']';
        if($count == 0)
        {
            returnWithError( "No Contacts matching search parameters exist");
        }
        else
        {
            returnWithInfo($jsonResult);
        }
        $stmtSearch->close();
        $conn->close();
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
    //For Search Contact the error statement comes out in a one element list json (can be changed if needed)
    $retValue = '[{"id":0,"name":"","phone":"","email":"","userid":"","error":"' . $err .'"}]';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $jsonResult)
{
    sendResultInfoAsJson( $jsonResult);
}
?>
