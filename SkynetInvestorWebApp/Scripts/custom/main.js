$(document).ready(function () {
    /*$("#dialog-modal").dialog({
        height: 140,
        modal: true,
        autoOpen: false,
        draggable: false
    });*/

    // Smart Wizard     	
    $('#wizard').smartWizard({ transitionEffect: 'slideleft', onLeaveStep: leaveAStepCallback, onFinish: onFinishCallback, onShowStep: smartwizShowStep, enableFinishButton: true });
    //$("#wizard").smartWizard('fixHeight', null);
    //$("#wizard").smartWizard("goBackward");
    //$("#wizard").smartWizard("goForward");
    $("#wizard .question input[type=\"radio\"]").click(function (e) { updateQuestionValues(e); });
    $("#wizard .question option").click(function (e) { updateQuestionValues(e); });

    function smartwizShowStep(context)
    {
        var stepId = context.attr("rel")*1;
        if (stepId == 2) {
            var totalScore = getScoreResult();

            SetMIFIDScore(totalScore);
            SetETFCount(3); // Default value
            SetBudget(100000);
            SaveDemoInput(totalScore, 3);
            PortfolioControl_Update(totalScore);
        }
        if (stepId == 4) {
            TradeControl_Update();
        }
    }

    function leaveAStepCallback(obj) {
        //alert("Step changed.");
        var step_num = obj.attr('rel');
        return validateSteps(step_num);
    }

    function onFinishCallback() {
        if (validateAllSteps()) {
            window.location.href = "/Home/Finish";
            //$('form').submit();
            //alert($('input[name=AGE]:checked', '#step-1').val());
            //alert("Score = " + $('input[name=AGE]:checked', '#step-1').attr("data-score"));
            //showScoreResult();
        }
    }

    $(".largeNavigationItem").click(function () { MembersNavigationItemSelected(this); })    
});

/* MEMBERS NAVIGATION */
function MembersNavigationItemSelected(item)
{
    $(".largeNavigationItem").removeClass("largeNavigationItemSelected");
    $(item).addClass("largeNavigationItemSelected");
    MembersSetBodyContent($(item).attr("data-url"));
}

function MembersSetBodyContent(url)
{
    $.ajax
    ({
        url: url,
        data: {},
        dataType: "html",
        beforeSend: function () { $("#MembersBodyContent").html("LOADING..."); }
    })    
    .done(function (html) {
        $("#MembersBodyContent").html(html);
        $(".memberDocumentItem").click(function () { MembersDocumentItemSelected(this); })
        $(".memberTransactionItem").click(function () { MembersTransactionItemSelected(this); })
        $(".memberEmailItem").click(function () { MembersEmailItemSelected(this); })
        $("#btnMemberSavePersonalInfo").click(function () { MembersSavePersonalInfo(); })
            
        if(url == "/Members/SummaryControl")
            PortfolioControl_Update();
    })
    .fail(function (error, textStatus) {
        showError(error.responseText);
    })
    .always(function () {
    });
}

function MembersDocumentItemSelected(item) {
    $(".memberDocumentItem").removeClass("memberDocumentItemSelected");
    $(item).addClass("memberDocumentItemSelected");
    MembersSetDocumentText($(item).attr("data-document-id"));
}

function MembersSetDocumentText(documentId) {
    $.ajax
    ({
        url: "/Members/DocumentText/" + documentId,
        data: {},
        dataType: "json",
        beforeSend: function () { $("#MembersDocumentText").html("LOADING..."); }
    })
    .done(function (result) {
        $("#MembersDocumentText").html(result.DocumentText);
    })
    .fail(function (error, textStatus) {
        showError(error.responseText);
    })
    .always(function () {
    });
}

function MembersTransactionItemSelected(item) {
    $(".memberTransactionItem").removeClass("memberTransactionItemSelected");
    $(item).addClass("memberTransactionItemSelected");
    MembersSetTransactionText($(item).attr("data-transaction-id"));
}

