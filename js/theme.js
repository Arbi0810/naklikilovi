var InsalesThemeSettings = {"color_background_primary":"#ffffff","color_text_primary":"#262938","color_link_primary":"#e32619","color_link_primary_hover":"#bd241a","color_border_primary":"#d3dee7","color_background_secondary":"#e32619","color_text_secondary":"#ffffff","color_link_secondary":"#ffffff","color_link_secondary_hover":"#ededf2","color_border_secondary":"#d3dee7","body_background_color":"#ffffff","body_background_type":"tile","font_family_primary":"google:Open+Sans","font_size_primary":"14px","logotype_type":"image","logotype_font_family":"google:Open+Sans","logotype_font_size":"40px","phone":"edited_block","email":"from_settings","social_media_hide":"1","promo_slider_auto":"1","promo_slider_auto_time":"4","category_description_position":"after_products","product_not_available":"shown","product_share_hide":"1","product_compare_hide":"1","link_slots_json":"https://205.floks.net/time-delivery.json","slots_hours":"09:00 - 12:00;12:00 - 15:00;15:00 - 18:00;18:00 - 21:00","slots_hour_next":"8","_settings_version":1616758739.689343};
(function () {
    $.fn.equivalent = function (){
        var $blocks = $(this),
            maxH    = $blocks.eq(0).height(); 

        $blocks.each(function(){
            maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
        });
        $blocks.css('min-height', maxH); 
    }
    setTimeout(function(){
    	$('.product-slider').each(function(){
          $(this).find('.product-title').equivalent(); 
        }); 
    },1000);
  if($(window).width() > 1024) {
	var prodSwaps = [];
      $('.product-card').each(function (i) {
        prodSwaps[i] = $(this).parents('.product-card-wrapper').height();
        $(this).hover(function() {
          $(this).height(prodSwaps[i] + $(this).find('.product-cart-control').height() * 1.2);
          $(this).parent().height(prodSwaps[i]);
        }, function () {
          $(this).height('auto').parent().height('auto');
        });
      }); 
    setTimeout(function(){
      $('.product-card').each(function (i) {
        prodSwaps[i] = $(this).parents('.product-card-wrapper').height();
        $(this).hover(function() {
          $(this).height(prodSwaps[i] + $(this).find('.product-cart-control').height() * 1.2);
          $(this).parent().height(prodSwaps[i]);
        }, function () {
          $(this).height('auto').parent().height('auto');
        });
      }); 
    },1500);
  } else {
  	$('.menu_title').on('click', function () {
      	$(this).toggleClass('current').next().toggle();
    });
  }
  $(document).on("click", '#addtocart .ajs-close', function(event) {
    event.preventDefault();
  		$('.alertify .ajs-close').click();
  });
  $('.products_list').on('click', function () {
  	$('#grid').hide();
    $('#list').show();
    $('.grid_list a').removeClass('active');
    $(this).addClass('active');
  });
  $('.products_list').on('click', function () {
  	$('#grid').hide();
    $('#list').show();
    $('.grid_list a').removeClass('active');
    $(this).addClass('active');
  });
  $('.langs>a, .langs>button').on('click', function () {
    $('.langs ul').toggle();
    if($(".langs ul").is(':visible')) {
      $(document).mouseup(function (e){
        var div = $(".langs");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
          div.find('ul').hide();
        }
      });
    }
  });
  
  $('.js-open-sidebar').on('click', function () {
    alertify.panel({
      target: $('[data-modal="mobile-sidebar"]').html(),
      position: 'left',
      onOpen: function (modal) {
        var $sidebarBlocks = $(modal).find('.sidebar-block-content');

        $sidebarBlocks.each(function () {
          var $menu = $(this).find('.mobile-sidebar-menu').first();

          InSalesUI.Menu.create($menu);
        });
        $('.sidebar-close').on('click', function () {
           alertify.closeAll(); 
        });
        $('.langs>a, .langs>button').on('click', function () {
          $('.langs ul').toggle();
          if($(".langs ul").is(':visible')) {
            $(document).mouseup(function (e){
              var div = $(".langs");
              if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.find('ul').hide();
              }
            });
          }
        });        
      }
    });
  });
  $('.js-open-contacts').on('click',function(){
    $('.contacts-top-menu-block').removeClass('hidden');
    $(this).addClass('is-active');
    // console.log('Открывается!');
  });
  $('.sidebar-menu-marker').on('click',function(){
     $(this).toggleClass('is-opened').closest('li').children('ul').toggleClass('open');
  })
  $(document).on('click touchstart',function(elem){
    var contacts_top = $(elem.target).closest('.contacts-top-menu-block').length;
    var js_open_contacts = $(elem.target).closest('.js-open-contacts').length;
    if (!contacts_top && !js_open_contacts){
        $('.contacts-top-menu-block').addClass('hidden');
        $(".js-open-contacts").removeClass('is-active');
          // console.log('Закрывается!');
    }
  });

