/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var metricList;
var nodes;
var edges;
var sentimentList;
var selfPerceptionList;
var sentimentScore;
var indexValue;
var keyPeople;
var selfPerception;
var wordCloud;

//$(window).on("load", function () {
$(document).ready(function () {

//on page load, set gauge as 1, wc1
    var seriesData = [{
            name: 'Negative',
            data: [8]
        }, {
            name: 'Neutral',
            data: [1]
        }, {
            name: 'Positive',
            data: [1]
        }];
    plotHCGauge([1]);
    plotHCStackedBar(seriesData);
    $("#HC_WordCloud").addClass("wc1");
    var jsonData = [
        {'word': 'work', 'trigram': 'perform, improve'},
        {'word': 'help', 'trigram': 'implement, need'},
        {'word': 'system', 'trigram': 'place, environment'},
        {'word': 'better', 'trigram': 'help, there'},
        {'word': 'new', 'trigram': 'idea, innovative'},
        {'word': 'time', 'trigram': 'quickly, saving'},
        {'word': 'improve', 'trigram': 'idea, innovative'},
        {'word': 'need', 'trigram': 'assistance, help'},
        {'word': 'job', 'trigram': 'culture, workplace'},
        {'word': 'training', 'trigram': 'new, tools'}
    ];
    plotHCTable(jsonData);

    $("#dropdown_sentiment").on("change", function () {
        var selectedOption = $("#dropdown_sentiment").parent().find(".mdl-selectfield__box-value").text();

//        var min = 1;
//        var max = 3;
//        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        $("#openTextResponses").empty();

        var dataValue = [1];
        if (selectedOption === "How is technology helping you in your day-to-day work?") {
            seriesData = [{
                    name: 'Negative',
                    data: [8]
                }, {
                    name: 'Neutral',
                    data: [1]
                }, {
                    name: 'Positive',
                    data: [1]
                }];
            dataValue = [1];
            plotHCGauge(dataValue);
            $("#openTextResponses").append(81);
            $("#HC_WordCloud").removeClass("wc2 wc3");
            $("#HC_WordCloud").addClass("wc1");
            jsonData = [
                {'word': 'work', 'trigram': 'perform, improve'},
                {'word': 'help', 'trigram': 'implement, need'},
                {'word': 'system', 'trigram': 'place, environment'},
                {'word': 'better', 'trigram': 'help, there'},
                {'word': 'new', 'trigram': 'idea, innovative'},
                {'word': 'time', 'trigram': 'quickly, saving'},
                {'word': 'improve', 'trigram': 'idea, innovative'},
                {'word': 'need', 'trigram': 'assistance, help'},
                {'word': 'job', 'trigram': 'culture, workplace'},
                {'word': 'training', 'trigram': 'new, tools'}
            ];
        } else if (selectedOption === "How do you associate with the core values of the company?") {
            seriesData = [{
                    name: 'Negative',
                    data: [5]
                }, {
                    name: 'Neutral',
                    data: [3]
                }, {
                    name: 'Positive',
                    data: [2]
                }];
            $("#HC_WordCloud").removeClass("wc1 wc3");
            $("#HC_WordCloud").addClass("wc2");
            jsonData = [
                {'word': 'work', 'trigram': 'culture, improve'},
                {'word': 'living', 'trigram': 'values, model'},
                {'word': 'commitment', 'trigram': 'workplace, environment'},
                {'word': 'team', 'trigram': 'people, members'},
                {'word': 'integrity', 'trigram': 'system, seniors'},
                {'word': 'follow', 'trigram': 'model, role'},
                {'word': 'role', 'trigram': 'model, play'},
                {'word': 'speed', 'trigram': 'work, output'},
                {'word': 'group', 'trigram': 'team, workplace'},
                {'word': 'manage', 'trigram': 'people, tools'}
            ];
            dataValue = [2];
            plotHCGauge(dataValue);
            $("#openTextResponses").append(154);
        } else if (selectedOption === "How well are processes streamlined for efficient working?") {
            seriesData = [{
                    name: 'Negative',
                    data: [2]
                }, {
                    name: 'Neutral',
                    data: [6]
                }, {
                    name: 'Positive',
                    data: [2]
                }];
            $("#HC_WordCloud").removeClass("wc1 wc2");
            $("#HC_WordCloud").addClass("wc3");
            jsonData = [
                {'word': 'work', 'trigram': 'place, honestly'},
                {'word': 'better', 'trigram': 'follow, ethics'},
                {'word': 'help', 'trigram': 'member, leader'},
                {'word': 'time', 'trigram': 'money, output'},
                {'word': 'need', 'trigram': 'commitment, passion'}
            ];
            dataValue = [3];
            plotHCGauge(dataValue);
            $("#openTextResponses").append(99);
        }
        plotHCStackedBar(seriesData);
        plotHCTable(jsonData);
    });
});

