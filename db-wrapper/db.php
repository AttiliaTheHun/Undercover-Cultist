<?php
  /**
   * Accept SQL queries from remote using authentication token and response the result.
   * I am only doing this shit because Heroku does not support SQLite databases.
   */

   $api_token = "Not so fast";  
    
    $db = null;
    
   class Database extends SQLite3 {
      function __construct() {
         $this->open('database.sqlite');
      }
   }
   
   function create_response_body(string $error, string $result) {
       $body = array(
           'error' => $error,
           'result' => $result
           );
       return json_encode($body);
   }
   
   function response(string $error, string $result) {
       echo create_response_body($error, $result);
       if(!is_null($db)){
            $db->close();
       }
       die();
   }
   
   /**
    * The request from the bot is supposed to look like this
    * { 
    *   "api_token": "Sozin's Comet", //not the bot one
    *   "query": "sql kinda stuff"
    * }
    */
    
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $error = 0;
        
        if($data["api_token"] != $api_token){
             http_response_code(403);
             //response("Access Denied", "");
             if(is_null($data["api_token"])){
                 response("Null Token", "");
             }
             response($data["api_token"], "Token Denied");
        }
        $query = $data["query"];

         $db = new Database();
         if(!$db) {
            $error = $db->lastErrorMsg();
            response($error, "");
         }
         
         $result = $db->query($query);
         if(!$result) {
             $error = $db->lastErrorMsg();
             response($error, "");
         }
         
        $row = array();

        $i = 0;

         while($res = $result->fetchArray(SQLITE3_ASSOC)){
                
              foreach($res as $key => $value){
                  $row[$i][$key] = $value;
              }    
              $i++;

          } 
         
         response($error, json_encode($row));
         
    /**
    * We accept only POST requests, sorry
    */
    }else {
        http_response_code(404);
        //include('404.php'); 
        die();
    }
?>
