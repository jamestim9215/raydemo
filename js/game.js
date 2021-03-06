var GameSorce = 1000;
var GameType = "1";

var _game3 = false;
var _game3sorce = 200;

var sorcelist = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
var sorcelist2 = ["○", "□", "△", "◎", "∞", "7"];
var game2list = [[], [], []];
$("#cash").text(GameSorce);

function getSorce() {
    return GameSorce;
}

function setSorce(num) {
    GameSorce = GameSorce + num;
}

var rand01 = weightedRand({
    100: 35,
    200: 30,
    500: 15,
    1000: 10,
    100000: 6,
    1000000: 4
});

function changeGame(lastType, newType) {
    $(".game-" + lastType).fadeOut(500, function () {
        $(".game-" + newType).fadeIn(500);
    });
}

function reStartGame() {
    $("#mes").text("");
    if (getSorce() == 0) {
        alert("可憐的窮光蛋!!送你1000!!");
        setSorce(1000);
    } else {
        removeGame();
    }
    $("#cash").text(getSorce());

}

function removeGame() {
    switch (GameType) {
        case "1":
            setSorce(-100); $('#promo').remove(); setGame(); break;
        case "2": break;
        case "3": setSorce(-200); setGame3(); break;
    }
}

function weightedRand(spec) {
    var i, j, table = [];
    for (i in spec) {
        for (j = 0; j < spec[i] * 10; j++) {
            table.push(i);
        }
    }
    return function () {
        return table[Math.floor(Math.random() * table.length)];
    }
}

var rand02 = weightedRand({
    "○": 35,
    "□": 30,
    "△": 15,
    "◎": 10,
    "★": 6,
    "7": 4
});





function check() {
    var total = 0;
    for (var i = 0; i < 5; i++) {
        var num = 0;
        if (sorcelist[i][0] == sorcelist[i][1] && sorcelist[i][1] == sorcelist[i][2]) {
            total = total + parseInt(sorcelist[i][0]);
            $(".spanBox").eq(i).last().append('<div class="bingo"></div>');
        }
    }
    if (total == 0) {
        $("#mes").text("哭哭沒中");
    } else {
        $("#mes").text("恭賀老爺!恭喜夫人!!您中了" + total);
        setSorce(total);
    }
}

//GAME 3 
function setGame3() {
    var num = Math.floor((Math.random() * 10) + 1);
    _game3 = true;
    _game3sorce = 200;
    $(".gameSelect").text("?");
    $(".btn-next").fadeOut(5);
    $(".btn-restart").fadeOut(5, function () {
        $(".btn-box").fadeIn(250);
        $(".game3-cover").fadeIn(5);
    });
    $("#game2-val").text(_game3sorce);
    $(".num-l").text(num);
}

function checkpoint(type) {
    var _r = parseInt($(".num-r").text());
    var _l = parseInt($(".num-l").text());
    if (type == "b") {
        if (_l > _r) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (_l < _r) {
            console.log("< win");

            return 1;
        } else {
            console.log("< lose");
            return 0;
        }
    }
}

$(".btn-big").on('click', function () {
    $(".gameSelect").text($(this).val());
    $(".btn-box").fadeOut(250, function () {
        num = Math.floor((Math.random() * 10) + 1);
        $(".num-r").text(num);
        $(".game3-cover").fadeOut();
        if (checkpoint("b")) {
            _game3sorce = _game3sorce * 2;
            $(".btn-next").fadeIn();
            $(".btn-restart").fadeIn();
            $("#mes").text('你贏了');
        } else {
            _game3sorce = 0;
            $(".btn-restart").fadeIn();
            $("#mes").text('你輸了');
        }
        $("#game2-val").text(_game3sorce);
        $(".btn-next-box").fadeIn(250);
    });
});

$(".btn-smill").on('click', function () {
    $(".gameSelect").text($(this).val());
    $(".btn-box").fadeOut(250, function () {
        num = Math.floor((Math.random() * 10) + 1);
        $(".num-r").text(num);
        $(".game3-cover").fadeOut();
        if (checkpoint("s")) {
            _game3sorce = _game3sorce * 2;
            $(".btn-next").fadeIn();
            $(".btn-restart").fadeIn();
            $("#mes").text('你贏了');
        } else {
            _game3sorce = 0;
            $(".btn-restart").fadeIn();
            $("#mes").text('你輸了');
        }
        $("#game2-val").text(_game3sorce);
        $(".btn-next-box").fadeIn(250);
    });
});

$(".btn-next").on('click', function () {
    var num = Math.floor((Math.random() * 10) + 1);
    _game3 = true;
    $(".gameSelect").text("?");
    $("#mes").text('');
    $(".btn-next").fadeOut(5);
    $(".btn-restart").fadeOut(5, function () {
        $(".btn-box").fadeIn(250);
        $(".game3-cover").fadeIn(5);
    });
    $(".num-l").text(num);
});

