var express = require("express");
var app = express();
var opn = require("opn");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var multer  =   require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require("fs");
const del = require('del');
var stoa = require("csv-to-array");
var Promise = require('promise');
var cityname;

app.use(bodyParser.urlencoded({extended: true}));


// var dir = './uploads';
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

 



mongoose.connect("mongodb://localhost/qol_app");



// Here we have decided where uploaded file will store and its name
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '.csv');
  }
});

//upload file functions
var cpUpload = multer({ storage : storage}).fields([{ name: 'CrimeInformation', maxCount: 1 },
													 { name: 'EducationInformation', maxCount: 1 }, 
													 { name: 'EthnicityInformation', maxCount: 1 }, 
													 { name: 'HomeTenureInformation', maxCount: 1 },
													 { name: 'HousingInformation', maxCount: 1 },
													 { name: 'PopulationInformation', maxCount: 1 },
													 { name: 'PovertyLabourInformation', maxCount: 1 },
													 { name: 'PropertValueInformation', maxCount: 1 },
													 { name: 'city', maxCount: 1 }
													 ]);


var dataArr = [];
var dataArr1 = [];
var dataArr2 = [];
var dataArr3 = [];
var dataArr4 = [];
var dataArr5 = [];
var dataArr6 = [];
var dataArr7 = [];
var dataArr8 = [];
var dataArr22 = [];

var noc1;
var noc2;
var noc3;
var noc4;
var noc5;
var noc6;
var noc7;
var noc8;


var testcaller = 0;



var citiesShema = new mongoose.Schema({
	cityname: String,
	csv1: [],
	csv2: [],
	csv3: [],
	csv4: [],
	csv5: [],
	csv6: [],
	csv7: [],
	csv8: []

});

var Cities = mongoose.model('Cities',citiesShema);

app.set("view engine","ejs");















//_____________________________updated routes______________________________________________________________________________________
app.get("/testhome",function(req,res){
	res.render("testhome");
});

app.post("/testupload",function(req,res){
	
	cityname = "";
	noc1 = "";
	noc2 = "";
	noc3 = "";
	noc4 = "";
	noc5 = "";
	noc6 = "";
	noc7 = "";
	noc8 = "";


    cpUpload(req,res,function(err){
    	if(err)
    	{
    		console.log(err);
    		return res.end("error while uploading file");
    	}
    	cityname = req.body.city;
		console.log("Name of the city "+cityname);
		noc1 = req.body.no1;
		noc2 = req.body.no2;
		noc3 = req.body.no3;
		noc4 = req.body.no4;
		noc5 = req.body.no5;
		noc6 = req.body.no6;
		noc7 = req.body.no7;
		noc8 = req.body.no8;
		
		
		console.log("_______________New_data_uploaded________________");
		res.redirect("/testsaveData");
    });
});

app.get("/testsaveData",function(req,res){
	res.render("testsaveData");
});

app.post("/testsaveData",function(req,res){

	res.send("your data is stored <a href='/'><h2>Go Back</h2></a>");
	//--------------------csv1--parsing-----
	

		dataArr = [];
		testcaller = 0;

		Excecuter(testcaller);		

});

function Excecuter(nof)
		{
			if(nof == 0)
			{
				dp("CrimeInformation.csv",noc1);
			}
			else if(nof == 1)
			{
				dp("EducationInformation.csv",noc2);		
			}
			else if(nof == 2)
			{
				dp("EthnicityInformation.csv",noc3);		
			}
			else if(nof == 3)
			{
				dp("HomeTenureInformation.csv",noc4);		
			}
			else if(nof == 4)
			{
				dp("HousingInformation.csv",noc5);		
			}
			else if(nof == 5)
			{
				dp("PopulationInformation.csv",noc6);		
			}
			else if(nof == 6)
			{
				dp("PovertyLabourInformation.csv",noc7);		
			}
			else if(nof == 7)
			{
				dp("PropertValueInformation.csv",noc8);		
			}
			else
			{
				console.log("all files are parsed");
				console.log("total no of files parsed"+testcaller);

				var newCity = Cities({
								cityname: cityname,
								csv1: dataArr1,
								csv2: dataArr22,
								csv3: dataArr3,
								csv4: dataArr4,
								csv5: dataArr5,
								csv6: dataArr6,
								csv7: dataArr7,
								csv8: dataArr8
							});

				newCity.save(function(err,cit){
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log("==================Data succesfully stored in mongoDB======================");
						console.log(cit);
						console.log("==========================================================================");
					}
				});
			}



		}


