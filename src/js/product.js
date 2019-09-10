$(function() {
    //获得文本框对象
    var t = $("#numberInput");
    //数量增加操作
    $(".styles__increase___qCm4_").click(function() {
            t.val(parseInt(t.val()) + 1)
            if (parseInt(t.val()) != 1) {
                $('#min').attr('disabled', false);
            }
            setTotal();
        })
        //数量减少操作
    $(".styles__decrease___DhI3I").click(function() {
            t.val(parseInt(t.val()) - 1);
            if (parseInt(t.val()) == 1) {
                $('#min').attr('disabled', true);
            }
            setTotal();
        })
        //计算操作
    function setTotal() {
        $("#numberInput").html(parseInt(t.val())); //toFixed()是保留小数点的函数很实用哦
    }
    //初始化
    setTotal();
});
! function($) {
    let $sid = location.search.substring(1).split('=')[1];
    $.ajax({

            url: 'http://10.31.157.71/dajiangshangcheng/php/getdata.php',
            data: {
                sid: $sid
            },
            dataType: 'json'
        }).done(function(d) {

            let $smallpic = d.urls.split(',');
            $('.style__slides___BCums img').attr('src',
                d.picurl);
            $('.style__slides___BCums img').attr('sid',
                d.sid);
            $('.style__product-title___2DEfZ').html(
                d.title);
            $('.styles__current-price___C1xbQ').html(
                '￥' + d.price);
            $('.default-link-style ').html(
                d.describe);
            let $htmlstr = '';
            $.each($smallpic, function(index, value) {
                $htmlstr += `<li role="presentation" class="style__paging-item___1pzla"><button><img src="${value}" alt=""></button></li>`
            })
            $('.style__paginations___1HX_4').html($htmlstr);
        })
        //2.加入购物车。
    let sidarr = []; //存放商品的编号数组
    let numarr = []; //存放商品的数量数组

    //2.1取cookie(假设是第二次点击，获取第一次的cookie),提前约定cookie的key值
    //cookie添加， 获取， 删除
    let myobj = {
        addcookie: function(key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        },
        getcookie: function(key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        },
        delcookie: function(key) {
            addcookie(key, '', -1);
        }
    }

    function cookieToArray() {
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            sidarr = myobj.getcookie('cookiesid').split(',')
            numarr = myobj.getcookie('cookienum').split(',')
        }
    }

    $('.styles__button___3x8AT').on('click', function() {
        let $sid = $(this).parents('.product-container').find('.style__slides___BCums').find('.product-img').find('img').attr('sid');
        cookieToArray();
        if ($.inArray($sid, sidarr) !== -1) {
            let changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('#numberInput').val()); //原来的数量+当前的数量。
            numarr[$.inArray($sid, sidarr)] = changenum; //数组值改变
            myobj.addcookie('cookienum', numarr.toString(), 10); //继续添加cookie 
        } else {
            sidarr.push($sid);
            myobj.addcookie('cookiesid', sidarr.toString(), 10);
            numarr.push($('#numberInput').val());
            myobj.addcookie('cookienum', numarr.toString(), 10);
        }
    })
}(jQuery);