/* This is a SAC (Service Access Component) for accessing services in the cloud */

/*
1. Navne på ETFerne i den anbefalede portfolio,
2. vægte i portfolio tilknyttet de enkelte anbefalede ETFer
3. beskrivelse af de enkelte anbefalede ETFer
4. (backtest) datoer til backtest
5. (backtest) historisk udvikling af 100.000 
6. navne på performance statistikker (fx. gennemsnit, standard afvigelse,...)
7. værdier for de forskellige performance statistikker
8. (future test) 95% sandsynlighed for at den fremtidige udvikling af portfolioen vil være over dette niveau
9. (future test) 75% sandsynlighed for at den fremtidige udvikling af portfolioen vil være over dette niveau
10. (future test) forventet udvikling af portfolien
11. (future test) 75% sandsynlighed for at den fremtidige udvikling af portfolioen vil være lavere end dette niveau
12. (future test) 95% sandsynlighed for at den fremtidige udvikling af portfolioen vil være lavere end dette niveau
13. (future test) datoer for forventet fremtidig udvikling af den anbefalede portfolio
14. Benchmark for backtest. Den historiske udvikling af S&P500.
*/

const SKYNET_HISTORICAL_PERFORMANCE_SERIES = 0;
const SKYNET_PROBABILITY_SERIES = 1;
const SKYNET_CATEGORY_ALLOCATION_SERIES = 2;
const SKYNET_ASSET_ALLOCATION_SERIES = 3;
const SKYNET_ASSET_ALLOCATION_TABLE_SERIES = 4;
const SKYNET_FUTURE_PERFORMANCE_SERIES = 5;
const SKYNET_HISTORICAL_BENCHMARK_SERIES = 6;
const SKYNET_FUTURE_PERFORMANCE_ABOVE75_SERIES = 7;
const SKYNET_FUTURE_PERFORMANCE_BELOW75_SERIES = 8;
const SKYNET_FUTURE_PERFORMANCE_5_QUANTILE_SERIES = 9;
const SKYNET_FUTURE_PERFORMANCE_95_QUANTILE_SERIES = 10;

/** Returns all the latest data from R based on score and ETF count */
function getRDataTest(score, etfCount)
{
    var rawRData = new Array();

    var performanceSeriesData = [4.2, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1];
    var probabilitySeriesData = [0.3, 8.1, 1.3, 0.1];
    var categoryAllocationSeriesData = [['Bonds', 45.0], ['Stocks', 26.8]];
    var assetAllocationSeriesData = [['AGG', 25.0], ['JKD', 39], ['EWM', 36]];

    rawRData[SKYNET_PERFORMANCE_SERIES] = performanceSeriesData;
    rawRData[SKYNET_PROBABILITY_SERIES] = probabilitySeriesData;
    rawRData[SKYNET_CATEGORY_ALLOCATION_SERIES] = categoryAllocationSeriesData;
    rawRData[SKYNET_ASSET_ALLOCATION_SERIES] = assetAllocationSeriesData;

    return rawRData;
}

/* Extract data from the specific array based on the constant type given */
function getSpecificData(rawRData, type)
{
    return rawRData[type];
}


function getAcronymDescription(acronym, compiledData)
{
    //var assetAllocationSeriesAcronyms = rawRData[0];
    //var assetAllocationSeriesDescriptions = rawRData[2];

    var assetAllocationSeriesTableData = getSpecificData(compiledData, SKYNET_ASSET_ALLOCATION_TABLE_SERIES);

    for (i = 0; i < assetAllocationSeriesTableData.length; i++) {
        if (assetAllocationSeriesTableData[i][0] == acronym)
            return assetAllocationSeriesTableData[i][2];
    }

    return "N/A";
}

