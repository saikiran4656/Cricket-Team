const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
app.use(express.json());
const dataBasePath = path.join(__dirname,"cricketTeam.db");
let db = null;


const initializeDbAndServer = async () => {
    try{
        db = await open({
            filename:dataBasePath,
            driver:sqlite3.Database
        })
        app.listen(3000,() =>
            console.log("Server Running at http://localhost:3000/");
    ``);

    } catch(e){
        console.log(`DB.Error:${e.message}`);
        process.exit(1);
    }
};

initializeDbAndServer();


const creatDbObjectToResponseObject = (dbObject) =>{
    return {
        playerId: dbObject.player_id,
        playerName:dbObject.player_name,
        jerseyNumber:dbObject.jersey_number,
        role:dbObject.role
    };
}

app.get("/player/",async(request,response) =>{
    const getPlayers = '
    SELECT * FROM cricket_team'
    const playersArray = await db.get(getPlayers);
        response.send(
            playersArray.map((eachPlayer)=>
                creatDbObjectToResponseObject(eachPlayer)
        );
    );
})