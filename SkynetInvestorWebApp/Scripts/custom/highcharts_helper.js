function BuildPerformanceChart(graphDiv, seriesArray, title) {
    var minValue = Math.round(FindMinSeriesValue(seriesArray),0);
    var maxValue = Math.round(FindMaxSeriesValue(seriesArray),0);

    $(graphDiv).highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: title
        },
        subtitle: {
            text: 'Over the last 5 years'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: 'Return (EUR)'
            },
            floor: minValue,
            ceiling: maxValue,
            tickInterval: Math.round((maxValue-minValue) / 50,0),
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,            
        },
        tooltip: {
            valueSuffix: ' EUR'
        },
        plotOptions: {
            spline: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                marker: {
                    enabled: false
                }//,
                //pointInterval: 3600000 * 24 * 30, // one hour
                //pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
            }
        },
        series: seriesArray
           ,
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
}

function FindMinSeriesValue(seriesArray)
{
    var minValue = 0;
    var minValueSet = false;

    for (i = 0; i < seriesArray.length; i++)
    {
        var series = seriesArray[i].data;        
        for (j = 0; j < series.length; j++)
        {
            if (j == 0 && (!minValueSet))
            {
                minValueSet = true;
                minValue = series[j][1];
            }                
            else
            {
                if (series[j][1] < minValue)
                    minValue = series[j][1];
            }
        }
    }

    return minValue;
}

function FindMaxSeriesValue(seriesArray) {
    var maxValue = 0;
    var maxValueSet = false;

    for (i = 0; i < seriesArray.length; i++) {
        var series = seriesArray[i].data;
        for (j = 0; j < series.length; j++) {
            if (j == 0 && (!maxValueSet)) {
                maxValueSet = true;
                maxValue = series[j][1];
            }
            else {
                if (series[j][1] > maxValue)
                    maxValue = series[j][1];
            }
        }
    }

    return maxValue;
}

function BuildProbabilityChart(graphDiv, seriesData) {
    $(graphDiv).highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Probability'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'Monthly return (%)'
            },
            type: 'number',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: 'Probability (%)'
            },
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
        },
        tooltip: {
            valueSuffix: ' %'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 0.1, // one hour
                pointStart: 0.0
            }
        },
        series: [{
            name: 'Probability of Portfolio return',
            data: seriesData
        }]
           ,
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
}

function BuildBubbleChart(graphDiv)
{
    $(graphDiv).highcharts({

        chart: {
            type: 'bubble',
            zoomType: 'xy'
        },

        title: {
            text: 'Risk/return of assets'
        },

        series: [{
            data: [[97, 36, 10]]
        }, {
            data: [[90, 63, 20]]
        }, {
            data: [[30, 77, 10]]
        }]

    });
}

function BuildHeatMap(graphDiv)
{
    $(graphDiv).highcharts({

        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },


        title: {
            text: 'Correlation of assets'
        },

        xAxis: {
            categories: ['AGG', 'EWM', 'JKD']
        },

        yAxis: {
            categories: ['JKD', 'EWM', 'AGG'],
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 320
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
            name: 'Correlation of assets',
            borderWidth: 1,
            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [1, 0, 92], [1, 1, 58], [1, 2, 78], [2, 0, 35], [2, 1, 15], [2, 2, 123]],
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            }
        }]

    });
}

function CreateSeriesArrayItem(name, seriesData)
{
    return {
        name: name,
        data: seriesData
    };
}

function BuildLineChart(graphDiv, seriesArray) {    
    $(graphDiv).highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Performance'
        },
        subtitle: {
            text: 'Over the last 5 years'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: 'Return (%)'
            },
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            /*plotBands: [{ // Light air
                from: 0.3,
                to: 8,
                color: 'rgba(68, 20, 213, 0.1)',
                label: {
                    text: 'Good',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // High wind
                from: 8,
                to: 15,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Bad',
                    style: {
                        color: '#606060'
                    }
                }
            }]*/
        },
        tooltip: {
            valueSuffix: ' %'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000*24*30, // one hour
                pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
            }
        },
        series: [seriesArray]
           ,
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
}