function dp(filename,colno){

if(colno == 2)
{
var columns = ["col1", "col2"];
dataArr2=sconvert(filename,columns,colno);
}
else if(colno == 3)
{
	var columns = ["col1", "col2","col3"];
	sconvert(filename,columns,colno);
}
else if(colno == 4)
{
	var columns = ["col1", "col2","col3","col4"];
	sconvert(filename,columns,colno);
}
else if(colno == 5)
{
	var columns = ["col1", "col2","col3","col4", "col5"];
	sconvert(filename,columns,colno);
}
else if(colno == 6)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6"];
	sconvert(filename,columns,colno);
}
else if(colno == 7)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7"];
	sconvert(filename,columns,colno);
}
else if(colno == 8)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8"];
	sconvert(filename,columns,colno);
}		
else if(colno == 9)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9"];
	sconvert(filename,columns,colno);
}		
else if(colno == 10)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10"];
	sconvert(filename,columns,colno);
}
else if(colno == 11)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11"];
	sconvert(filename,columns,colno);
}
else if(colno == 12)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12"];
	sconvert(filename,columns,colno);
}
else if(colno == 13)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13"];
	sconvert(filename,columns,colno);
}
else if(colno == 14)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14"];
	sconvert(filename,columns,colno);
}
else if(colno == 15)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15"];
	sconvert(filename,columns,colno);
}
else if(colno == 16)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16"];
	sconvert(filename,columns,colno);
}
else if(colno == 17)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17"];
	sconvert(filename,columns,colno);
}
else if(colno == 18)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18"];
	sconvert(filename,columns,colno);
}
else if(colno == 19)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19"];
	sconvert(filename,columns,colno);
}
else if(colno == 20)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19", "col20"];
	sconvert(filename,columns,colno);
}
else if(colno == 21)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19", "col20", "col21"];
	sconvert(filename,columns,colno);
}
else if(colno == 22)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19", "col20", "col21", "col22"];
	sconvert(filename,columns,colno);
}
else if(colno == 23)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19", "col20", "col21", "col22", "col23"];
	sconvert(filename,columns,colno);
}
else if(colno == 24)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19", "col20", "col21", "col22", "col23", "col24"];
	sconvert(filename,columns,colno);
}
else if(colno == 25)
{
	var columns = ["col1", "col2","col3","col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15", "col16", "col17", "col18", "col19", "col20", "col21", "col22", "col23", "col24", "col25"];
	sconvert(filename,columns,colno);
}



}

