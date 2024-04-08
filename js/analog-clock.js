let startClock = function (_options) {
    // Days and Months store
    let _days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    // get local time
	let _local_time = new Date();
    // date timezone in HOURS => not sure if a remainder exists
    let _local_timezone = -(_local_time.getTimezoneOffset() / 60);
    // date time in LONDON where GMT +0000
    let _local_time_london = 0;
    // check timezone on number line
    // To get local time in London, 
    if (_local_timezone > 0) {
        // time in London 
        _local_time_london = _local_time.getTime() - (_local_timezone*60*60*1000);
    } else if (_local_timezone < 0) {
        // time in London
        _local_time_london = _local_time.getTime() + (_local_timezone*60*60*1000);
    } else {
        // time in London
        _local_time_london = _local_time.getTime();
    }
    // Now let's format the Time
    // from London time to any time by
    // adding timezone given in the OPTIONS 

    // ****OPTIONS**** //

    // timezone in GMT format e.g; GMT+0200, we take & need +2
    let _option_timezone = _options.timezone || _local_timezone; // local timezone as fallback

    // Containers for Time Display 
        // Timezone Name
    let _option_cityDisplay = (_options.displayPrint && _options.displayPrint.city) ? _options.displayPrint.city : null;
        // hour
    let _option_hourDisplay = (_options.displayPrint && _options.displayPrint.hour) ? _options.displayPrint.hour : null;
        // minute
    let _option_minuteDisplay = (_options.displayPrint && _options.displayPrint.minute) ? _options.displayPrint.minute : null;
        // second
    let _option_secondDisplay = (_options.displayPrint && _options.displayPrint.second) ? _options.displayPrint.second : null;
        // day
    let _option_dayDisplay = (_options.displayPrint && _options.displayPrint.day) ? _options.displayPrint.day : null;
        // date
    let _option_dateDisplay = (_options.displayPrint && _options.displayPrint.date) ? _options.displayPrint.date : null;
        // month
    let _option_monthDisplay = (_options.displayPrint && _options.displayPrint.month) ? _options.displayPrint.month : null;
        // year
    let _option_yearDisplay = (_options.displayPrint && _options.displayPrint.year) ? _options.displayPrint.year : null;

    // Containers for Action Hands
        // hour hand
    let _option_hourHand = (_options.actionHand && _options.actionHand.hour) ? _options.actionHand.hour : null;
        // minute hand
    let _option_minuteHand = (_options.actionHand && _options.actionHand.minute) ? _options.actionHand.minute : null;
        // second hand
    let _option_secondHand = (_options.actionHand && _options.actionHand.second) ? _options.actionHand.second : null;

    // Timezones with their names
    // Each should be identical
    // valid timezone inputs
    let _option_valid_zones = (_options.timeZones && _options.timeZones.length!=0) ? _options.timeZones : null;

    // ****OPTIONS**** //

    // Which City & Timezone
    let _whichCity = 'City';
    if (_option_valid_zones) {
        for (let i = 0; i < _option_valid_zones.length; i++) {
            if (_option_valid_zones[i].offset == _option_timezone) {
                _whichCity = _option_valid_zones[i].name;
                //console.log('City : '+_valid_timezone[i].name);
                break;
            }
        }
    }

    // OVERWRITE the local hours 
    // New datetime in the given timezone / local timezone as default
    // We create new Date Object with London time plus the timezone offset( changed to milliseconds ) 
    let _new_correct_time = new Date(_local_time_london + (Number(_option_timezone) * 60 * 60 * 1000));
    // Now, its a new time/date 
    // so we fetch the constraints 
    // date string
    const _new_correct_year = _new_correct_time.getFullYear();
    const _new_correct_month = _new_correct_time.getMonth();
    const _new_correct_date = _new_correct_time.getDate();
    const _new_correct_day = _new_correct_time.getDay();
    // date time
    const _new_correct_second = _new_correct_time.getSeconds();
    const _new_correct_minute = _new_correct_time.getMinutes();
    let _new_correct_hour = _new_correct_time.getHours();


    // With the correct time now,
    // calculate the TRANSFORMATION of each hand
	const secondsFraction = _new_correct_second / 60;
  	const minutesFraction = (secondsFraction + _new_correct_minute) / 60;
  	const hoursFraction = (minutesFraction + _new_correct_hour) / 12;

    // Prepare to print/apply   
        // hands rotation
    let _second_rotation = secondsFraction*360;
    let _minute_rotation = minutesFraction*360;
    let _hour_rotation = hoursFraction*360;
        // date string
    let _print_date = _new_correct_date;
    let _print_day = _days[_new_correct_day];
    let _print_month = _months[_new_correct_month];
    let _print_year = _new_correct_year;
        // timezone name
    let _print_city = _whichCity;
        // date time
    let _print_second = _new_correct_second;
    let _print_minute = _new_correct_minute;
    let _print_hour = _new_correct_hour;


    // Apply the Action EFFECT on the hands
    if (_option_secondHand) {
        document.querySelector(_option_secondHand).style.transform = `rotate(${_second_rotation}deg)`;
    }
    if (_option_minuteHand) {
        document.querySelector(_option_minuteHand).style.transform = `rotate(${_minute_rotation}deg)`;
    }
    if (_option_hourHand) {
        document.querySelector(_option_hourHand).style.transform = `rotate(${_hour_rotation}deg)`;
    }

    // Display Independent values
    if (_option_secondDisplay) {
        document.querySelector(_option_secondDisplay).innerHTML = _new_correct_second < 10 ? '0' + _new_correct_second : _new_correct_second;
    }
    if (_option_minuteDisplay) {
        document.querySelector(_option_minuteDisplay).innerHTML = _new_correct_minute < 10 ? '0' + _new_correct_minute : _new_correct_minute;
    }
    if (_option_hourDisplay) {
        document.querySelector(_option_hourDisplay).innerHTML = _new_correct_hour < 10 ? '0' + _new_correct_hour : _new_correct_hour;
    }
    if (_option_dayDisplay) {
        document.querySelector(_option_dayDisplay).innerHTML = _print_day + ', ' ;
    }
    if (_option_dateDisplay) {
        document.querySelector(_option_dateDisplay).innerHTML = _print_date;
    }
    if (_option_monthDisplay) {
        document.querySelector(_option_monthDisplay).innerHTML = _print_month;
    }
    if (_option_yearDisplay) {
        document.querySelector(_option_yearDisplay).innerHTML = _print_year;
    }
    if (_option_cityDisplay) {
        document.querySelector(_option_cityDisplay).innerHTML = _print_city;
    }
}