/**
 * QUICK_VIEW
 */
$(document).ready(function() {
  $(document).on("click", "[data-quick-view]", function(event) {
    event.preventDefault();
    var _id = $(this).data("quick-view");
    Products.get(_id).done(function(product) { 
      console.log('product', product);
      $(".js-quick_view").html(
        templateLodashRender(convertProperties(product), "quick_view")
      );
      $('.quick_view_releated').load(product.url + ' #related_products');
      $('.quick_view_similar').load(product.url + ' #similar_products');
      setTimeout(function(){
        var _productSliderOptions ={
          slidesPerView: 3,
          spaceBetween: 16,
          breakpoints: {
            380: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2,
            },
          }
        };

        var SimillarSwiper =  new Swiper ('[data-slider="similar-products"]', _productSliderOptions);
        var RelatedSwiper = new Swiper ('[data-slider="related-products"]', _productSliderOptions);
        $('.js-quick_view a[data-quick-view]').hide();
        $('.product-card').each(function (i) {
          prodSwaps[i] = $(this).parents('.product-card-wrapper').height();
          $(this).hover(function() {
            $(this).height(prodSwaps[i] + $(this).find('.product-cart-control').height() * 0.5);
            $(this).parent().height(prodSwaps[i]);
          }, function () {
            $(this).height('auto').parent().height('auto');
          });
        });        
      },1500);
      
      Products.initInstance($(".js-quick_view [data-product-id]"));
  var _galleryThumbs = {
    slidesPerView: 6,
    spaceBetween: 16,
    autoHeight: true,
    lazyLoading: true,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      }
    }
  };
  if ($('.quick_view [data-slider="gallery-thumbs"]').length ){
    var MainSwiper =  new Swiper ('.quick_view [data-slider="gallery-thumbs"]', _galleryThumbs);
  }
  EventBus.subscribe('update_variant:insales:product', function (variant) {
    if (!variant.first_image.from_variant) {
      return;
    }
    if (variant.action.quantityState.change) {
      return
    }

    var currentSlideNumber = $('[data-slider="gallery-thumbs-mobile"]')
      .find('[href="' + variant.first_image.original_url + '"]')
      .attr('data-slide-number');

    var currentSlide = $('[data-slider="gallery-thumbs"]')
      .find('[data-image-large="' + variant.first_image.large_url + '"]');
    if (MainSwiper) {
      MainSwiper.slideTo(currentSlideNumber -1 );
    }
    copySrc(currentSlide);

  });
      
      $.fancybox.open({
        src: "#quick-view", // Source of the content
        type: "inline"
      });

    });
  });
  $(document).on("click", "[data-choose-options]", function(event) {
    event.preventDefault();
    var _id = $(this).data("choose-options");
    Products.get(_id).done(function(product) { 
      $(".js-quickshop").html(
        templateLodashRender(convertProperties(product), "quickshop")
      );

      Products.initInstance($(".js-quickshop [data-product-id]"));
      
      $.fancybox.open({
        src: "#quickshop", // Source of the content
        type: "inline"
      });
    });
  });
