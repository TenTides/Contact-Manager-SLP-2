<?php
// Connect to your database (same as in registration)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $inData = json_decode(file_get_contents('php://input'), true);
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
        $id = $inData['id'];
        $name = $inData['name'];
        $email = $inData['email'];
        $phone = $inData['phone'];
        $userid = $inData['userid'];

        $sql = "SELECT * FROM Contacts WHERE Name=? AND Phone=? AND Email=? AND UserID=?";
        $stmtSearch = $conn->prepare($sql);    
        $stmtSearch->bind_param("ssss", $name, $phone, $email, $userid);
        $stmtSearch->execute();
        $result = $stmtSearch->get_result();
        //Check for duplicate contact
        if ($result->num_rows > 0) {
            //If this statement is triggerd that means the user tried to edit into a duplicate contact. At this point query on frontend 
            //if the user would like to delete the contact they were editing, thus triggering deleteContact.php.
            returnWithError("Contact Already Exists"); 
        }
        else
        {
            //Close Search instance
            $stmtSearch->close();
            $sqlUpdate = "UPDATE Contacts SET Name=?, Phone=?, Email=? WHERE ID=?";
            $stmtUpdate = $conn->prepare($sqlUpdate);
            $stmtUpdate->bind_param("ssss", $name, $phone, $email,$id);
            if ($stmtUpdate->execute()) {
                //Close Update instance
                $stmtUpdate->close();
                // Fetch the newly inserted user's information via an SQL query (Can be taken out later)
                $sql = "SELECT * FROM Contacts WHERE Name=? AND Phone=? AND Email=? AND ID=?";
                $stmtFind = $conn->prepare($sql);
                $stmtFind->bind_param("ssss", $name, $phone, $email, $id);
                $stmtFind->execute();
                $resultFind = $stmtFind->get_result();    

                if ($row = $resultFind->fetch_assoc()) {
                    // Return new contact information by confirming proper insertion
                    returnWithInfo( $row['Name'], $row['Phone'], $row['Email'], $row['UserID'], $row['ID']);
                } 
                else 
                {
                    returnWithError("Failed to Find Updated Contact Record");
                }
                //Close Find instance
                $stmtFind->close();
            }
            else
            {
                returnWithError("Failed to Update Contact");
            }
            //Close General instance
            $conn->close();
        }
    }
}
else
{
    returnWithError("Invalid Request Method");
}
//Helper Functions

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