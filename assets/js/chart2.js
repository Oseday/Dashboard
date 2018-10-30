<!-- javascript init -->
// General configuration for the charts with Line gradientStroke
    
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            //callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function whencalled(responseText)
{

var responseData = JSON.parse(responseText);
    
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

var ctx = document.getElementById("Chart2").getContext("2d");

var gradientStroke = ctx.createLinearGradient(0,0,0,255);

var actdata = responseData // [ 60,110,70,100, 75, 90, 80, 100, 70, 80, 120, 80];

var data = {
  labels: new Array(actdata.length),
  datasets: [{
    label: "Data",
    fill: false,
    borderColor: '#d048b6',
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#d048b6',
    pointBorderColor:'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#d048b6',
    pointBorderWidth: 20,
    pointHoverRadius: 1,
    pointHoverBorderWidth: 15,
    pointRadius: 2,
    data: actdata,
  }]
};

var myChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: gradientChartOptionsConfiguration
});
    
};

httpGetAsync("http://meridianstudios.org/data/dash/chart1", whencalled)