$(".btn-restart").on('click', function () {
    _game3sorce = _game3sorce / 2;
    setSorce(_game3sorce);
    if (_game3sorce > 0) {
        $("#mes").text('你贏了' + _game3sorce);
    }
    $("#cash").text(getSorce());
    $(".btn-next").fadeOut();
    $(".btn-restart").fadeOut();
    $(".gameSelect").text("?");
    $(".game3-cover").fadeIn(5); $(".num-l").text("?");
    _game3sorce = 0;
    $("#game2-val").text(_game3sorce);
});

function setGame() {
    var num = Math.floor((Math.random() * 10) + 1);
    $(".gamePaper").last().append(
        '<div id="promo" class="scratchpad">' +
        '<div class="code"></div>' +
        '</div>'
    );

    $('#promo').wScratchPad({
        size: 30,
        bg: './images/bg.png',
        realtime: true,
        fg: './images/cover/' + num + '.jpg',
        'cursor': 'url("images/coin.png") 5 5, default',
        scratchMove: function (e, percent) {
            if (percent > 70 && percent < 100) {
                this.clear();
                check();
            }
            $("#cash").text(getSorce());
        },
        scratchDown: function () {
            $(".spanBox").fadeIn(50);
        }
    });

    for (var i = 0; i < 5; i++) {
        var list = i + 1;
        $(".code").last().append('<div class="spanBox"><i style="font-size:0.8rem;">' + list + '</i><span>' + rand01() + '</span><span>' + rand01() + '</span><span>' + rand01() + '</span></div>');
    }

    $(".spanBox").each(function (e) {
        $(this).find("span").each(function (i) {
            sorcelist[e][i] = $(this).text();
        });
    });
}

$(".reStartGame").on('click', function () {
    reStartGame();
});

$("#game-select").on('change', function () {
    var value = $(this).val();
    switch (value) {
        case "1": changeGame(GameType, value); GameType = value; break;
        case "2": changeGame(GameType, value); GameType = value; break;
        case "3": changeGame(GameType, value); GameType = value; break;
        default: alert("尚未開放!!"); break;
    }

});

function initial() {
    $(".game-1").fadeIn();
    $(".game-2").fadeOut();
    $(".game-3").fadeOut();
}

initial();


// game2

$(".game2btn").on('click', function () {
    $(".game2btn").addClass("game2btn-active");
    $(".game2btn2").addClass("game2btn2-active");
    $(".pushBtn").removeClass("btn-secondary");
    $(".pushBtn").addClass("btn-info");
    $(".pushBtn").attr("disabled", false);
    game2list = [[], [], []];
    $(".num1 ul").children().remove();
    $(".num2 ul").children().remove();
    $(".num3 ul").children().remove();
    game2init();
    setTimeout(function () {
        $(".game2btn").removeClass("game2btn-active");
        $(".game2btn2").removeClass("game2btn2-active");
    }, 800);
});

$(".pushBtn").on('click', function () {
    $(this).removeClass("btn-info");
    $(this).addClass("btn-secondary");
    $(this).attr("disabled", true);
});

var _index = [0, 0, 0];
var gameTimeOut1;
var gameTimeOut2;
var gameTimeOut3;

function read_index(index) {
    // var v = index - 1;
    return _index[index];
}

function seticon(index) {
    var v = index + 1;
    $(".num" + v + " ul").children().remove();
    if (read_index(index) <= 7) {
        $(".num" + v + " ul").last().append('<li>' + game2list[index][read_index(index)] + '</li><li>' + game2list[index][read_index(index)+1] + '</li><li>' + game2list[index][read_index(index)+2] + '</li>');
    }else if (read_index(index) == 8) {
        $(".num" + v + " ul").last().append('<li>' + game2list[index][read_index(index)] + '</li><li>' + game2list[index][read_index(index)+1] + '</li><li>' + game2list[index][read_index(index)-8] + '</li>');
    }else if (read_index(index) == 9) {
        $(".num" + v + " ul").last().append('<li>' + game2list[index][read_index(index)] + '</li><li>' + game2list[index][read_index(index)-8] + '</li><li>' + game2list[index][read_index(index)-7] + '</li>');
    }
    $(".num" + v + " ul").animate({ top: '100%' });
    if (_index[index] < 9) {
        _index[index]++;
    } else {
        _index[index] = 0;
    }
    stopGame2(v);
    startGame2(v);
}

function startGame2(index) {
    if (index == 1) gameTimeOut1 = setTimeout(function () {
        seticon(0);
    }, 1000);
    if (index == 2) gameTimeOut2 = setTimeout(function () {
        seticon(1);
    }, 1000);
    if (index == 3) gameTimeOut3 = setTimeout(function () {
        seticon(2);
    }, 1000);
}

function stopGame2(index) {
    if (index == 1) clearTimeout(gameTimeOut1);
    if (index == 2) clearTimeout(gameTimeOut2);
    if (index == 3) clearTimeout(gameTimeOut3);
}



function game2init() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 10; j++) {
            game2list[i][j] = rand02();
            // $(".num"+(i+1)+" ul").last().append('<li>'+game2list[i][j]+'</li>');
        }
    }
    startGame2(1);
    console.log(game2list);


    // $(".num1 ul").last().append(v);

}