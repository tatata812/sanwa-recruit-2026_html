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

  /* =================================
メインビジュアル　スライダー
 ================================= */
  $(function () {

    const $slider = $(".top-fv-slider-js");

    if (!$slider.length) {
      return;
    }

    const zoomPatterns = [{
        scale: 1.12,
        xPercent: -1.5,
        yPercent: 0
      },
      {
        scale: 1.12,
        xPercent: 1.5,
        yPercent: -1
      },
      {
        scale: 1.14,
        xPercent: 0,
        yPercent: 1
      }
    ];

    function setSlideStart($slide, index) {

      const $image = $slide.find(".top-fv__image");
      const pattern = zoomPatterns[index % zoomPatterns.length];

      gsap.killTweensOf($image);

      gsap.set($image, {
        scale: pattern.scale,
        xPercent: pattern.xPercent,
        yPercent: pattern.yPercent,
        transformOrigin: "center center"
      });

    }

    function animateSlide($slide, index) {

      const $image = $slide.find(".top-fv__image");
      const pattern = zoomPatterns[index % zoomPatterns.length];

      gsap.killTweensOf($image);

      gsap.fromTo(
        $image, {
          scale: pattern.scale,
          xPercent: pattern.xPercent,
          yPercent: pattern.yPercent
        }, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          duration: 7,
          ease: "power1.out",
          overwrite: true
        }
      );

    }

    $slider.on("init", function (event, slick) {

      slick.$slides.each(function (index) {
        setSlideStart($(this), index);
      });

      const $currentSlide = $(slick.$slides[slick.currentSlide]);

      animateSlide($currentSlide, slick.currentSlide);

      gsap.fromTo(
        ".top-fv-copy-js", {
          autoAlpha: 0,
          y: 30,
          filter: "blur(8px)"
        }, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          delay: 0.4,
          ease: "power3.out"
        }
      );

    });

    $slider.on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {

        const $currentSlide = $(slick.$slides[currentSlide]);
        const $nextSlide = $(slick.$slides[nextSlide]);

        const $currentImage = $currentSlide.find(".top-fv__image");

        setSlideStart($nextSlide, nextSlide);

        gsap.to($currentImage, {
          scale: 1.03,
          duration: 1.4,
          ease: "power2.inOut",
          overwrite: true
        });

        animateSlide($nextSlide, nextSlide);

      }
    );

    $slider.slick({
      arrows: false,
      dots: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5200,
      speed: 1400,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      adaptiveHeight: false,
      accessibility: true
    });

  });

  /* =================================
三和を知るスライダー
 ================================= */

  $(".top-about-slider-js").slick({
    arrows: true,
    dots: true,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    centerPadding: "0",

    autoplay: true,
    autoplaySpeed: 4000,

    speed: 800,
    cssEase: "ease",

    pauseOnHover: false,
    pauseOnFocus: false,

    prevArrow: `
    <button class="slick-prev" type="button">
      <img src="assets/img/common/arrow-prev.png" alt="" width="56" height="56">
    </button>
  `,

    nextArrow: `
    <button class="slick-next" type="button">
      <img src="assets/img/common/arrow-next.png" alt="" width="56" height="56">
    </button>
  `,

    responsive: [{
      breakpoint: 821,
      settings: {
        variableWidth: false,
        arrows: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

})
/* =================================
セクション見出し
================================= */

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".section-heading").forEach((heading) => {

  const title = heading.querySelector(".section-heading__title");
  const lineGray = heading.querySelector(".section-heading__line-gray");
  const lineBlue = heading.querySelector(".section-heading__line-blue");
  const lead = heading.querySelector(".section-heading__lead");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heading,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true
    }
  });

  if (title) {
    tl.from(title, {
      y: 30,
      autoAlpha: 0,
      duration: .8,
      ease: "power3.out"
    });
  }

  if (lineGray) {
    tl.from(lineGray, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: .5,
      ease: "power2.out"
    }, "-=.35");
  }

  if (lineBlue) {
    tl.from(lineBlue, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: .7,
      ease: "power3.out"
    }, "-=.2");
  }

  if (lead) {
    tl.from(lead, {
      y: 24,
      autoAlpha: 0,
      duration: .8,
      ease: "power2.out"
    }, "-=.3");
  }

});

/* =================================
求める人材
================================= */

/* =================================
求める人材
================================= */

gsap.utils.toArray(".top-concept__content").forEach((content) => {

  const title = content.querySelector(".top-concept__title");
  const line = content.querySelector(".top-concept__line");
  const keywords = content.querySelectorAll(
    ".top-concept__keywords span"
  );
  const text = content.querySelector(".top-concept__text");

  gsap.set(keywords, {
    x: -30,
    autoAlpha: 0
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: content,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true
    }
  });

  if (title) {
    tl.from(title, {
      y: 30,
      autoAlpha: 0,
      duration: .8,
      ease: "power3.out"
    });
  }

  if (line) {
    tl.from(line, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: .7,
      ease: "power2.out"
    }, "-=.35");
  }

  if (keywords.length) {
    tl.to(keywords, {
      x: 0,
      autoAlpha: 1,
      duration: .8,
      stagger: .18,
      ease: "power3.out"
    }, "-=.2");
  }

  if (text) {
    tl.from(text, {
      y: 24,
      autoAlpha: 0,
      duration: .8,
      ease: "power2.out"
    }, "-=.3");
  }

});

/* =================================
背景色を変更する
================================= */

gsap.utils.toArray("section[data-bg]").forEach((section) => {

  gsap.fromTo(
    section,
    {
      backgroundColor: "#fff"
    },
    {
      backgroundColor: section.dataset.bg,
      duration: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true
      }
    }
  );

});

/* =================================
ScrollTrigger再計算
================================= */

const refreshScrollTrigger = () => {

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);

};

window.addEventListener("load", refreshScrollTrigger);
window.addEventListener("pageshow", refreshScrollTrigger);

/* =================================
ローディング画面
================================= */

const loading = document.querySelector(".loading");
const referrer = document.referrer;
const currentUrl = location.href;

const isInternal =
  referrer &&
  new URL(referrer).origin === location.origin;

const isReload = referrer === currentUrl;

if (loading) {

  if (isInternal && !isReload) {

    loading.remove();
    refreshScrollTrigger();

  } else {

    const loadingImage = loading.querySelector("img");

    if (loadingImage) {
      gsap.from(loadingImage, {
        scale: .9,
        autoAlpha: 0,
        duration: .8,
        ease: "power2.out"
      });
    }

    window.addEventListener("load", () => {

      setTimeout(() => {

        gsap.to(loading, {
          autoAlpha: 0,
          duration: .6,
          ease: "power2.out",
          onComplete: () => {

            loading.remove();
            ScrollTrigger.refresh();

          }
        });

      }, 500);

    });

  }

}