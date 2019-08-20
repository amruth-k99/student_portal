const MongoClient = require("mongodb").MongoClient;
const objectID = require('mongodb').objectID;
const dbname = "student_Portal";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser:true};
const state = {
    db:null

};




const connect = (cb)=>{
    if(state.db){
        cb();

    }
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err){
                cb(err);

            }
            else{
                state.db = client.db(dbname);
                cb();
            }
        })
    }
}
const getPrimaryKey = (_id)=>{
    return objectID(_id); 
}
const getDB = () =>{
    return state.db;
}



module.export = {getDB,connect,getPrimaryKey};