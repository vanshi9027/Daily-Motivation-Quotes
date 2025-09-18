const express = require("express");
const app = express();
const  port = 8080;
const path = require("path");// path for view ejs
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
const mysql = require('mysql2');


const iquotes = require('iquotes');

 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database : 'DailyQuotes',
    password : '7668893577',
});

app.use(express.json()); 
app.use(express.urlencoded({ extended : true})); // pase the data in json format
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname , "public"))); // serving static files like css

app.set("view engine" , " ejs"); // view ejs templete
app.set("views" , path.join(__dirname , "views")); // folder accese express p



// demo rounte
 app.get("/" , (req , res) =>{
    let q = `SELECT COUNT(*) FROM quotes`;
    
    
     try{
      connection.query(q , (err , result) =>{
      if(err) throw err;
      console.log( result);
      res.send(result);
      
     } );
    }
    catch(err){
        console.log(err);
        res.send("some error in DB");
      }

 });
 // ALL Quotes 
 app.get("/Quotes", ( req , res) =>{
    let q = `SELECT  * FROM quotes`;
    try{
      connection.query(q , (err , result) =>{
      if(err) throw err;
      let Quotes = result;
    //   console.log(Quotes);
    //   res.send(Quotes);
      res.render("index.ejs" ,{Quotes});
      
     } );
    }
    catch(err){
        console.log(err);
        res.send("some error in DB");
      }

  
  });

    // new Quote add
    app.get("/Quotes/new",(req,res)=>{
      res.render("new.ejs");
    });



   app.post("/Quotes" ,(req,res) =>{
    const { text , author, category} = req.body;
    let q = `INSERT INTO quotes ( text ,author ,category ) VALUES (?, ?, ?)`;
    let values = [text , author, category];
    try{
      connection.query(q ,values ,(err , result) =>{
      if(err) throw err;
     console.log(result);
       return res.redirect("/Quotes");
      
     } );
    }
    catch(err){
        console.log(err);
        res.send("some error in DB");
      }

    
  
  res.redirect("/Quotes");
   
  });
app.listen(port , () =>{
    console.log(`app listening on port ${port}`);
 });


// app.use((req,res) =>{
//    res.send("i am working ");
//    console.log(" server is working");

// });















































// const allQuotes = iquotes.all();

// const limitedQuotes  = allQuotes.slice(0 , 100);


// let q = "INSERT INTO quotes(text , author, category) VALUES ?";

// let data = [];
// for (let p of limitedQuotes) {
//   data.push([p.quote, p.author, p.category]);   // 100 quotes data 
// }


// try{
// connection.query(q ,[data], (err , result) =>{
//   if(err) throw err;
//   console.log( result);
//   connection.end();
// } );
// } catch(err){
//   console.log(err);
// }




















// console.log(Quote.getQuote);
// const  Quotes =  [
//   { 
//     id : uuidv4() ,
//     text : "Believe in yourself", 
//      category : " Motivation"
//  },
//  {
//   id :uuidv4(),
//   text: " Dream big , work hard" , 
//   category: " Inspiration"
//  }, 
//   { 
//     id : uuidv4(),
//     text : "Success starts with self-discipline",
//     category : "Success"
//  },

//  {  
//     id : uuidv4(),
//     text : " Every day is a second chance " ,
//     category : " Positivity"
//  },
//   {
//     id : uuidv4(),
//     text :  " Small steps evry day lead to big results " ,
//   category  : " Growth"
//  } 

//  ]; 

//   const dailyQuote =

//  // 

   // new Quote add
    // app.get("/Quotes/new",(req,res)=>{
    //   res.render("new.ejs");
    // });



// app.post("/Quotes" ,(req,res) =>{
//   const { text , category} = req.body;
//   let id = uuidv4();
//   Quotes.push({ id, text , category});
//   res.redirect("/Quotes");
   
//  });

//  // // show route

//  app.get("/Quotes/:id" ,(req,res)=>{
// let {id} = req.params;
// let quotes = Quotes.find(p => id === p.id);
//   //  console.log(quotes);
//  res.render("showdetail.ejs" , {quotes});

// });


//  // edit route 
//  app.get("/Quotes/:id/edit" , (req, res) =>{
//   let {id } = req.params;
//   let quotes = Quotes.find(p => id === p.id);
//    res.render("edit.ejs" ,{quotes});

//  });
// app.patch("/Quotes/:id" ,(req, res) =>{
//    let {id} = req.params;
//    console.log(id);
//    let newtext = req.body.text;
//  let quotes = Quotes.find(p => id === p.id);
  
//  quotes.text = newtext;
//   console.log(quotes);
//    res.redirect("/Quotes");

  
//  });
// // delete route
// app.delete("/Quotes/:id", (req,res) =>{
//   let { id } = req.params;
//    console.log(id);
//    Quotes = Quotes.filter(p => id !== p.id);
//   res.redirect("/Quotes");

  
// });

// app.get("/Quotes/Random" ,(req, res) =>{
//  res.render("")
//  })























































































// const allQuotes = iquotes.all();

// const limitedQuotes  = allQuotes.slice(0 , 100);


// let q = "INSERT INTO quotes(text , author, category) VALUES ?";

// let data = [];
// for (let p of limitedQuotes) {
//   data.push([p.quote, p.author, p.category]);   // 100 quotes data 
// }


// try{
// connection.query(q ,[data], (err , result) =>{
//   if(err) throw err;
//   console.log( result);
//   connection.end();
// } );
// } catch(err){
//   console.log(err);
// }