function getRDataAsync(score, etfCount, budget, fnCallback, userContext)
{
    var compiledRData = new Array();
    // location of R function on openCPU server
    //http://www.robustinvestmentsystems.com/app1.html
    //ocpu.seturl("//public.opencpu.org/ocpu/library/stocks/R")
    ocpu.seturl("https://public.opencpu.org/ocpu/github/Bjerring/RISpackage2/R");

    //perform the request
    var req = ocpu.rpc("wrap", { score: score, Cno: etfCount, budget: budget },
        function (out)
        {
            var rawRData = $.parseJSON(out);

            /** Future Performance Data */
            var futurePerformanceSeriesData = rawRData[9];
            var futurePerformanceSeriesDates = rawRData[12];
            for (i = 0; i < futurePerformanceSeriesData.length; i++) {
                var dateString = futurePerformanceSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(futurePerformanceSeriesData[i] * 100) / 100;
                futurePerformanceSeriesData[i] = [datePoint, value];
            }

            /** Future Performance Above 75% Data */
            var futurePerformanceSeriesAbove75Data = rawRData[8];
            for (i = 0; i < futurePerformanceSeriesAbove75Data.length; i++) {
                var dateString = futurePerformanceSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(futurePerformanceSeriesAbove75Data[i] * 100) / 100;
                futurePerformanceSeriesAbove75Data[i] = [datePoint, value];
            }

            /** Future Performance Below 75% Data */
            var futurePerformanceSeriesBelow75Data = rawRData[10];
            for (i = 0; i < futurePerformanceSeriesBelow75Data.length; i++) {
                var dateString = futurePerformanceSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(futurePerformanceSeriesBelow75Data[i] * 100) / 100;
                futurePerformanceSeriesBelow75Data[i] = [datePoint, value];
            }

            /** Future Performance 5% Quantile Data */
            var futurePerformanceSeries5QuantileData = rawRData[7];
            for (i = 0; i < futurePerformanceSeries5QuantileData.length; i++) {
                var dateString = futurePerformanceSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(futurePerformanceSeries5QuantileData[i] * 100) / 100;
                futurePerformanceSeries5QuantileData[i] = [datePoint, value];
            }

            /** Future Performance 95% Quantile Data */
            var futurePerformanceSeries95QuantileData = rawRData[11];
            for (i = 0; i < futurePerformanceSeries95QuantileData.length; i++) {
                var dateString = futurePerformanceSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(futurePerformanceSeries95QuantileData[i] * 100) / 100;
                futurePerformanceSeries95QuantileData[i] = [datePoint, value];
            }

            /** Historical Performance Data */
            var historicalPerformanceSeriesData = rawRData[4];
            var historicalPerformanceSeriesDates = rawRData[3];
            for (i = 0; i < historicalPerformanceSeriesData.length; i++) {
                var dateString = historicalPerformanceSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(historicalPerformanceSeriesData[i] * 100) / 100;
                historicalPerformanceSeriesData[i] = [datePoint, value];
            }

            /** Historical Benchmark Data */
            var historicalBenchmarkSeriesData = rawRData[13];
            var historicalBenchmarkSeriesDates = rawRData[3];
            for (i = 0; i < historicalBenchmarkSeriesData.length; i++) {
                var dateString = historicalBenchmarkSeriesDates[i]; // YYYY-MM-DD
                var datePoint = parseDate(dateString);
                var value = Math.round(historicalBenchmarkSeriesData[i] * 100) / 100;
                historicalBenchmarkSeriesData[i] = [datePoint, value];
            }

            /** Asset Allocation Data  */
            var assetAllocationSeriesData = new Array();
            var assetAllocationSeriesAcronyms = rawRData[0];
            var assetAllocationSeriesValues = rawRData[1];
            i = 0;
            for (i = 0; i < assetAllocationSeriesAcronyms.length; i++) {
                var acronym = assetAllocationSeriesAcronyms[i]; // YYYY-MM-DD
                var value = Math.round(assetAllocationSeriesValues[i]*10000)/10;
                assetAllocationSeriesData[i] = [acronym, value];
            }

            /** Asset Allocation Table Data  */
            var assetAllocationSeriesTableData = new Array();
            var assetAllocationSeriesDescriptions = rawRData[2];
            i = 0;
            for (i = 0; i < assetAllocationSeriesAcronyms.length; i++) {
                var acronym = assetAllocationSeriesAcronyms[i]; // YYYY-MM-DD
                var value = Math.round(assetAllocationSeriesValues[i] * 1000)/10;
                var description = assetAllocationSeriesDescriptions[i];
                assetAllocationSeriesTableData[i] = [acronym, value, description];
            }

            var probabilitySeriesData = [0.3, 8.1, 1.3, 0.1];
            var categoryAllocationSeriesData = [['Bonds', 45.0], ['Stocks', 26.8]];

            compiledRData[SKYNET_FUTURE_PERFORMANCE_SERIES] = futurePerformanceSeriesData;
            compiledRData[SKYNET_FUTURE_PERFORMANCE_ABOVE75_SERIES] = futurePerformanceSeriesAbove75Data;
            compiledRData[SKYNET_FUTURE_PERFORMANCE_BELOW75_SERIES] = futurePerformanceSeriesBelow75Data;
            compiledRData[SKYNET_FUTURE_PERFORMANCE_5_QUANTILE_SERIES] = futurePerformanceSeries5QuantileData;
            compiledRData[SKYNET_FUTURE_PERFORMANCE_95_QUANTILE_SERIES] = futurePerformanceSeries95QuantileData;
            compiledRData[SKYNET_HISTORICAL_PERFORMANCE_SERIES] = historicalPerformanceSeriesData;
            compiledRData[SKYNET_HISTORICAL_BENCHMARK_SERIES] = historicalBenchmarkSeriesData;
            compiledRData[SKYNET_PROBABILITY_SERIES] = probabilitySeriesData;
            compiledRData[SKYNET_CATEGORY_ALLOCATION_SERIES] = categoryAllocationSeriesData;
            compiledRData[SKYNET_ASSET_ALLOCATION_SERIES] = assetAllocationSeriesData;
            compiledRData[SKYNET_ASSET_ALLOCATION_TABLE_SERIES] = assetAllocationSeriesTableData;            

            fnCallback(compiledRData, userContext);
        });

    //if R returns an error, alert the error message
    req.fail(function () {
        alert("Server error: " + req.responseText);
    });

    //after request complete, re-enable the button
    req.always(function () {
        
    });

    //return compiledRData;
}

function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return Date.UTC(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
}