function plotWordCloud(chartId, panelId) {
    var selectedTheme = $('#dropdown_theme select').find(':selected').attr('value');
    var selectedRel = 0;
    if (selectedTheme === "theme1") {
        selectedRel = 5;
    } else if (selectedTheme === "theme2") {
        selectedRel = 6;
    } else if (selectedTheme === "theme3") {
        selectedRel = 7;
    }
    var cf = crossfilter(wordCloud);

    var wordCloudDim = cf.dimension(function (d) {
        if (selectedRel !== 0) {
            if (d.relId === selectedRel) {
                return d.word;
            }
        } else {
            return d.word;
        }
    });
    var wordCloudGroup = wordCloudDim.group().reduceSum(function (d) {
        if (selectedRel !== 0) {
            if (d.relId === selectedRel) {
                return d.weight;
            }
        } else {
            return d.weight;
        }

    });

    var wordcloudChart = dc.wordcloudChart("#" + chartId, panelId);
    wordcloudChart.options({
        height: 282,
        width: 573,
        minY: -10,
        minX: -50,
        relativeSize: 20,
        dimension: wordCloudDim,
        group: wordCloudGroup,
        valueAccessor: function (d) {
            return d.value;
        },
        title: function (d) {
            return [d.key, 'Word Count: ' + d.value].join('\n');
        }
    });

    wordcloudChart.render();
}

function plotHCGauge(dataValue) {
    var gaugeOptions = {
        chart: {
            type: 'solidgauge',
            height: 200,
//            width: 400,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            spacingBottom: 0,
            margin: [0, 0, 0, 0]
        },
        title: null,
        pane: {
            center: ['50%'],
            size: '70%',
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
                [0.1, '#DD2C00'],
                [0.5, '#FFD600'],
                [0.9, '#64DD17']
            ],
            lineWidth: 0,
            minorTickInterval: null,
//            tickAmount: 1,
            tickInterval: 5,
            tickPixelInterval: null,
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
                    y: 100,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    var chartSpeed = Highcharts.chart('HC_Gauge', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 5,
            title: {
                text: 'null'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
//                name: 'RPM',
                data: dataValue,
                dataLabels: {
                    align: "center",
                    enabled: true,
                    format: '<div style="text-align:center"><span style="font-size:24px;font-family:Roboto;font-weight:400;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#9E9E9E') + '">{y:.1f}</span><br/>'
//                            '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
                },
                tooltip: {
                    valueSuffix: ' revolutions/min'
                }
            }]

    }));
}

function plotHCStackedBar(seriesData) {
    Highcharts.chart('HC_StackedBar', {
        chart: {
            type: 'bar',
            height: 160,
            width: 300
        },
        colors: ['#DD2C00', '#FFD600', '#64DD17'],
        credits: {
            enabled: false
        },
        tooltip: {enabled: true},
        title: null,
        xAxis: {
            categories: ['Sentiment'],
            labels:
                    {
                        enabled: false
                    }
        },
        yAxis: {
//            min: 0,
            title: {
                text: null
            },
            labels: {
                style: {
                    color: "#9E9E9E",
                    fontWeight: 400
                }
            }
        },
        legend: {
            reversed: true,
            layout: 'horizontal',
            align: 'center',
            y: -20,
            itemStyle: {
                color: "#9E9E9E",
                fontWeight: 400
            }
//            verticalAlign: 'bottom',
//            floating: true
        },
        plotOptions: {
            series: {
                stacking: 'percent'
            }
        },
        series: seriesData
    });
}

function plotHCTable(jsonData) {
    var length = jsonData.length;

    $("#HC_Table tbody td").empty();
    $(".hiddenRow").css("display", "none");
    for (var i = 0; i < length; i++) {
        var clone = $('#template').clone(true).attr('class', 'hiddenRow');
        clone.find('.word').html(jsonData[i]['word']);
        clone.find('.trigram').html(jsonData[i]['trigram']);
        clone.appendTo('table');
    }
}

function plotWordCloud2(chartId) {
    var list = [];
    for (var key in wordCloud) {
        var val = wordCloud[key];
        console.log(val);
        var array = [val.word, val.weight];
//        array.push[val.word];
//        array.push[val.weight];
        list.push(array);
    }
    console.log(list);
    WordCloud(document.getElementById(chartId), {
        list: list,
        fontFamily: 'Roboto',
        backgroundColor: '#ffffff',
        rotateRatio: 0,
//        shape: 'pentagon',
//        gridSize: 5,
        minSize: 8,
        weightFactor: 5,
//        clearCanvas: true,
        drawOutOfBound: false,
        wait: 25,
        shuffle: false,
        color: function (word, weight) {
            return (weight > 10) ? '#00ff00' : '#c09292';
        }

    });
}