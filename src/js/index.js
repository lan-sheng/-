! function($) {
    $.ajax({
        // type: 'get',
        url: 'http://10.31.157.71/dajiangshangcheng/php/dajiang.php',
        dataType: 'json'
    }).done(function(piclist) {
        let $strhtml = '<ul class="index__section-content___37fiD index__product-list___1ETYA ">';
        $.each(piclist, function(index, value) {
            $strhtml += `<li class="index__section-item___1aGxi">
                                    <a class="style__product-item-link___l0pKC" href="src/html/product.html?sid=${value.sid}">
                                        <div class="style__product-item___3OCqd">
                                            <div class="style__image___3AWks">
                                                <div class="style__cover___19vV4"><img src="${value.picurl}"></div>
                                            </div>
                                            <h4 class="style__title___3zLsG">${value.title}</h4>
                                            <div class="style__price___1O9kz">
                                                <div class="style__money___21LYf"><span><span class="style__price___1uTGo style__normal-price___2djNL">¥${value.price}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>`
        });
        $strhtml += '</ul>';
        $('.dajiang').html($strhtml);
    });
}(jQuery);