function MembersSetTransactionText(transactionId) {
    $.ajax
    ({
        url: "/Members/TransactionText/" + transactionId,
        data: {},
        dataType: "html",
        beforeSend: function () { $("#MembersTransactionText").html("LOADING..."); }
    })
    .done(function (result) {
        $("#MembersTransactionText").html(result);
    })
    .fail(function (error, textStatus) {
        showError(error.responseText);
    })
    .always(function () {
    });
}

function MembersEmailItemSelected(item) {
    $(".memberEmailItem").removeClass("memberEmailItemSelected");
    $(item).addClass("memberEmailItemSelected");
    MembersSetEmailText($(item).attr("data-email-id"));
}

function MembersSetEmailText(transactionId) {
    $.ajax
    ({
        url: "/Members/EmailText/" + transactionId,
        data: {},
        dataType: "json",
        beforeSend: function () { $("#MembersEmailText").html("LOADING..."); }
    })
    .done(function (result) {
        $("#MembersEmailText").html(result.EmailText);
    })
    .fail(function (error, textStatus) {
        showError(error.responseText);
    })
    .always(function () {
    });
}

function MembersSavePersonalInfo()
{
    var data = createPersonalInfoJsonData();

    $.ajax
    ({
        url: "/Members/SavePersonalInfo",
        data: { data:data},
        dataType: "json",
        beforeSend: function () { $("#btnMemberSavePersonalInfo").hide(); }
    })
    .done(function (result) {
    })
    .fail(function (error, textStatus) {
        showError(error.responseText);
    })
    .always(function () {
        $("#btnMemberSavePersonalInfo").show();
    });
}

function MembersCachePersonalInfo() {
    var data = createPersonalInfoJsonData();

    $.ajax
    ({
        url: "/Home/CachePersonalInfo",
        data: { data: data },
        dataType: "json",
        beforeSend: function () { $("#btnMemberSavePersonalInfo").hide(); }
    })
    .done(function (result) {
    })
    .fail(function (error, textStatus) {
        showError(error.responseText);
    })
    .always(function () {
        $("#btnMemberSavePersonalInfo").show();
    });
}

function createPersonalInfoJsonData()
{
    var data = "{\n";
    $("#MembersPersonalInfoDiv input").each(function () {
        if (data.length > 2)
            data += ",\n";
        var val = $(this).val();
        if (val == "" || val === null || val == null || val == undefined)
            val = "";
        data += "\"" + $(this).attr("id").replace("tb", "") + "\": \"" + val + "\"";
    });
    data += "\n}";

    return data;
}

/* END OF MEMBERS NAVIGATION */

/* DEMO PAGE METHODS */
function SetETFCount(count)
{
    $("#hfETFCount").val(count);
}

function GetETFCount() {
    return $("#hfETFCount").val()*1;
}

function SetMIFIDScore(score) {
    $("#hfMifidScore").val(score);
}

function GetMIFIDScore() {
    return $("#hfMifidScore").val()*1;
}

function SetBudget(score) {
    $("#hfBudget").val(score);
}

function GetBudget() {
    return $("#hfBudget").val() * 1;
}

function SaveETFCount(etfCount) {
    
    $.ajax({
        url: "/Home/SaveETFCount",
        data: "etfCount=" + etfCount
    }).done(function () {
        
    });
}

function SaveDemoInput(mifidScore, etfCount, budget)
{
    $.ajax({
        url: "/Home/SaveDemoInput",
        data: "mifidScore=" + mifidScore + "&etfCount=" + etfCount + "&budget=" + budget
    }).done(function () {

    });
}
/* END -> DEMO PAGE METHODS */



/* PORTFOLIO CONTROL METHODS */
function PortfolioControl_Update()
{    
    PortfolioControl_UpdateCharts();
    PortfolioControl_PopulateSliders();
}