// Running 
let _some_time_zones = [
    {
        name : 'Samoa',
        offset : -11,
        gmt : '-11:00'
    },
    {
        name : 'Honolulu',
        offset : -10,
        gmt : '-10:00'
    },
    {
        name : 'Anchorage',
        offset : -9,
        gmt : '-09:00'
    },
    {
        name : 'Los Angeles',
        offset : -8,
        gmt : '-08:00'
    },
    {
        name : 'Phoenix',
        offset : -7,
        gmt : '-07:00'
    },
    {
        name : 'Chicago',
        offset : -6,
        gmt : '-06:00'
    },
    {
        name : 'New York',
        offset : -5,
        gmt : '-05:00'
    },
    {
        name : 'Santiago',
        offset : -4,
        gmt : '-04:00'
    },
    {
        name : 'Bermuda',
        offset : -3,
        gmt : '-03:00'
    },
    {
        name : 'Central Atlantic',
        offset : -2,
        gmt : '-02:00'
    },
    {
        name : 'Cape Verde',
        offset : -1,
        gmt : '-01:00'
    },
    {
        name : 'London',
        offset : '0',
        gmt : '+00:00'
    },
    {
        name : 'Paris',
        offset : 1,
        gmt : '+01:00'
    },
    {
        name : 'Cape Town',
        offset : 2,
        gmt : '+02:00'
    },
    {
        name : 'Nairobi',
        offset : 3,
        gmt : '+03:00'
    },
    {
        name : 'Abu Dhabi',
        offset : 4,
        gmt : '+04:00'
    },
    {
        name : 'Kabul',
        offset : 4.5,
        gmt : '+04:30'
    },
    {
        name : 'Islamabad',
        offset : 5,
        gmt : '+05:00'
    },
    {
        name : 'Mumbai',
        offset : 5.5,
        gmt : '+05:30'
    },
    {
        name : 'Dhaka',
        offset : 6,
        gmt : '+06:00'
    },
    {
        name : 'Bangkok',
        offset : 7,
        gmt : '+07:00'
    },
    {
        name : 'Beijing',
        offset : 8,
        gmt : '+08:00'
    },
    {
        name : 'Tokyo',
        offset : 9,
        gmt : '+09:00'
    },
    {
        name : 'Melbourne',
        offset : 10,
        gmt : '+10:00'
    },
    {
        name : 'Solomon',
        offset : 11,
        gmt : '+11:00'
    },
    {
        name : 'South Pole',
        offset : 12,
        gmt : '+12:00'
    },
    {
        name : 'Tonga',
        offset : 13,
        gmt : '+13:00'
    },
    {
        name : 'Apia',
        offset : 14,
        gmt : '+14:00'
    }
];

