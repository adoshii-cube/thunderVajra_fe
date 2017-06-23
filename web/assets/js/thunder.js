/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var answeredQuestions = [];
var oQuestionAnswered = 0;

var responseCount;
var wordCA;
var sentimentDist;
var sentimentAvg;

$(document).ready(function () {

    $(".question").hover(function () {
        $(this).toggleClass("mdl-shadow--3dp");
    });

    $("#submit").on("click", function () {
        if (!($("#submit").attr("disabled"))) {
            submit();
        }
    });

    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 100;  //time in ms, 1 second for example
    var $input = $('.openTextResponse');

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    fetchData(true);

    $("#dropdown_sentiment").on("change", function () {
        fetchData(false);
    });

    $("#showResults").on("click", function () {
        fetchData(false);
        $(this).prop("disabled", true);
        setTimeout(function () {
            $("button").prop("disabled", false);
        }, 30000);
    });
//    setInterval(function () {
//        fetchData(false);
//    }, 30000);
});


function fetchData(isFirstTime) {
    var optionValue;
    if (isFirstTime) {
        optionValue = parseInt($("#dropdown_sentiment").find("option:first-child").val());
    } else {
        var selectedOption = $("#dropdown_sentiment").parent().find(".mdl-selectfield__box-value").text();
        optionValue = $('#dropdown_sentiment option').filter(function () {
            return $(this).html() === selectedOption;
        }).val();
    }


    var jsonObj = {
        "quesId": optionValue
    };
    var postData = {'jsonObj': JSON.stringify(jsonObj)};
    jQuery.ajax({
        type: "POST",
        url: "fetchData.jsp",
        data: postData,
        async: false,
        success: function (resp) {
            var response = JSON.parse(resp);
            responseCount = JSON.parse(response.responseCount);
            wordCA = JSON.parse(response.wordCA);
            sentimentDist = JSON.parse(response.sentimentDist);
            sentimentAvg = JSON.parse(response.sentimentAvg);
            updateResponseCount();
            plotHCGauge([sentimentAvg.average]);
            plotHCStackedBar(sentimentDist);
            plotWordCloud("HC_WordCloud");
            plotHCTable(wordCA.slice(0, 10));
        },
        error: function (resp, err) {
            console.log("unable to fetch data error messsage : " + err);
        }
    });
}

function updateResponseCount() {
    $("#openTextResponses").empty();
    $("#openTextResponses").append(responseCount[0].responseCount);
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
        clone.find('.association').html(jsonData[i]['association']);
        clone.appendTo('table');
    }
}

function plotWordCloud(chartId) {
    var list = [];
    for (var key in wordCA) {
        var val = wordCA[key];
        var array = [val.word, val.frequency];
        list.push(array);
    }
    WordCloud(document.getElementById(chartId), {
        list: list,
        fontFamily: 'Roboto',
        backgroundColor: '#ffffff',
        rotateRatio: 0,
//        shape: 'pentagon',
        gridSize: 5,
//        minSize: 1,
        weightFactor: 1,
        clearCanvas: true,
        drawOutOfBound: false,
        wait: 15,
        shuffle: false,
        color: function (word, frequency) {
            return (frequency > 10) ? '#00ff00' : '#c09292';
        }

    });
}


function submit() {
    var responseArr = [];

    // OPENTEXT response
    $(".openTextResponse").each(function () {
        if ($(this)[0].value !== "") {
            var id = $(this)[0].id.split("-");
            var value = $(this)[0].value;
            var jsonObj = {
                "questionId": id[1],
                "responseString": value
            };
            responseArr.push(jsonObj);
        }
    });
    singleSubmitData(responseArr);
}

function singleSubmitData(responseArr) {
    console.log("entering singleSubmitData");
    console.log("singleSubmitData analyzing single_submit_rating");
    var postData = {'emp_rating': JSON.stringify(responseArr)};
    console.log("singleSubmitData postData : " + postData);
    $.ajax({
        type: "POST",
        url: "survey-submit.jsp",
        data: postData,
        async: false,
        success: function (resp) {
            console.log("singleSubmitData inside ajax success ");
            window.location.href = 'thankyou.jsp';
        },
        error: function (resp, err) {
            console.log("singleSubmitData error message : " + err);
        }
    });
    console.log("exiting singleSubmitData");
}

function submitEnableDisable() {
    var qListSize = $('#qListSize').val();
    if (answeredQuestions.length.toString() === qListSize) {
//    if (answeredQuestions.length.toString() > 0) {
        $('#submit').addClass('mdl-color--indigo-500 mdl-color-text--white');
        $('#submit').prop("disabled", false); // Element(s) are now enabled.

    } else if (answeredQuestions.length.toString() !== qListSize) {
//    } else if (answeredQuestions.length.toString() < 1) {
        $('#submit').removeClass('mdl-color--indigo-500 mdl-color-text--white');
        $('#submit').prop("disabled", true);
    }
}

//user is "finished typing," do something
function doneTyping() {
    //do something
    $('.openTextResponse').each(function () {
        var id = $(this).attr("id");
        var qId = id.split("-")[1];
        var value = $(this).val();
        if ((value.length > 0) && ((answeredQuestions.length === 0) || (answeredQuestions.length > 0 && !answeredQuestions.includes(qId)))) {
            answeredQuestions.push(qId);
            oQuestionAnswered++;
            $(this).parent().parent().addClass("answered");
            if (oQuestionAnswered === parseInt($("#oQListSize").val())) {
                $(".sectionOpenText").addClass("completed");
            }
            submitEnableDisable();
        } else if (value.length === 0 && answeredQuestions.includes(qId)) {
            answeredQuestions.pop(qId);
            oQuestionAnswered--;
            $(this).parent().parent().removeClass("answered");
            if (oQuestionAnswered !== parseInt($("#oQListSize").val())) {
                $(".sectionOpenText").removeClass("completed");
            }
            submitEnableDisable();
        }
    });
}