function PortfolioControl_UpdateCharts()
{
    ShowAjaxLoader("#future-performance-chart-container");
    ShowAjaxLoader("#past-performance-chart-container");
    ShowAjaxLoader("#pie-chart-container1");
    var etfCount = GetETFCount();
    var mifidScore = GetMIFIDScore();
    var budget = GetBudget();

    getRDataAsync(mifidScore, etfCount, budget, PortfolioControl_PopulateGraphs);
    PortfolioControl_PopulateMIFIDGauge(mifidScore);
}

function PortfolioControl_PopulateSliders()
{
    $("#etf-slider").slider({
        value: GetETFCount(),
        min: 1,
        max: 8,
        step: 1,
        range: "min",
        animate: true,
        orientation: "horizontal",
        change: function (event, ui) { SetETFCount(ui.value); SaveDemoInput(GetMIFIDScore(), GetETFCount());  PortfolioControl_UpdateCharts(); }
    });

    $("#risk-level-slider").slider({
        value: GetMIFIDScore(),
        min: 50,
        max: 200,
        step: 1,
        range: "min",
        animate: true,
        orientation: "horizontal",
        change: function (event, ui) { SetMIFIDScore(ui.value); SaveDemoInput(GetMIFIDScore(), GetETFCount()); PortfolioControl_UpdateCharts(); }
    });
}

function PortfolioControl_PopulateMIFIDGauge(mifidScore)
{
    BuildGauge("#mifid-gauge-container", mifidScore);
}

function PortfolioControl_PopulateGraphs(rawRData)
{
    PortfolioControl_PopulatePieChart(rawRData);
    PortfolioControl_PopulatePastPerformanceChart(rawRData);
    PortfolioControl_PopulateFuturePerformanceChart(rawRData);
}

function PortfolioControl_PopulatePieChart(rawRData)
{
    var assetAllocationSeriesData = getSpecificData(rawRData, SKYNET_ASSET_ALLOCATION_SERIES);
    BuildPieChart('#pie-chart-container1', 'Asset allocation', assetAllocationSeriesData, PortfolioControl_PieChartSliceSelected);    
}

function PortfolioControl_PieChartSliceSelected(selectedSlice)
{
    var etfCount = GetETFCount();
    var mifidScore = GetMIFIDScore();
    var budget = GetBudget();

    ShowAjaxLoader("#asset-details-container");
    getRDataAsync(mifidScore, etfCount, budget, PortfolioControl_PopulateAssetDetails, selectedSlice);
    //alert(selectedSlice);
}

function PortfolioControl_PopulateAssetDetails(rawRData, selectedSlice)
{
    var description = getAcronymDescription(selectedSlice, rawRData);
    $("#asset-details-container").html(description);
}

function PortfolioControl_PopulatePastPerformanceChart(rawRData) {
    var historicalPerformanceSeriesData = getSpecificData(rawRData, SKYNET_HISTORICAL_PERFORMANCE_SERIES);
    var historicalBenchmarkSeriesData = getSpecificData(rawRData, SKYNET_HISTORICAL_BENCHMARK_SERIES);
    var data = [CreateSeriesArrayItem("World Total Stock Markets", historicalBenchmarkSeriesData), CreateSeriesArrayItem("Performance", historicalPerformanceSeriesData)];
    BuildPerformanceChart('#past-performance-chart-container', data, 'Past Performance');
}

function PortfolioControl_PopulateFuturePerformanceChart(rawRData) {
    var futurePerformanceSeriesData = getSpecificData(rawRData, SKYNET_FUTURE_PERFORMANCE_SERIES);
    var futurePerformanceSeries5QuantileData = getSpecificData(rawRData, SKYNET_FUTURE_PERFORMANCE_5_QUANTILE_SERIES);
    var futurePerformanceSeries95QuantileData = getSpecificData(rawRData, SKYNET_FUTURE_PERFORMANCE_95_QUANTILE_SERIES);
    //var data = [CreateSeriesArrayItem("Above 75%", futurePerformanceSeriesAbove75Data), CreateSeriesArrayItem("Below 75%", futurePerformanceSeriesBelow75Data), CreateSeriesArrayItem("Performance", futurePerformanceSeriesData)];
    var data = [CreateSeriesArrayItem("5% quantile", futurePerformanceSeries5QuantileData), CreateSeriesArrayItem("95% quantile", futurePerformanceSeries95QuantileData), CreateSeriesArrayItem("Performance", futurePerformanceSeriesData)];
    BuildPerformanceChart('#future-performance-chart-container', data, 'Projected Future Performance');
}
/* END ---> PORTFOLIO CONTROL METHODS */