/**
 * RECENTLYVIEW
 */  
  var $recently_view = $(".js-recently_view");
  if ($recently_view.length > 0) {
    var myRecentlyView = new RecentlyView({
      success: function(_products) {
        if (_.size(_products) > 0) {
          var _templateRecentlyView = _.template(
            $('[data-template-id="recently_view"]').html()
          );
          $recently_view.html(_templateRecentlyView({ products: _products }));
              var _spOptions = {
                slidesPerView: 6,
                spaceBetween: 20,
                breakpoints: {
                  380: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  }
                }
              };

              $('[data-slider="recently"]').each(function () {
                new Swiper (this, _spOptions);
              });
          // Инициализация data-product-id
          Products.getList(_.map(_products, "id"));
        }
      }
    });
  }
});
  
var convertProperties = function(_product) {
  _product.parameters = {};
  _product.sale = null;

  // Пермалинк параметра: массив характеристик
  $.each(_product.properties, function(index, property) {
    $.each(_product.characteristics, function(index, characteristic) {
      if (property.id === characteristic.property_id) {
        setParam(_product.parameters, property.permalink, property);
        setParam(
          _product.parameters[property.permalink],
          "characteristics",
          []
        );

        var uniq = true;
        $.each(
          _product.parameters[property.permalink].characteristics,
          function(index, cha) {
            if (cha.id == characteristic.id) {
              uniq = false;
            }
          }
        );
        if (uniq) {
          _product.parameters[property.permalink].characteristics.push(
            characteristic
          );
        }
      }
    });
  });

  // Скидка в процентах
  if (_product.variants) {
    $.each(_product.variants, function(index, variant) {
      if (variant.old_price) {
        var _merge = Math.round(
          ((parseInt(variant.old_price) - parseInt(variant.price)) /
            parseInt(variant.old_price)) *
            100,
          0
        );
        if (_merge < 100) {
          _product.sale = _merge;
        }
      }
    });
  }

  function setParam(obj, name, value) {
    obj[name] || (obj[name] = value);
  }

  return _product;
};
function templateLodashRender(content, templateId) {
  var templateContent = $('[data-template-id="' + templateId + '"]').html();
  var renderContent = _.template(templateContent);

  return renderContent(content);
}
  
  
  var toggleForms = function(button, form){
    button.on('click', function(){
      form.toggle();

      if (form.is(":hidden")){
        button.addClass('is-unchecked');
        button.removeClass('is-checked');
        $('.js-comments-toggle-notice').hide()
      }
      else{
        button.addClass('is-checked');
        button.removeClass('is-unchecked');
      }
      var form_clear =  InSalesUI.Form.get(form);
      form_clear.clear();
    });
  };

  toggleForms($('.js-comments-toggle'),$('#comment_form'));
  toggleForms($('.js-reviews-toggle'),$('#review_form'));

  $('.js-open-search-panel').on('click', function (elem) {
    alertify.panel({
      target: $('[data-modal="search-form"]').html(),
      position: 'top', hideAfter: false
    });
  });

  if (window.innerWidth  <= 768){
    if ($('.hidden-breadcrumbs').hasClass("js-hidden-bread")){

      $('.breadcrumb-item').each(function(index){
        if ((index > 2) && (index != $(".breadcrumb-item").size() - 1))
        {
          $(this).addClass("hidden");
          // console.log($(this).text());
        }
      })
      $('.js-hidden-bread').click(function(){
        $('.breadcrumb-item').removeClass("hidden");
        $('.js-hidden-bread').parent().addClass("hidden");
      })
    }
  }
        $('.js-close').click(function(e){
            e.preventDefault();
            $('.ajs-close').click();
        });  
})();
$(window).on('resize',function(){
    	$('.product-slider').each(function(){
          $(this).find('.product-title').equivalent(); 
        }); 
});
(function () {
  if (Site.template != 'index') {
    return;
  }

  var _options = {
    autoHeight: true,
    loop: true,
    pagination: true,
  };

  if (_.get(InsalesThemeSettings, 'promo_slider_auto')) {
    _options.autoplay = _.get(InsalesThemeSettings, 'promo_slider_auto_time', 5) * 1000;
  }

  $('[data-slider="promo"]').each(function () {
    new Swiper (this, _options);
  })
})();

