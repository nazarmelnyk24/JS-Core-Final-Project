$(document).ready(function () {

    //Shuffle images START
    let shuffle = $('.box-initial').children().sort(function () {
        return (Math.round(Math.random()) - 0.5);
    });

    $('.box-initial').html(shuffle);
    //Shuffle images END

    //Make images sortable START
    $('.puzzle').sortable({
        connectWith: '.puzzle-right',
        opacity: 0.8,
        receive: function (e, ui) {
            $(e.target).sortable('disable');
            if (!timerRunning) timerStartOneTime();
            $('.start-button').addClass('disabled');
            $('.result-button').removeClass('disabled');
        }
    });
    //Make images sortable END

    //Start timer START
    let timer;
    let timerRunning;
    const timerStart = () => {
        timerRunning = true;
        const now = new Date().getTime() + 60000;
        let timerStartPoint;
        timer = setInterval(() => {
            timerStartPoint = now - new Date().getTime();
            let s = Math.round((timerStartPoint % (1000 * 60)) / 1000);
            let min = Math.floor((timerStartPoint % (1000 * 60 * 60)) / (1000 * 60));
            if (min < 10) min = '0' + min;
            if (min == '0-1') min = '00';
            if (s < 10) s = '0' + s;
            if (s == 60) s = '00';
            if (s == 00) {
                clearInterval(timer);
                setTimeout(() => {
                    $('.lost-modal').removeClass('d-none');
                    $('.lost-modal').addClass('d-block');
                }, 1000);
            }
            $('.timer').html(`${min} : ${s}`);
            $('.timer-modal-window').html(`${min} : ${s}`);
        }, 1000)
    }
    //Start timer END

    //Start timer while dragging first image START
    let executed;
    let timerStartOneTime = (function () {
        executed = false;
        return function () {
            if (!executed) {
                executed = true;
                timerStart();
            }
        };
    })();
    //Start timer while dragging first image END

    //Reset timer START
    const timerReset = () => {
        timerRunning = false;
        executed = false;
        clearInterval(timer);
        $('.timer').text('01 : 00');
        $('.timer-modal-window').text('01 : 00');
    }
    //Reset timer END

    //Start Game button START
    $('.start-button').click(function () {
        timerStart();
        $(this).addClass('disabled');
        $('.result-button').removeClass('disabled');
    });
    //Start Game button END

    //Check Result button START
    $('.result-button').click(function () {
        $('.time-left-modal').removeClass('d-none');
        $('.time-left-modal').addClass('d-block');
    });
    //Check Result button END

    //New Game button START
    $('.new-button, .win-modal .close-button, .lost-modal .close-button').click(function () {
        timerReset();
        $('.puzzle').sortable('cancel');
        $('.puzzle-right').sortable('enable');
        $('.start-button').removeClass('disabled');
        $('.result-button').addClass('disabled');
        let shuffle = $('.box-initial').children().sort(function () {
            return (Math.round(Math.random()) - 0.5);
        });
        $('.box-initial').html(shuffle);
        $('.puzzle').sortable({
            connectWith: '.puzzle-right',
            opacity: 0.8,
            receive: function (e, ui) {
                $(e.target).sortable('disable');
                if (!timerRunning) timerStartOneTime();
                $('.start-button').addClass('disabled');
                $('.result-button').removeClass('disabled');
            }
        });
    })
    //New Game button END

    //"You still have time" window: close button START
    $('.time-left-modal .close-button').click(function () {
        $('.time-left-modal').removeClass('d-block');
        $('.time-left-modal').addClass('d-none');
    });
    //"You still have time" window: close button END

    //"You still have time" window: check button START
    let correct = 0;
     $('.time-left-modal .check-button').click(function () {
        $('.puzzle-right').each(function (i) {
            if ($(this).index() != $(this).children().eq(0).attr('data-pos')) {
                clearInterval(timer);
                $('.time-left-modal').removeClass('d-block');
                $('.time-left-modal').addClass('d-none');
                $('.lost-modal').removeClass('d-none');
                $('.lost-modal').addClass('d-block');
                return false;
            } else {
                correct++;
            }
            if (correct === 16) {
                clearInterval(timer);
                $('.time-left-modal').removeClass('d-block');
                $('.time-left-modal').addClass('d-none');
                $('.win-modal').removeClass('d-none');
                $('.win-modal').addClass('d-block');
            }
        })
    })
    //"You still have time" window: check button END

    //"You won" window START
    $('.win-modal .close-button').click(function () {
        $('.win-modal').removeClass('d-block');
        $('.win-modal').addClass('d-none');
        $('.result-button').addClass('disabled');
    });
    //"You won" window END

    //"You lost" window START
    $('.lost-modal .close-button').click(function () {
        $('.lost-modal').removeClass('d-block');
        $('.lost-modal').addClass('d-none');
        $('.result-button').addClass('disabled');
    });
    //"You lost" window END

});