/* TRADE CONTROL METHODS */
function TradeControl_Update()
{
    TradeControl_UpdateCharts();
}

function TradeControl_UpdateCharts()
{
    ShowAjaxLoader("#final-pie-chart-container");

    var etfCount = GetETFCount();
    var mifidScore = GetMIFIDScore();
    var budget = GetBudget();

    getRDataAsync(mifidScore, etfCount, budget, TradeControl_PopulateCharts);
}

function TradeControl_PopulateCharts(rawRData)
{
    TradeControl_PopulatePieChart(rawRData);
    TradeControl_PopulateAssetAllocationTable(rawRData);
}

function TradeControl_PopulatePieChart(rawRData) {
    var assetAllocationSeriesData = getSpecificData(rawRData, SKYNET_ASSET_ALLOCATION_SERIES);
    BuildPieChart('#final-pie-chart-container', 'Asset allocation', assetAllocationSeriesData, null);
}

function TradeControl_PopulateAssetAllocationTable(rawRData)
{
    var assetAllocationSeriesData = getSpecificData(rawRData, SKYNET_ASSET_ALLOCATION_SERIES);

    var html = "";
    html += "<table>";
    html += "<tr>";
    html += "<td class=\"dataTableHeading\" style=\"font-style:italic;width: 110px;\">ASSET</td>";
    html += "<td class=\"dataTableHeading\" style=\"font-style:italic;width: 130px;\">PERCENTAGE</td>";
    html += "<td class=\"dataTableHeading\" style=\"font-style:italic;width: 150px;\">AMOUNT</td>";
    html += "</tr>";
    var oddRow = true;

    for (i = 0; i < assetAllocationSeriesData.length; i++) {
        var acronym = assetAllocationSeriesData[i].name; // YYYY-MM-DD
        var percentage = (assetAllocationSeriesData[i].y)/(10); // YYYY-MM-DD
        //var ccc = assetAllocationSeriesData[i][2]; // YYYY-MM-DD
        var amount = Math.round((100000 * percentage)/100);
        var tableClass = "dataTableOddRow";
        if (!oddRow)
            tableClass = "dataTableEvenRow";

        html += "<tr>";
        html += "<td class=\"" + tableClass + "\">" + acronym + "</td>";
        html += "<td class=\"" + tableClass + "\">" + percentage + "</td>";
        html += "<td class=\"" + tableClass + "\">" + amount + "</td>";
        html += "</tr>";
    }

    html += "</table>";
    $("#final-asset-allocation-table").html(html);
}

/* END OF TRADE CONTROL METHODS */

/* Index Page Methods */
function PopulateHistoricalPerformanceChart(rawRData) {
    var historicalPerformanceSeriesData = getSpecificData(rawRData, SKYNET_HISTORICAL_PERFORMANCE_SERIES);
    var historicalBenchmarkSeriesData = getSpecificData(rawRData, SKYNET_HISTORICAL_BENCHMARK_SERIES);
    var data = [CreateSeriesArrayItem("World Total Stock Markets", historicalBenchmarkSeriesData), CreateSeriesArrayItem("Performance", historicalPerformanceSeriesData)];
    BuildPerformanceChart("#historical-performance-chart-container", data, "Past Performance");
}
/* End of Index Page Methods */

