
const HOURS_PER_DAY = 6;
const DAYS_PER_WEEK = 5;

$(function() {
    $("div.results-panel").on('DOMNodeInserted', function(e) {
        $(e.target).find(".timeoriginalestimate, .timeestimate").each(function(index,value) {
            // Does html content of target contain the word "days"?
            if ($(value).text().indexOf("day") > -1 || $(value).text().indexOf("week") > -1) {
                var toks = $(value).text().split(' ');
                var idx = 0;
                var lastValue = parseInt(toks[idx++]);
                var hoursTotal = 0;

                // Pull out values and convert to hours
                while (idx < toks.length) {
                    if (toks[idx].replace(/,/g, '') == 'weeks' || toks[idx].replace(/,/g, '') == 'week') {
                        hoursTotal += HOURS_PER_DAY * DAYS_PER_WEEK * lastValue;
                    } else
                    if (toks[idx].replace(/,/g, '') == 'days' || toks[idx].replace(/,/g, '') == 'day') {
                        hoursTotal += HOURS_PER_DAY * lastValue;
                    } else
                    if (toks[idx].replace(/,/g, '') == 'hours' || toks[idx].replace(/,/g, '') == 'hour') {
                        hoursTotal += 1 * lastValue;
                    }

                    idx++;
                    lastValue = toks[idx++];
                }

                // Set text of cell to total hours
                $(value).text(hoursTotal+' hours');
            }
        });
    });
});
