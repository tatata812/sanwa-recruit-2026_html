$(function () {

  /* =================================
  ヘッダー
   ================================= */
$(function () {
  const $body = $("body");
  const $menuButton = $(".header__menu-btn");
  const $closeButton = $(".header-menu__close");
  const $menu = $(".header-menu");
  const $menuLinks = $(".header-menu__link, .header-menu__button");

  const openMenu = function () {
    $menu.addClass("is-open").attr("aria-hidden", "false");
    $menuButton.attr("aria-expanded", "true");
    $body.addClass("is-menu-open");
  };

  const closeMenu = function () {
    $menu.removeClass("is-open").attr("aria-hidden", "true");
    $menuButton.attr("aria-expanded", "false");
    $body.removeClass("is-menu-open");
  };

  $menuButton.on("click", function () {
    openMenu();
  });

  $closeButton.on("click", function () {
    closeMenu();
  });

  $menuLinks.on("click", function () {
    closeMenu();
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});

  /* =================================
  ページ内リンク　ヘッダーの高さ考慮
 ================================= */
  var $header = $('.header');

  function getHeaderH() {
    if (!$header.length) return 0;
    return $header.outerHeight() || 0;
  }

  function scrollToHash(hash, speed) {
    if (!hash || hash === '#') return;

    var $target = $(hash);
    if (!$target.length) return;

    var targetTop = $target.offset().top - getHeaderH();

    $('html, body').stop().animate({
        scrollTop: targetTop
      },
      typeof speed === 'number' ? speed : 400
    );
  }

  $(document).on('click', 'a[href^="#"]', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    if (!$(href).length) return;

    e.preventDefault();

    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = href;
    }

    scrollToHash(href, 400);
  });

  $(window).on('load', function () {
    if (location.hash) {
      scrollToHash(location.hash, 0);
    }
  });


  /* =================================
  アニメーション　フェードイン
 ================================= */
  $(window).scroll(function () {
    const windowHeight = $(window).height(); //ウィンドウの高さ
    const scroll = $(window).scrollTop(); //スクロール量

    $(".fade-in-js").each(function () {
      const targetPosition = $(this).offset().top; //要素の上からの距離
      if (scroll > targetPosition - windowHeight + 100) {
        $(this).addClass("action");
      }
    });
  });


})