function showError(errorMessage)
{
    $("#statusBar").html("<div style=\"padding: 6px;\">" + errorMessage + "</div>");
    $("#statusBar").attr("style", "border: solid 2px red;");
    $("#statusBar").effect("pulsate", null, 5000);
}

function tradePortfolio()
{
    var portfolio = getAssetAllocationData();

    $("#statusBar").html("Trading selected portfolio...");

    $.ajax
    ({
        url: "/Home/TradePortfolio",
        data: {
            portfolio: portfolio
        },
        dataType: "json",
        traditional: true,
    })
    .done(function () {
        $("#statusBar").html("Portfolio traded successfully.");
    })
    .fail(function (error, textStatus) {
        //$("#statusBar").html("Trade portfolio failed.");
        showError(error.responseText);
    })
    .always(function () {
        //$("#statusBar").html("Portfolio traded executed.");
    });
}

function getScoreResult()
{
    var totalScore = 0;
    $("#mifidQuestionDiv .question").each(function () {        
        var type = $(this).attr("data-question-type");
        if (type == "RadioButtonQuestion")
        {            
            var score = $(this).find("input[type=\"radio\"]:checked").attr("data-score");            
            totalScore += Number(score);
        }        
    });

    return totalScore;
}

function buildQuestionArray()
{
    var questionArr = new Array();
    var i = 0;
    $("#wizard .question").each(function ()
    {        
        var value = $(this).attr("data-value");
        var score = $(this).attr("data-score");
        var questionId = $(this).attr("data-question-id");
        var question = [value, score, questionId];
        questionArr[i] = question;
        i++;
    });

    //alert(questionArr[0][2]);
    //$("#wizard .question").each(function () { alert("val=" + $(this).attr("data-value") + " score=" + $(this).attr("data-score") + " questionId=" + $(this).attr("data-question-id")); });
}

function updateQuestionValues(e)
{
    var selectedValue = $(e.currentTarget).attr("value");
    var selectedScore = $(e.currentTarget).attr("data-score");
    var currentQuestion = $(e.currentTarget).closest(".question");
    var currentQuestionId = currentQuestion.attr("data-question-id");

    currentQuestion.attr("data-value", selectedValue);
    currentQuestion.attr("data-score", selectedScore);

    //alert("val=" + selectedValue + " score=" + selectedScore + " questionId=" + currentQuestionId);
}

function showScoreResult()
{
    var totalScore = getScoreResult();
    //window.location.href = "/Home/Graphs?mifidScore=" + totalScore + "&numberOfETFs=3"; // TODO Problem here
    $(".buttonNext").click();
    //window.location.href = "/Home";

    //$(this).load('/Home/Graphs');
}


/* Smart Wizard */
function validateAllSteps() {
    var isStepValid = true;

    if (validateStep1() == false) {
        isStepValid = false;
        $('#wizard').smartWizard('setError', { stepnum: 1, iserror: true });
    } else {
        $('#wizard').smartWizard('setError', { stepnum: 1, iserror: false });
    }

    if (validateStep3() == false) {
        isStepValid = false;
        $('#wizard').smartWizard('setError', { stepnum: 3, iserror: true });
    } else {
        $('#wizard').smartWizard('setError', { stepnum: 3, iserror: false });
    }

    if (!isStepValid) {
        $('#wizard').smartWizard('showMessage', 'Please correct the errors in the steps and continue');
    }

    return isStepValid;
}

function validateSteps(step) {
    var isStepValid = true;
    // validate step 1
    if (step == 1) {
        if (validateStep1() == false) {
            isStepValid = false;
            $('#wizard').smartWizard('showMessage', 'You need to complete a MIFID survey to continue. Thank you.');
            $('#wizard').smartWizard('setError', { stepnum: step, iserror: true });
        } else {
            $('#wizard').smartWizard('setError', { stepnum: step, iserror: false });
        }
    }

    // validate step3
    if (step == 3) {
        if (validateStep3() == false) {
            isStepValid = false;
            $('#wizard').smartWizard('showMessage', 'Please correct the errors in step' + step + ' and click next.');
            $('#wizard').smartWizard('setError', { stepnum: step, iserror: true });
        } else {
            $('#wizard').smartWizard('setError', { stepnum: step, iserror: false });
        }
    }

    return isStepValid;
}

