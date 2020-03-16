$(document).ready(function () {
    // 每个单词首字母都大写
    function titleCase(str) {
        var newStr = str.split(' ');
        for (var i = 0; i < newStr.length; i++) {
            newStr[i] = newStr[i].slice(0, 1).toUpperCase() + newStr[i].slice(1).toLowerCase();
        }
        return newStr.join(' ');
    }

    console.log(titleCase('123 asd'));

    // 绝对温度换算
    function toCel(n) {
        return n - 273.15;
    }
    var arr = [];
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude.toFixed(2);
        var lon = position.coords.longitude.toFixed(2);
        arr.push(lat, lon);
        locationCode()
    });

    function locationCode() {
        console.log(arr);
        var lat = arr[0];
        var lon = arr[1];

        var apiKey = '0ab1cd22e4c10d85a9c380f889155e6b';
        var data = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        //这里填申请好的api key
        console.log(data);
        $.ajax({
            type: "GET",
            url: data,
            dataType: "jsonp",
            jsonpCallback: "success_jsonpCallback",
            success: function (data) {
                // 想干嘛就干嘛
                var area = JSON.parse(JSON.stringify(data.name + ', ' + data.sys.country + '   '));
                var update = JSON.parse(JSON.stringify('<span class="xiao">' + '更新于：' + new Date(data.dt * 1000).toLocaleString() + '</span>'));
                var time = JSON.parse(JSON.stringify('日出时间：' + new Date(data.sys.sunrise * 1000).toLocaleString() + '，日落时间：' + new Date(data.sys.sunset * 1000).toLocaleString() + '，风速：' + data.wind.speed + 'm/s，方向：' + data.wind.deg));
                var temp = JSON.parse(JSON.stringify('当前温度：' + toCel(data.main.temp).toFixed(2) + '℃，体感温度：' + toCel(data.main.feels_like).toFixed(2) + '℃，最低温度：' + toCel(data.main.temp_min).toFixed(2) + '℃，最高温度：' + toCel(data.main.temp_max).toFixed(2) + '℃，气压：' + data.main.pressure + 'hpa，湿度：' + data.main.humidity + '%'));
                var weather = JSON.parse(JSON.stringify('气候：' + data.weather[0].main + '，描述：' + titleCase(data.weather[0].description)));
                console.log(data.weather[0].main);
                var coord = JSON.parse(JSON.stringify('经度：' + data.coord.lon.toFixed(2) + '°，纬度：' + data.coord.lat.toFixed(2) + '°'));
                // // console.log(area);
                $('#area').text(area);
                $('#area').append(update);
                $('#time').text(time);
                $('#temp').text(temp);
                $('#weather').text(weather);
                $('#coord').text(coord);
            }
        })
    }
});