function sconvert(filename,columns,colno){

	stoa({
		   file: "uploads/"+filename,
		   columns: columns
		}, function (err, resultex) {
		  if(err)
		  {
		  	console.log(err);
		  }
		  else
		  {

		  	dataArr = resultex;
		  	console.log("----------------------------------");
		  	
		  	//---------------------------------------------------------------------

		  	if(colno == 2)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN2______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);

					  	
					  }
					});
		  	}

		  	if(colno == 3)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN3______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 4)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN4______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 5)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN5______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 6)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN6______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}

		  	if(colno == 7)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN7______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}

		  	if(colno == 8)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN8______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}

		  	if(colno == 9)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN9______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}

		  	if(colno == 10)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN10______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 11)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN11______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 12)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN12______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 13)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN13______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 14)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN14______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 15)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN15______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 16)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN16______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}	
		  	if(colno == 17)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN17______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 18)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN18______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 19)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN19______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 20)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN20______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19, ""+dataArr[0].col20];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 21)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN21______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19, ""+dataArr[0].col20, ""+dataArr[0].col21];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 22)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN22______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19, ""+dataArr[0].col20, ""+dataArr[0].col21, ""+dataArr[0].col22];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 23)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN23______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19, ""+dataArr[0].col20, ""+dataArr[0].col21, ""+dataArr[0].col22, ""+dataArr[0].col23];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 24)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN24______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19, ""+dataArr[0].col20, ""+dataArr[0].col21, ""+dataArr[0].col22, ""+dataArr[0].col23, ""+dataArr[0].col24];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}
		  	if(colno == 25)
		  	{
					  		console.log("_____________________DYNAMIC_COLUMN25______________________________________________");
					  	columns = [""+dataArr[0].col1, ""+dataArr[0].col2, ""+dataArr[0].col3, ""+dataArr[0].col4, ""+dataArr[0].col5, ""+dataArr[0].col6, ""+dataArr[0].col7, ""+dataArr[0].col8, ""+dataArr[0].col9, ""+dataArr[0].col10, ""+dataArr[0].col11, ""+dataArr[0].col12, ""+dataArr[0].col13, ""+dataArr[0].col14, ""+dataArr[0].col15, ""+dataArr[0].col16, ""+dataArr[0].col17, ""+dataArr[0].col18, ""+dataArr[0].col19, ""+dataArr[0].col20, ""+dataArr[0].col21, ""+dataArr[0].col22, ""+dataArr[0].col23, ""+dataArr[0].col24, ""+dataArr[0].col25];
					  	stoa({
					   file: "uploads/"+filename,
					   columns: columns
					}, function (err, resultex) {
					  if(err)
					  {
					  	console.log(err);
					  }
					  else
					  {
					  	dataArr.splice(0,dataArr.length);
					  	dataArr = resultex;
					  	console.log(dataArr);
					  	console.log("----------------------------------");
					  	sta(filename,dataArr,colno);
					  }
					});
		  	}











		  	//---------------------------------------------------------------------
		  }
		});


	function sta(filename,dataArr,colno)
	{
		if(filename == "CrimeInformation.csv")
		{
			dataArr1 = dataArr;
			console.log("Data Array One___________________");
			console.log(dataArr1);
			testcaller = testcaller + 1;
			Excecuter(testcaller);

		}
		if (filename == "EducationInformation.csv") 
		{
			dataArr2 = dataArr;
			console.log("Data Array Two___________________");
			console.log(dataArr2);
			dataArr22 = dataArr2;
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}
		if (filename == "EthnicityInformation.csv") 
		{
			dataArr3 = dataArr;
			console.log("Data Array Three___________________");
			console.log(dataArr3);
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}
		if (filename == "HomeTenureInformation.csv") 
		{
			dataArr4 = dataArr;
			console.log("Data Array Four___________________");
			console.log(dataArr4);
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}
		if (filename == "HousingInformation.csv") 
		{
			dataArr5 = dataArr;
			console.log("Data Array Five___________________");
			console.log(dataArr5);
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}
		if (filename == "PopulationInformation.csv") 
		{
			dataArr6 = dataArr;
			console.log("Data Array Six___________________");
			console.log(dataArr6);
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}
		if (filename == "PovertyLabourInformation.csv") 
		{
			dataArr7 = dataArr;
			console.log("Data Array Seven___________________");
			console.log(dataArr7);
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}
		if (filename == "PropertValueInformation.csv") 
		{
			dataArr8 = dataArr;
			console.log("Data Array Eight___________________");
			console.log(dataArr8);
			testcaller = testcaller +1;
			Excecuter(testcaller);
		}







	}



	}




app.get("/update",function(req,res){

	res.render("getcity");
});

app.post("/findcity",function(req,res){

	cityname = req.body.city;
	// res.send("city found")
	Cities.find({cityname: cityname},function(err,result){
			if(err)
			{
				console.log(err);
			}
			else
			{
				
				Cities.remove({cityname: cityname},function(err,result2){
						if(err)
						{
							console.log(err);
						}
						else
						{
							if(result2.n == 0)
							{
								console.log("city not found")
							}
							if(result2.n == 1)
							{
								console.log(result2);
								res.redirect("/saveupdate");
							}
							
						}

					});					
			}	
	});	

});


app.get("/saveupdate",function(req,res){

	res.render("saveupdate",{cname: cityname});
});

//================================================================================================================================



































app.get("/",function(req,res){
	res.render("landingPage");
});
app.get("/clear",function(req,res){


	del(['uploads/*.csv', '!tmp/unicorn.js']).then(paths => {
    console.log('cleared previous data:\n', paths.join('\n'));
	});
	res.send("cleared data");
});

app.post("/uploads",function(req,res){

	cityname = "";
	


    cpUpload(req,res,function(err){
    	if(err)
    	{
    		console.log(err);
    		return res.end("error while uploading file");
    	}
    	cityname = req.body.city;
		console.log(cityname);
		console.log("_______________New_data_uploaded________________");
		res.redirect("/saveData");
    });

});

// app.get("/saveData",function(req,res){
// 	res.render("saveData");
// });

// app.post("/saveData",function(req,res){
// 	res.send("you have reached saveData route!");
		
