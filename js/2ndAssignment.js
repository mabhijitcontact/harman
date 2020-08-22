var allInOne = (function () {
    var noOfDayLeft = 0;
    var starttime = new Date("july 1, 2020 23:59:59");
    var deadline = new Date("Aug 20, 2020 23:59:59");
    var moneyToPay = 210;
    function getRemainingDay(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function initProgressBar(id = null, endtime, starttime) {
        //var $progress = $(".progress-bar");
        var $progress = document.querySelector(".progress-bar")

        function updateClock() {
            var t = getRemainingDay(endtime);

            var p =
                Math.round(((new Date() - starttime) / (endtime - starttime)) * 100) +
                "%";
            //$progress.css("width", p);
            $progress.style.width = p;
            noOfDayLeft = t.days;
            if (noOfDayLeft > 1)
                document.querySelector("#noOfDaysLeft").innerHTML = "Only " + noOfDayLeft + " days";
            else if (noOfDayLeft == 1)
                document.querySelector("#noOfDaysLeft").innerHTML = "Today is the last day";
            else if (noOfDayLeft <= -1)
                document.querySelector("#noOfDaysLeft").innerHTML = `Sorry, last day was ${Math.abs(noOfDayLeft)} days back`;

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    function isNumber(value) {
        if (typeof value !== 'number') {
            return false
        }
        if (value !== Number(value)) {
            return false
        }
        if (value === Infinity || value === !Infinity) {
            return false
        }
        return true;
    }
    function initApp() {
        //init Progress Bar
        initProgressBar("", deadline, starttime);
        //init Input Box
        document
            .querySelector('input[type = "text"]')
            .addEventListener("keyup", function (event) {
                let textElement = document.querySelector("#" + event.target.id);
                const num = parseFloat(textElement.value)
                if (!isNumber(num)) {
                    textElement.value = "";
                }
            });
        //init Button
        document
            .getElementById('formCC')
            .addEventListener("submit", function (event) {
                event.preventDefault();
                const formElem = event.target.elements;
                if (formElem.idMoney.value > 0 && formElem.idMoney.value < moneyToPay) {
                    document.getElementById("whyGive").innerHTML = "$" + formElem.idMoney.value
                    document.querySelector('.whyGive').style.display = 'block';
                } else {
                    document.querySelector('.popover').style.display = 'none';
                    document.querySelector('.whyGive').style.display = 'none';
                    return false;
                }
                const checkPaidFull = moneyToPay - formElem.idMoney.value;
                if (moneyToPay > formElem.idMoney.value) {
                    document.querySelector('.popover').innerHTML = `$ ${checkPaidFull} still need for this project`;
                    document.querySelector('.popover').style.display = 'block';
                } else {
                    document.querySelector('.popover').style.display = 'none';
                }
                return false;
            });

    }
    return {
        initApp: initApp,
        isNumber: isNumber
    }

}());