function validateStep1() 
{
    return getScoreResult() > 0;
}

function validateStep1Old() {
    var isValid = true;
    // Validate Username
    /*var un = $('#username').val();
    if (!un && un.length <= 0) {
        isValid = false;
        $('#msg_username').html('Please fill username').show();
    } else {
        $('#msg_username').html('').hide();
    }

    // validate password
    var pw = $('#password').val();
    if (!pw && pw.length <= 0) {
        isValid = false;
        $('#msg_password').html('Please fill password').show();
    } else {
        $('#msg_password').html('').hide();
    }

    // validate confirm password
    var cpw = $('#cpassword').val();
    if (!cpw && cpw.length <= 0) {
        isValid = false;
        $('#msg_cpassword').html('Please fill confirm password').show();
    } else {
        $('#msg_cpassword').html('').hide();
    }

    // validate password match
    if (pw && pw.length > 0 && cpw && cpw.length > 0) {
        if (pw != cpw) {
            isValid = false;
            $('#msg_cpassword').html('Password mismatch').show();
        } else {
            $('#msg_cpassword').html('').hide();
        }
    }*/
    return isValid;
}

function validateStep3() {
    var isValid = true;
    //validate email  email
    /*var email = $('#email').val();
    if (email && email.length > 0) {
        if (!isValidEmailAddress(email)) {
            isValid = false;
            $('#msg_email').html('Email is invalid').show();
        } else {
            $('#msg_email').html('').hide();
        }
    } else {
        isValid = false;
        $('#msg_email').html('Please enter email').show();
    }*/
    return isValid;
}

// Email Validation
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}
/*********************************** End of Smart Wizard */

/** Table Data Helpers */

function BuildSortableTable(tableDiv, assetAllocationSeriesTableData) {
    // http://tablesorter.com/docs/
    $(tableDiv).tablesorter();

    var html = getPortfolioListTableData(assetAllocationSeriesTableData);
    $("#assetListTableBody").html(html);
}

function getPortfolioListTableDataDummy() {
    var html = "<tr>";
    html += "<td>JKD</td>";
    html += "<td>38.3%</td>";
    html += "<td>iShares Morningstar Large Core Index Fund (the Fund) seeks investment results that correspond generally to the price and yield performance of the Morningstar Large Core Index (the Index).</td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td>EWM</td>";
    html += "<td>33.3%</td>";
    html += "<td>iShares MSCI Malaysia Index Fund (the Fund) seeks to provide investment results that correspond generally to the price and yield performance of publicly traded securities in the aggregate in the Malaysian market, as measured by the MSCI Malaysia Index (the Index). </td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td>AGG</td>";
    html += "<td>33.3%</td>";
    html += "<td>iShares Core Total US Bond Market ETF, formerly iShares Lehman Aggregate Bond Fund (the Fund) seeks investment results that correspond generally to the price and yield performance of the total United States investment-grade bond market as defined by the Lehman Brothers U.S. Aggregate Index (the Index).</td>";
    html += "</tr>";

    return html;
}

function getPortfolioListTableData(assetAllocationSeriesTableData)
{
    var html = "";

    for (i = 0; i < assetAllocationSeriesTableData.length; i++) {
        html += "<tr>";
        var acronym = assetAllocationSeriesTableData[i][0];
        var value = assetAllocationSeriesTableData[i][1];
        var description = assetAllocationSeriesTableData[i][2];
        html += "<td>" + acronym + "</td>";
        html += "<td>" + value + "</td>";
        html += "<td>" + description + "</td>";
        html += "</tr>";
    }

    return html;
}