// 		//--------------------csv1--parsing-----
// 		dataArr = [];
// 		var columns = ["id", "y_2000"];
// 		stoa({
// 		   file: "uploads/CrimeInformation.csv",
// 		   columns: columns
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr = resultex;
// 		  	console.log(dataArr);
// 		  	console.log("----------------------------------");
// 		  }
// 		});
// 		//--------------------csv2--parsing-----
// 		dataArr2 = [];
// 		var columns2 = ["id", "y_2013_High_School","y_2013_Under_Graduates","y_2013_Post_Graduates","y_2013_No_Diploma"];
// 		stoa({
// 		   file: "uploads/EducationInformation.csv",
// 		   columns: columns2
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr2 = resultex;
// 		  	console.log(dataArr2);
// 		  	console.log("----------------------------------");
// 		  }
// 		});
// 		//--------------------csv3--parsing-----
// 		dataArr3 = [];
// 		var columns3 = ["id", "y_2013_White","y_2013_Non_White"];
// 		stoa({
// 		   file: "uploads/EthnicityInformation.csv",
// 		   columns: columns3
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr3 = resultex;
// 		  	console.log(dataArr3);
// 		  	console.log("----------------------------------");
					 
// 		  }
// 		});
// 		//--------------------csv4--parsing-----
// 		dataArr4 = [];
// 		var columns4 = ["id", "y_2013_Home_Tenure"];
// 		stoa({
// 		   file: "uploads/HomeTenureInformation.csv",
// 		   columns: columns4
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr4 = resultex;
// 		  	console.log(dataArr4);
// 		  	console.log("----------------------------------");

// 		  }
// 		});
// 		//--------------------csv5--parsing-----
// 		dataArr5 = [];
// 		var columns5 = ["county_id", "city_id","id","y_2010_occupied","y_2013_occupied","y_2010_vacant","y_2013_vacant"];
// 		stoa({
// 		   file: "uploads/HousingInformation.csv",
// 		   columns: columns5
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr5 = resultex;
// 		  	console.log(dataArr5);
// 		  	console.log("----------------------------------");

// 		  }
// 		});
// 		//--------------------csv6--parsing-----
// 		dataArr6 = [];
// 		var columns6 = ["id","y_2000","y_2010","y_2013","y_2010_change","y_2013_change","y_2010_change_percentage","y_2013_change_percentage"];
// 		stoa({
// 		   file: "uploads/PopulationInformation.csv",
// 		   columns: columns6
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr6 = resultex;
// 		  	console.log(dataArr6);
// 		  	console.log("----------------------------------");

// 		  }
// 		});
// 		//--------------------csv7--parsing-----
// 		dataArr7 = [];
// 		var columns7 = ["id","y_2013_18","y_2013_18_percentage","y_2013_65","y_2013_65_percentage"];
// 		stoa({
// 		   file: "uploads/PovertyLabourInformation.csv",
// 		   columns: columns7
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr7 = resultex;
// 		  	console.log(dataArr7);
// 		  	console.log("----------------------------------");

// 		  }
// 		});
// 		//--------------------csv8--parsing-----
// 		dataArr8 = [];
// 		var columns8 = ["id","y_2015_Resident_Tax","y_2015_Non_Resident_Tax","y_2015_SFR_Tax","y_2000_Medain_Value","y_2013_Median_Value"];
// 		stoa({
// 		   file: "uploads/PropertValueInformation.csv",
// 		   columns: columns8
// 		}, function (err, resultex) {
// 		  if(err)
// 		  {
// 		  	console.log(err);
// 		  }
// 		  else
// 		  {
// 		  	dataArr8 = resultex;
// 		  	console.log(dataArr8);
// 		  	console.log("----------------------------------");
// 		  		var newCity = Cities({
// 	cityname: cityname,
// 	csv1: dataArr,
// 	csv2: dataArr2,
// 	csv3: dataArr3,
// 	csv4: dataArr4,
// 	csv5: dataArr5,
// 	csv6: dataArr6,
// 	csv7: dataArr7,
// 	csv8: dataArr8

// });

// newCity.save(function(err,cit){
// 	if(err)
// 	{
// 		console.log(err);
// 	}
// 	else
// 	{
// 		console.log(cit);
// 	}
// });

// 		  }
// 		});
		
// });

app.get("/removedb",function(req,res){
	
	Cities.remove({},function(err,result){
			if(err)
			{
				console.log(err);
			}
			else
			{
				console.log(result);
				res.send("all the data in database is removed succesfully!<br><h2><a href='/'>Go Back</a></h2>");
			}
	});

});

app.listen(3000,console.log("App started on :: http://localhost:3000"));
opn('http://localhost:3000', function (err){
      if (err) throw err;
      console.log('The user closed the browser');
    });
