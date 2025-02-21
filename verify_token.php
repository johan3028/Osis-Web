<?php
header('Content-Type: application/json');


$validTokens = [
    'https://qrfy.io/r/f3Kg7YdeJ1.com',
    'https://example.com/token/new-valid-token-3', 
    'https://example.com/token/new-valid-token-4', 
    'https://example.com/token/example-token-5',   
    'https://example.com/token/example-token-6',   
    'https://example.com/token/example-token-7',   
    'https://example.com/token/example-token-8'
     ]    

$token = $_POST['token'];

$response = ['valid' => in_array($token, $validTokens)];

echo json_encode($response);
?>