(function () {
  if (Site.template != 'index') {
    return;
  }

  var _spOptions = {
    slidesPerView: 5,
    spaceBetween: 16,
    breakpoints: {
      380: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      }
    }
  };

  $('[data-slider="special-products"]').each(function () {
    new Swiper (this, _spOptions);
  });
})();

(function () {
  if (Site.template != 'index') {
    return;
  }

  var _blogOptions = {
    slidesPerView: 4,
    spaceBetween: 16,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  };

  $('[data-slider="blogs"]').each(function () {
    new Swiper (this, _blogOptions);
  });
})();

(function(){
  $(window).scroll(function(){
    if (( window.pageYOffset > 250)&&(window.innerWidth  <= 768)){
      $('.js-top-panel-fixed').addClass("fixed");
      $('.top-panel-wrapper').addClass("z-index");
    }
    else{
      $('.js-top-panel-fixed').removeClass("fixed");
      $('top-panel-wrapper').removeClass("z-index");
    }
  });

  $('.js-arrow-up').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
  });




})();

(function(){

  if (Site.template != 'index') {
    return;
  }

  $(document).on('submit','.js-widget-feedback', function(event) {
    var $widgetFeedback = $(this);
    var msg = $widgetFeedback.serializeObject();
    var val_send;
    var max_send =  $(this).attr('data-max-send');

    event.preventDefault();
    sessionStorage.getItem('send_success') ? val_send  = sessionStorage.getItem('send_success') : val_send = 0;

    if (max_send <= val_send) {
      maxSendError();
      $(this).find('.button-widget-feedback').attr('disabled','disabled').addClass('is-secondary');
      return false;
    }
    Shop.sendMessage(msg)
    .done(function (response) {
      alertify.success(response.notice);
      $widgetFeedback.trigger('reset');
      val_send++;
      sessionStorage.setItem('send_success', val_send);
    })
    .fail(function (response) {
      $.each(response.errors, function (i, val) {
        alertify.error(val[0]);
      });
    });
  })

}())
;

function copySrc(self) {

  var src = $(self).attr('data-image-large');
  var href = $(self).attr('href');
  var title = $(self).attr('title');
  var count = $(self).attr('data-gallery-count');

  $(self).parent()
    .siblings()
      .find('a')
      .removeClass('is-checked');
  $(self).addClass('is-checked');

  $('.gallery').attr({
    'href': href,
    'title': title,
    'data-gallery-count': count
  })
  .find('img')
    .attr({
      'src': src,
      'alt': title
    });
};




