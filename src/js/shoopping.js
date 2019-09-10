! function($) {

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



    //获取cookie,进行商品列表的渲染。
    if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
        let csid = myobj.getcookie('cookiesid').split(','); //数组
        let cnum = myobj.getcookie('cookienum').split(',');
        $.each(csid, function(index, value) {
            showgoodslist(csid[index], cnum[index]);
        })
    }


    function showgoodslist(sid, num) { //sid:商品的编号   num：商品的数量。
        $.ajax({
            url: 'http://10.31.157.71/dajiangshangcheng/php/dajiang.php',
            dataType: 'json'
        }).done(function(data) {
            let $strhtml = '';
            $.each(data, function(index, value) {
                if (value.sid == sid) {
                    //对隐藏的元素进行克隆。
                    let $clonebox = $('.style__row___dcJl9:hidden').clone(true, true);
                    $clonebox.find('.Selector__thumbnail-container___2k4QG img').attr('src', value.picurl);
                    $clonebox.find('.ProductInfo__product-name___1LmFn').html(value.title);
                    $clonebox.find('.style__row-price___1g7mC').html(value.price)
                    $clonebox.find('.style__container___11OTp input').val(num);
                    //计算总和：
                    let zmoney = (value.price * num).toFixed(2);
                    $clonebox.find('.style__row-total-price___6Srvw').html(zmoney);
                    $clonebox.css('display', 'block');

                    $('.style__header___3SGl').append($clonebox);

                }
            });
            // calc()

        })
    }


    //如果购物车为空,隐藏empty-cart

    empty();

    function empty() {
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            $('.style__title___1AlcY').html('我的购物车');
        } else {
            $('.style__title___1AlcY').html('购物车为空');
        }
    }


    //总价和总的数量
    function calc() {
        let allprice = 0; //总价
        let allnum = 0; //总的数量。
        // console.log($('.style__row___dcJl9:visible'));

        $('.style__row___dcJl9:visible').each(function(index, element) { //遍历复选框是否选中

            console.log($(element));

            console.log($(element).find('.Selector__container___1PZI-i'))
                // console.log($(element).find('.Selector__container___1PZI-i').find('.style__row-content___2r5Ql').find('.Selector__checkbox-container___3Qw_k').find('input'));

            if ($(element).find('.Selector__container___1PZI-i').find('input').is(':checked')) {
                alert(1)
                allprice += parseInt($(element).find('.style__row-total-price___6Srvw').html());
            }
        });
        $('.semibold Summary__value___1QmHi').html('￥' + allprice);
    }
    calc()
}(jQuery)