var express = require('express');
var router = express.Router(); 
const request=require('request');
var db=require('monk')('localhost:27017/dbweatherapi'); // when we import or require it database automatically created
var weatherdata=db.get('weatherdata');
router.get('/', function(err,res) {
  res.render('index');
});

router.post('/insert',function(req,res)
{
   var url='https://samples.openweathermap.org/data/2.5/weather?q=Lahore,PK&appid=5be5c5b6adc2eb2d32d02c4258c16540';
  request(url, function (err, response, body) {
    if(err){
      res.render('index');
    } else {
        let weather = JSON.parse(body)
        console.log(response.body.name);
        if(weather.main == undefined){
          res.render('index');
        } else {
            var mydata={
              temp:weather.main.temp,
              name:weather.name,
              speed:weather.wind.speed
            }
            console.log("mydata");
            weatherdata.insert(mydata,function(e){
              console.log("mydata");

            if(err){res.render('index');res.write('Error');}
             else{
                res.render('index'); 
                console.log("mydata1");

            }
            console.log("mydata2");

          });
          console.log("mydata3");

        }
        console.log("mydata4");

    }
    console.log("mydata5");

  });
  console.log("mydata6");

});
router.get('/getdata',function(req,res){
      weatherdata.find({},function(e,docs){
        //console.log(docs);
   if (e) return next(e);
    res.render('index',{items:docs});
  });
});
module.exports = router;