(function () {
  if (Site.template !== 'product') {
    return;
  }

  var _galleryThumbs = {
    slidesPerView: 8,
    spaceBetween: 16,
    autoHeight: true,
    lazyLoading: true,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      }
    }
  };

  var _productSliderOptions ={
    slidesPerView: 4,
    spaceBetween: 16,
    breakpoints: {
      380: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  };

  var SimillarSwiper =  new Swiper ('[data-slider="similar-products"]', _productSliderOptions);
  var RelatedSwiper = new Swiper ('[data-slider="related-products"]', _productSliderOptions);
  var BundleSwiper = new Swiper ('[data-slider="bundle-products"]', _productSliderOptions);

  if ($('[data-slider="gallery-thumbs"]').length ){
    var MainSwiper =  new Swiper ('[data-slider="gallery-thumbs"]', _galleryThumbs);
  }

  var MobileSwiper = new Swiper ('[data-slider="gallery-thumbs-mobile"]', _galleryThumbs);

  EventBus.subscribe('update_variant:insales:product', function (variant) {
    if (!variant.first_image.from_variant) {
      return;
    }

    if (variant.action.quantityState.change) {
      return
    }
    var currentSlideNumber = $('[data-slider="gallery-thumbs-mobile"]')
      .find('[href="' + variant.first_image.original_url + '"]')
      .attr('data-slide-number');

    var currentSlide = $('[data-slider="gallery-thumbs"]')
      .find('[href="' + variant.first_image.original_url + '"]');

    MobileSwiper.slideTo(currentSlideNumber -1 );

    if (MainSwiper) {
      MainSwiper.slideTo(currentSlideNumber -1 );
    }
    copySrc(currentSlide);

  });
})();

// Copy src select image in main-image
(function () {

  $(document).on('click', '.js-copy-src', function (event) {

    event.preventDefault();
    copySrc(this);
    var product_id = $(this).closest('.row').find('.product-control').attr('data-compare');
    var select_variant;
    var href = $(this).attr('href');

    Products.get(product_id)
      .done(function (product) {
        select_variant = _.find(product.variants, function (variant) {
          return (href == variant.first_image.original_url);
        });

        if (!select_variant) {
          return
        }
        Products.getInstance($('.product-form'))
          .done(function(_product) {
            return _product.variants.setVariant(select_variant.id);
          });
      });
  });

  // Find main-image in fancybox gallery, and emulate click on fancybox
  $(document).on('click', '.gallery', function (event) {
    event.preventDefault();

    var count = $('.gallery').attr('data-gallery-count');
    $('.mobile-wrapper').find('[data-slide-number="' + count + '"]').trigger('click');

    return false;
  });
})();

EventBus.subscribe('update_variant:insales:product', function (variant) {
  if (!variant.action.product.is('[data-main-form]')) {
    return;
  }

  var $product = variant.action.product;
  var $buttonBuy = $('.js-variant-shown');
  var $buttonHidden = $('.js-variant-hidden');
  var $quickCheckout = $product.find('[data-quick-checkout]');
  var $buttonPreorder = $('.js-variant-preorder');
  var $priceCurrent = $product.find('.js-product-price');
  var $priceOld = $product.find('.js-product-old-price');
  var $skuWrapper = $product.find('.js-product-sku-wrapper');
  var $sku = $product.find('.js-product-sku');
  var $quantity = $product.find('.js-variant-counter');

  var notAvailable = InsalesThemeSettings.product_not_available;

  window.__savedVariant = variant;
  $buttonBuy.hide();
  $quantity.hide();
  $buttonHidden.hide();
  $buttonPreorder.hide();
  $quickCheckout
    .hide()
    .prop('disabled', true);

  $priceCurrent
    .html(Shop.money.format(variant.action.price));
  $priceOld
    .html(Shop.money.format((variant.old_price > variant.price) ? variant.old_price : null));

  if (variant.sku) {
    $skuWrapper.show();
    $sku.text(variant.sku);
  } else {
    $skuWrapper.hide();
  }

  if (variant.available) {
    $buttonBuy.show();
    $quantity.show();
    $quickCheckout
      .show()
      .prop('disabled', false);
  } else {
    switch (notAvailable) {
      case 'preorder':
        $buttonPreorder.show();
        $quickCheckout.hide();
        break;
      case 'hidden':
        $buttonHidden.show();
        $quickCheckout.hide();
        $quantity.hide();
        break;
      case 'shown':
        $buttonBuy.show();
        $quantity.show();
        $quickCheckout
          .show()
          .prop('disabled', false);
        break;
    }
  }
});