// but first
let needOptions = {
    timezone : null,
    timeZones : _some_time_zones,
    displayPrint : {
        hour : '#clock-hour',
        minute : '#clock-minute',
        second : '#clock-second', 
        day : '#clock-day',
        date : '#clock-date', 
        month : '#clock-month',
        year : '#clock-year' ,
        city : '#clock-city'  
    },
    actionHand : {
        hour : '#hour-hand',
        minute : '#minute-hand',
        second : '#second-hand'
    }
};

// Now running...
setInterval(function(){
    startClock(needOptions || {});
}, 1000);
// ADDINS

    
/* change timezones with a select */
let _selectCity = document.querySelector('#selectCity');
if (_selectCity) {
    let myDateLoco = -(new Date().getTimezoneOffset()) / 60;
    myDateLoco = Math.floor(myDateLoco);
    for (let i = 0; i < _some_time_zones.length; i++) {
        let _addin1 = ' ';
        if (myDateLoco===_some_time_zones[i].offset) {
            _addin1 = " selected='true' ";
        }
        _selectCity.innerHTML += `
                <optgroup>
                    <option disabled>GMT `+_some_time_zones[i].gmt+`</option>
                    <option `+_addin1+` value='`+_some_time_zones[i].offset+`'>`+_some_time_zones[i].name+`</option>
                </optgroup>
            `;
    }

    _selectCity.addEventListener('change',function(){
        // CHANGES clock timezone  and so City name
        needOptions.timezone = _selectCity.value;
    });
}


// on load
window.addEventListener('load',function () {
    // body...
    if (_selectCity) {
        _selectCity.style.display = 'block';
    }
})


    /* FullScreen */
let toggleFullScreen = function () {
        if (
                (document.fullScreenElement && document.fullScreenElement !== null) ||    
                // alternative standard method
                (!document.mozFullScreen && !document.webkitIsFullScreen)
            ) 
            {               // current working methods
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.documentElement.oRequestFullScreen) {
                document.documentElement.oRequestFullScreen();
            } else if (document.documentElement.msRequestFullScreen) {
                document.documentElement.msRequestFullScreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.oCancelFullScreen) {
                document.oCancelFullScreen();
            } else if (document.msCancelFullScreen) {
                document.msCancelFullScreen();
            }
        }
    };

// Fullscreen handler
let _fullScreenBtn = document.getElementById('fullScreenBtn');
if (_fullScreenBtn) {
    _fullScreenBtn.addEventListener('click',function () {
        toggleFullScreen();
    });
}

/* Dark Mode / Light Mode */
let _htmlTag = document.documentElement;
/*
    using body gave me a bug on my Android, 
    to fix that i used html tag and
    assign the darkmode class to html 

    LIKE =>

        html.calc-darkmode,
        .calc-darkmode body 
        {
            background: #111;
            color: #ff974a;
        }

    ...
*/
let _htmlBody = document.body;
let _toggleDLMode = document.getElementById('darkModeBtn');
if (_toggleDLMode) {
    _toggleDLMode.addEventListener('click',function(){
        _htmlTag.classList.toggle('clock-darkmode');
        if (_htmlTag.classList.contains('clock-darkmode')) {
            // console.log('Dark Mode');
            _toggleDLMode.innerHTML = '<i class="fa fa-moon"></i><span class="w3-hide-small">&nbsp;&nbsp;Dark Mode</span>';
            //document.body.classList.replace('calc-darkmode', 'w3-light-grey');
            if (localStorage) {
                try {
                    localStorage.setItem("clock-dark-mode", "true");
                } catch (error){
                    //console.log('Enable cookies in your browser');
                }
            }
        } else if (_htmlTag.classList.contains('clock-lightmode')) {
            // console.log('Light Mode');
            _toggleDLMode.innerHTML = '<i class="fa fa-sun"></i><span class="w3-hide-small">&nbsp;&nbsp;Light Mode</span>';
            //_htmlTag.classList.replace('w3-light-grey', 'calc-darkmode');
            if (localStorage) {
                try {
                    localStorage.setItem("clock-dark-mode", "false");
                } catch (error){
                    //console.log('Enable cookies in your browser');
                }
            }
        }
    });
} 
/* store Dark Mode value in Local Storage */
window.addEventListener('load', function () {
    if (localStorage && localStorage.getItem("clock-dark-mode") === "true") {    
        if (_toggleDLMode) {
            _toggleDLMode.click();
        }
    }
});

