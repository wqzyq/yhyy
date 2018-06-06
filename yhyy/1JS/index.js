/// <reference path="_references.js" />


$(function () {
    $(".mlshowinfo").hide();//页面加载后，class为showinfor的div隐藏,右边DIV框

    function mlsi1(index, obj) {
        $(".mlshowinfo").eq(index).show();
        $(".mlshowinfo").eq(index).css({ "top": 139, "left": obj.left + 127 });
        $(".mlright").eq(index).css({ "color": "#ffffff" });
    };
    function mlsi2(index) {
        $(".mlshowinfo").eq(index).hide();
        $(".mlright").eq(index).css({ "color": "#000" });
    };

    /*控制左边框*/
    $(".mlbody").hover(function () {
        var obj = $(this).offset();//获得当前class的偏移,返回top和left的值.
        var index = $(".mlbody").index($(this));
        mlsi1(index, obj);  /*执行上面的函数*/
        switch (index) {
            case 0:
                $(".mlshowinfo").eq(index).css({ "border": "solid 4px #E77318 ", "color": "#000" });
                $(".mlbody").eq(index).addClass("itembg0");  /*添加背景色*/
                break;
            case 1:
                $(".mlshowinfo").eq(index).css({ "border": "solid 4px #94CE29 ", "color": "#000" });
                $(".mlbody").eq(index).addClass("itembg1");
                break;
            case 2:
                $(".mlshowinfo").eq(index).css({ "border": "solid 4px #FF4A6B ", "color": "#000" });
                $(".mlbody").eq(index).addClass("itembg2");
                break;
            case 3:
                $(".mlshowinfo").eq(index).css({ "border": "solid 4px #637BDE ", "color": "#000" });
                $(".mlbody").eq(index).addClass("itembg3");
                break;
            case 4:
                $(".mlshowinfo").eq(index).css({ "border": "solid 4px #42B5EF ", "color": "#000" });
                $(".mlbody").eq(index).addClass("itembg4");
                break;
            case 5:
                $(".mlshowinfo").eq(index).css({ "border": "solid 4px #FF3173 ", "color": "#000" });
                $(".mlbody").eq(index).addClass("itembg5");
                break;
        }

    }, function () {
        var index = $(".mlbody").index($(this));
        mlsi2(index);/*执行上面的函数*/
        switch (index) {
            case 0:
                $(".mlbody").eq(index).removeClass("itembg0");  /*移除背景色*/
                break;
            case 1:
                $(".mlbody").eq(index).removeClass("itembg1");
                break;
            case 2:
                $(".mlbody").eq(index).removeClass("itembg2");
                break;
            case 3:
                $(".mlbody").eq(index).removeClass("itembg3");
                break;
            case 4:
                $(".mlbody").eq(index).removeClass("itembg4");
                break;
            case 5:
                $(".mlbody").eq(index).removeClass("itembg5");
                break;
        }

    });


    /*控制右边框显示*/
    $(".mlshowinfo").hover(function () {
        var index = $(".mlshowinfo").index($(this));
        $(".mlright").eq(index).css({ "color": "#ffffff" });

        switch (index) {
            case 0:
                $(".mlbody").eq(index).addClass("itembg0");  /*添加背景色*/
                break;
            case 1:
                $(".mlbody").eq(index).addClass("itembg1");
                break;
            case 2:
                $(".mlbody").eq(index).addClass("itembg2");
                break;
            case 3:
                $(".mlbody").eq(index).addClass("itembg3");
                break;
            case 4:
                $(".mlbody").eq(index).addClass("itembg4");
                break;
            case 5:
                $(".mlbody").eq(index).addClass("itembg5");
                break;
        }


        $(this).show();
    }, function () {
        var index = $(".mlshowinfo").index($(this));

        $(".mlright").eq(index).css({ "color": "#000" });
        switch (index) {
            case 0:
                $(".mlbody").eq(index).removeClass("itembg0");  /*移除背景色*/
                break;
            case 1:
                $(".mlbody").eq(index).removeClass("itembg1");
                break;
            case 2:
                $(".mlbody").eq(index).removeClass("itembg2");
                break;
            case 3:
                $(".mlbody").eq(index).removeClass("itembg3");
                break;
            case 4:
                $(".mlbody").eq(index).removeClass("itembg4");
                break;
            case 5:
                $(".mlbody").eq(index).removeClass("itembg5");
                break;
        }
        $(this).hide();
    });



});