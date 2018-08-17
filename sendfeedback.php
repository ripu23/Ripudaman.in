<?php
    echo "Testing 1234e";
    $connect = mysqli_connect("localhost", "root", "", "resume");    
    $data = json_decode(file_get_contents("php://input"));
    
    
    
    if(count($data) > 0) {
        
        $name = mysqli_real_escape_string($connect, $data->name);
        $email = mysqli_real_escape_string($connect, $data->email);
        $message = mysqli_real_escape_string($connect, $data->message);
        $query = "INSERT INTO feedback(name, email, message) VALUES ('$name', '$email', '$message')";
        if(mysqli_query($connect, $query)){
            echo "Data inserted";
        }else{
            echo "Error";
        }
        
    }

    
?>