/*********************************** Highcharts ***************************************/
/*$(function () {

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

    // Build the chart
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market shares at a specific website, 2014'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
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
            ]
        }]
    });
});
*/

/************************************** End of Highcharts ****************************/

function ShowAjaxLoader(divId)
{
    $(divId).html("<div style=\"width: 100%\"><img src=\"/Content/images/ajax-loader2.gif\" /></div>");
}


function SubmitFeedback()
{
    //ShowAjaxLoader("#btnSubmitFeedback");
    $("#btnSubmitFeedback").hide();

    var fullName = $("#fullName").val();
    var age = $("#age").val();
    var phone = $("#phone").val();
    var mail = $("#mail").val();
    var occupation = $("#occupation").val();

    var computerSkill = $("input[name=rbComputerSkillLevel]:checked").val();
    var investingSkill = $("input[name=rbInvestingSkillLevel]:checked").val();
    var investmentStrategy = $("input[name=rbInvestmentStrategy]:checked").val();
    var preferredPartner = $("input[name=rbPreferredPartner]:checked").val();
    var understandingOfContent = $("input[name=rbUnderstandContent]:checked").val();
    var navigation = $("input[name=rbNavigation]:checked").val();
    var easyInformation = $("input[name=rbEasyInformation]:checked").val();
    var siteMotivation = $("input[name=rbSiteMotivation]:checked").val();
    var overallRating = $("input[name=rbOverallRating]:checked").val();

    var bestStuff = $("#tbBestStuff").val();
    var confusingStuff = $("#tbConfusingStuff").val();
    var missingSomething = $("#tbMissSomething").val();
    var whatToImprove = $("#tbWhatToImprove").val();
    var whatYouRecommendSite = $("#tbRecommendSite").val();

    var feedback = "FEEDBACK*newline*";
    feedback += "fullName= " + fullName + "*newline*";
    feedback += "age= " + age + "*newline*";
    feedback += "phone= " + phone + "*newline*";
    feedback += "mail= " + mail + "*newline*";
    feedback += "occupation= " + occupation + "*newline*";

    feedback += "computerSkill= " + computerSkill + "*newline*";
    feedback += "investingSkill= " + investingSkill + "*newline*";
    feedback += "investmentStrategy= " + investmentStrategy + "*newline*";
    feedback += "preferredPartner= " + preferredPartner + "*newline*";
    feedback += "understandingOfContent= " + understandingOfContent + "*newline*";
    feedback += "navigation= " + navigation + "*newline*";
    feedback += "easyInformation= " + easyInformation + "*newline*";
    feedback += "siteMotivation= " + siteMotivation + "*newline*";
    feedback += "overallRating= " + overallRating + "*newline*";

    feedback += "bestStuff= " + bestStuff + "*newline*";
    feedback += "confusingStuff= " + confusingStuff + "*newline*";
    feedback += "missingSomething= " + missingSomething + "*newline*";
    feedback += "whatToImprove= " + whatToImprove + "*newline*";
    feedback += "whatYouRecommendSite= " + whatYouRecommendSite + "*newline*";
    
    $.ajax(
    {
        url: "/Home/SubmitFeedback",
        data: "feedback=" + feedback
    }
    ).always(function () { $("#btnSubmitFeedback").show(); });
}


/******************** Templates ***************************/
function showOpenBetDialog(e) {
    $("#selectedBetValue").text($(e).attr("data-bet-value"));
    $("#selectedBetTitle").text($(e).attr("data-bet-title"));
    $("#selectedBetOutcome").text($(e).attr("data-bet-outcome"));

    $("#dialog-modal").dialog({ width: 500, height: 600 });
    $("#dialog-modal").dialog("open");

    $(".inviteAction").click(function (e) { inviteUninviteFriend(e.currentTarget); });
}

function inviteUninviteFriend(e) {
    if ($(e).text() == "Invitér")
        $(e).text("Fjern");
    else
        $(e).text("Invitér");
}
/*****************************************************************/