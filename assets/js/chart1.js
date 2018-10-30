<!-- javascript init -->
// General configuration for the charts with Line gradientStroke

var gradientChartOptionsConfiguration =  {
  maintainAspectRatio: false,
  legend: {
        display: false
   },

   tooltips: {
     backgroundColor: '#fff',
     titleFontColor: '#333',
     bodyFontColor: '#666',
     bodySpacing: 4,
     xPadding: 12,
     mode: "nearest",
     intersect: 0,
     position: "nearest"
   },
   responsive: true,
   scales:{
     yAxes: [{
       barPercentage: 1.6,
           gridLines: {
             drawBorder: true,
               color: 'rgba(29,140,248,0.0)',
               zeroLineColor: "transparent",
           },
           ticks: {
             fontColor: "#9a9a9a",
             beginAtZero: true
           }
         }],

     xAxes: [{
       barPercentage: 1.6,
           gridLines: {
             drawBorder: false,
               color: 'rgba(220,53,69,0.1)',
               zeroLineColor: "transparent",
           },
           ticks: {
               padding: 20,
               fontColor: "#9a9a9a"
           }
         }]
     }
};

function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function newChart(chartid,actdata){
  var ctx = document.getElementById(chartid).getContext("2d");
    
    
  //var responseData = JSON.parse(responseText);

  //actdata = JSON.parse(actdata); //responseData // [ 60,110,70,100, 75, 90, 80, 100, 70, 80, 120, 80];

  var data = {
    labels: new Array(actdata.length),
    datasets: [{
      label: "Data",
      fill: false,
      borderColor: '#d048b6',
      borderWidth: 1,
      pointBackgroundColor: '#d048b6',
      pointBorderColor:'rgba(255,255,255,0)',
      pointRadius: 2,
      data: actdata,
    }]
  };

  return new Chart(ctx, {
    type: 'line',
    data: data,
    options: gradientChartOptionsConfiguration
  });
};

function changedata(chart,data){
  console.log(data)
  var cdata = chart.config.data;
  cdata.datasets[0].data = data
  cdata.labels = new Array(data.length)
  chart.update()
};

httpGetAsync("http://meridianstudios.org/data/dash/chart1", function(data){
  data = JSON.parse(data);
  var chart = newChart("Chart1",data[0]);
  $("#ch11").click(function(){
    changedata(chart,data[0]);
  });
  $("#ch12").click(function(){
    changedata(chart,data[1]);
  });
  $("#ch13").click(function(){
    changedata(chart,data[2]);
  });
  $("#ch14").click(function(){
    changedata(chart,data[3]);
  });
  $("#ch15").click(function(){
    changedata(chart,data[4]);
  });
});

httpGetAsync("http://meridianstudios.org/data/dash/chart2", function(data){
  data = JSON.parse(data);

  var r1 = 0;
  var r2 = 0;

  var chart = newChart("Chart2",data[r1][r2]);

  var chg = function(){changedata(chart,data[r1][r2])};

  $("#cha21").click(function(){
    r1=0; chg();
  });
  $("#cha22").click(function(){
    r1=1; chg();
  });
  $("#cha23").click(function(){
    r1=2; chg();
  });
  $("#cha24").click(function(){
    r1=3; chg();
  });


  $("#chb21").click(function(){
    r2=0; chg();
  });
  $("#chb22").click(function(){
    r2=1; chg();
  });
  $("#chb23").click(function(){
    r2=2; chg();
  });
  $("#chb24").click(function(){
    r2=3; chg();
  });
  $("#chb25").click(function(){
    r2=4; chg();
  });
  $("#chb26").click(function(){
    r2=5; chg();
  });

});