(function(){
  $(document).on('click', '.js-variant-preorder', function (event) {
    event.preventDefault();

    var _variant = window.__savedVariant;
    var preorderForm = {
      fields: [
        {
          title: Site.messages.field_email,
          name: 'from',
          required: true,
        },
        {
          title: Site.messages.field_name,
          name: 'name',
          required: true,
        },
        {
          type: 'hidden',
          name: 'preorder_caption',
          value: Site.messages.preorder
        },
        {
          type: 'hidden',
          name: 'subject',
          value: Site.messages.preorder
        },
        {
          title: Site.messages.label_product,
          name: 'product',
          type: 'hidden',
          value: _variant.action.productJSON.title,
        },
        {
          title: 'Вариант',
          name: 'variant',
          type: 'hidden',
          value: _variant.title,
        },
      ],
      combineOrder: {
        content: {
          fields: ['preorder_caption', 'product', 'variant']
        }
      }
    };
    alertify.modal({
      formDefination: preorderForm
    }).set('title', Site.messages.preorder);
  });
}());

EventBus.subscribe('update_variant:insales:product', function (data) {
  var _discountElement = $('[data-labels-id="' + data.action.productJSON.id + '"]').find('.js-label-discount');
  var _discount = null;

  if (!data.action.product.is('[data-main-form]')) {
    return;
  }

  if (data.old_price && data.old_price > data.price) {
    _discount = (data.price * -100)/ data.old_price + 100;
    _discountElement
      .text(_.round(_discount, 0) + '%')
      .removeClass('hidden');
  }
  else {
    _discountElement.addClass('hidden');
  }
})
;
(function () {
  if (Site.template == 'article') {

    new Swiper ('[data-slider="article-related-products"]', {
      slidesPerView: 3,
      spaceBetween: 24,

      breakpoints: {
        380: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 2
        }
      }
    });

};

})();
// Пересчет суммы корзины
$(function(){
  EventBus.subscribe('update_items:insales:cart', function (data) {
    if (Site.template != 'cart') {
      return false;
    }
    //
    // console.log('cart: ', data);
    //  console.log(data.total_price);
    $('.js-shopcart-total-summ').html(Shop.money.format(data.total_price));
  });

  // пересчет актуальной цены за товар и общей стоимости позиции
  EventBus.subscribe('update_variant:insales:item', function (data) {
    if (Site.template != 'cart') {
      return false;
    }

    var $item = data.action.product;
    var $price = $item.find('.js-item-price');
    var $total = $item.find('.js-item-total-price');
    var total = data.action.price * data.action.quantity.current;

    $price.html(Shop.money.format(data.action.price));
    $total.html(Shop.money.format(total));
  });

  // Удаляем позицию
  EventBus.subscribe('delete_items:insales:cart', function (data) {
    if (Site.template != 'cart') {
      return false;
    }

    var $button = data.action.button;
    var $cartItem = $button.parents('.cart-item:first');
    var $emptyMessage = $('.js-cart-empty');
    var $cartForm = $('[data-cart-form]');

    $cartItem
      .slideUp(300, function () {
        $(this).remove();

        if (data.order_lines.length == 0) {
          $cartForm
            .addClass('hidden');
          $emptyMessage
            .removeClass('hidden');
        }
      });
  });

  // Выводим список применившихся скидок
  EventBus.subscribe('update_items:insales:cart', function (data) {
    if (Site.template != 'cart') {
      return false;
    }

    // console.log('>>', data);
    $('.js-discount-comment-list').html(Template.render(data, 'cart-discounts'));
  })

  // widget
  EventBus.subscribe('update_items:insales:cart', function (data) {
    $('.js-shopcart-widget-amount').html(Shop.money.format(data.total_price));
    $('.js-shopcart-widget-count').html(_.round(data.items_count, 3));
  });
});
$(function () {
  var $pass = $('#client_password, #client_password_confirmation');

  $('[name="client[change_password]"]').on('click', function () {
    if (this.checked) {
      $('#change_password_fields').show();
      $pass.prop('disabled', false);
    } else {
      $('#change_password_fields').hide();
      $pass.prop('disabled', true);
    }
  });

  $('#delivery_address .field, #checkout_buyer_fields .field').each(function () {
    var $field = $(this);

    if ($field.find('input[type="checkbox"]').length) {
      $field.addClass('is-checkbox');
    }
  });

  $('.field.is-checkbox').each(function () {
    var $field = $(this);
    $field
      .find('.small')
        .appendTo($field);
  });

  $('.field-content.small').removeClass('small');
});
(function(){
  $(document).on('change', '.filter-field-input', function () {
      $(this).closest('form').submit();
    });
  $('.js-open-filter').on('click', function () {
    alertify.panel({
      target: $('[data-modal="collection-filter"]').html(),
      position: 'left',
      onOpen: function (modal) {
        InSalesUI.Filter.create($(modal));
      }
    });
  });
        var pageType = getUrlVars()["page_size"];
        $('input#page_size_'+pageType).removeAttr('disabled').prev('a').addClass('active');

        $('.page_size a').click(function (e) {
          e.preventDefault();
          $('.page_size input').attr('disabled','disabled');
          $('.page_size a').removeClass('active');
          $(this).addClass('active');
          $(this).next('input').removeAttr('disabled');
          $(this).parents('form').submit();
        });
  
}())
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}
;
EventBus.subscribe('update_items:insales:compares', function (data) {
  $('.js-compares-widget-count').html(data.products.length);
});

