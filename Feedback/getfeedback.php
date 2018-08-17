<?php

    
    $connect = mysqli_connect("127.0.0.1", "root", "", "resume");    
    $output = array();
    $query = "SELECT * FROM feedback";
    $result = mysqli_query($connect, $query);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
            $output[] = $row;
        }
        echo json_encode($output);
    }

?>