function BuildPieChart(graphDiv, title, seriesData, fnSliceSelectedCallback)
{
    $(graphDiv).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie:
            {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels:
                {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style:
                    {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                events:
                {
                    click: function (event) {
                        if (fnSliceSelectedCallback != null)
                        {
                            var selectedSlice = event.point.name;
                            fnSliceSelectedCallback(selectedSlice);
                        }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Pie Series',
            data: seriesData
            /*data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['Others', 0.7]
            ]*/
        }]
    });
}


function InitColors()
{
    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i

        for (i = 0; i < 10; i++) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
}

function getAssetAllocationData()
{
    var pieChart = $("#pie-chart-container2");
    var data = $(pieChart).highcharts().series[0].data;
    var result = new Array();

    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        //alert(data[i].name);
        //alert(data[i].percentage);
        //result[i] = {name: data[i].name, percentage: data[i].percentage};
        var row = new Array();
        row[0] = data[i].name;
        row[1] = data[i].percentage;
        result[i] = row;
    }

    return result;
}

function BuildAllCharts() {
    var etfCount = GetETFCount();
    var mifidScore = GetMIFIDScore();
    var budget = GetBudget();

    getRDataAsync(mifidScore, etfCount, budget, PopulateAllCharts);
    //var rawRData = getRDataAsync(mifidScore, etfCount);    
}

function PopulateAllCharts(rawRData)
{
    var futurePerformanceSeriesData = getSpecificData(rawRData, SKYNET_FUTURE_PERFORMANCE_SERIES);
    var historicalPerformanceSeriesData = getSpecificData(rawRData, SKYNET_HISTORICAL_PERFORMANCE_SERIES);
    var probabilitySeriesData = getSpecificData(rawRData, SKYNET_PROBABILITY_SERIES);
    var categoryAllocationSeriesData = getSpecificData(rawRData, SKYNET_CATEGORY_ALLOCATION_SERIES);
    var assetAllocationSeriesData = getSpecificData(rawRData, SKYNET_ASSET_ALLOCATION_SERIES);
    var assetAllocationSeriesTableData = getSpecificData(rawRData, SKYNET_ASSET_ALLOCATION_TABLE_SERIES);

    var futurePerformanceSeriesArray = new Array();
    //futurePerformanceSeriesArray[0] = CreateSeriesArrayItem("graph1", futurePerformanceSeriesData);
    //BuildPerformanceChart('#future-performance-chart-container', { name: "dasd", data: futurePerformanceSeriesData }, 'Future Performance');
    //BuildPerformanceChart('#historical-performance-chart-container', historicalPerformanceSeriesData, 'Historical Performance');
    BuildPieChart('#pie-chart-container1', 'Category allocation', categoryAllocationSeriesData);
    BuildPieChart('#pie-chart-container2', 'Asset allocation', assetAllocationSeriesData);
    BuildProbabilityChart('#probability-line-container', probabilitySeriesData);
    BuildHeatMap('#correlation-matrix-container');
    BuildBubbleChart('#riskreturn-plot-diagram-container');
    BuildSortableTable("#sortable-grid-container", assetAllocationSeriesTableData);
}


/* Gauges */
function BuildGauge(graphDiv, data)
{

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $(graphDiv).highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                text: 'MIFID Score'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'mifid-score-series',
            data: [data],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">points</span></div>'
            },
            tooltip: {
                valueSuffix: ' points'
            }
        }]

    }));


    // Bring life to the dials
    /*setInterval(function () {
        // Speed
        var chart = $('#container-speed').highcharts(),
            point,
            newVal,
            inc;

        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }
        
    }, 2000);*/


}
/* End Gauges */