EventBus.subscribe('update_items:insales:compares', function (data) {
  var $product = $('.product-form');
  var productId = $product.data('product-id');
  var $compareAdd = $product.find('.js-compare-add');
  var $compareDelete = $product.find('.js-compare-delete');

  var inCompare = _.find(data.products, function(product) {
    return product.id == productId;
  });

  if (inCompare) {
    $compareAdd.hide();
    $compareDelete.show();
  } else {
    $compareAdd.show();
    $compareDelete.hide();
  }
});
EventBus.subscribe('remove_item:insales:compares', function (data) {
  if (Site.template != 'compare') {
    return false;
  }

  $('[data-compared-id="'+ data.action.item +'"]').remove();

  if (data.products.length == 0) {
    $('#js-compare-inner').hide();
    $('.js-compare-empty').removeClass('hidden');
  };
});

$(function () {
  var compareWrapper = '#js-compare-wrapper';
  var compareInner = '#js-compare-inner';
  localforage.setItem('same_row', '0');
  $(document).on('click', '.js-same-toggle', function (event) {
    $(this).find('.link-text')
      .toggleClass('hide')
      .toggleClass('show');
    this.same_row = !this.same_row;
    localforage.setItem('same_row', (this.same_row ? '1' : '0'));
    $('.js-compare-table .same-row')
      .toggle();
  });

  EventBus.subscribe('update_items:insales:compares', function (data) {
    if (Site.template != 'compare') {
      return false;
    }
    if (data.products.length < 1) {
      return false;
    }

    var _now = new Date().getTime();
    var _url = '?' + _now;
    var _getNode = _url + compareWrapper + ' ' + compareInner;

    $(compareWrapper).load(_getNode, function () {

      if ($('.js-compare-table .same-row').length && (data.products.length > 1)){
        $('.compare-toolbar').removeClass('hidden');
        localforage.getItem('same_row')
          .then(function (same_row) {
            console.log('>>', same_row);
            setTimeout(function () {
              if (same_row == '1') {
                $('.js-same-toggle').find('.link-text')
                  .toggleClass('hide')
                  .toggleClass('show');
                $('.js-compare-table .same-row')
                  .hide();
              }
            }, 0)
          })
      }
      else{
        $('.compare-toolbar').addClass('hidden');
      }
    });
  });
});

















