gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

document.addEventListener("DOMContentLoaded", () => {
  gsap.set(".tree-grown-slide-3", { autoAlpha: 0 });

  // First Lottie Animation
  var animation = lottie.loadAnimation({
    container: document.getElementById("lottie-container"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets-global.website-files.com/65fb5cd2dafe7cc2a4e1bd43/65fcbfc7dc71ffc8194a453d_Frame%20%20(1)%20(1).json",
  });

  window.playAnimation = function () {
    animation.removeEventListener("complete", onCompleteAnimation);
    function onCompleteAnimation() {
      console.log("Lottie animation completed");
    }
    animation.addEventListener("complete", onCompleteAnimation);

    let animationDuration = 3.48;
    let showBeforeEnd = 0.25;
    let delayTime = animationDuration - showBeforeEnd;

    gsap.delayedCall(delayTime, function () {
      gsap.to(".tree-grown-slide-3", { autoAlpha: 1, duration: 0 });
    });

    animation.play();
  };

  window.pauseAnimation = function () {
    animation.pause();
  };

  window.stopAnimation = function () {
    animation.stop();
  };

  var treeGrowBig = lottie.loadAnimation({
    container: document.getElementById("lottie-container-2"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets-global.website-files.com/65e2ff11683fe19430c281d5/66003829ceef8676659d330e_Frame%2013%20(2).json",
  });

  window.playTreeBig = function () {
    treeGrowBig.play();
  };

  window.pauseTreeBig = function () {
    treeGrowBig.pause();
  };

  window.stopTreeBig = function () {
    treeGrowBig.stop();
  };

  const slides = document.getElementsByClassName("swiper-slide");
  const slidesLength = slides.length;

  let timelines = [];

  if (slidesLength > 1) {
    var MySwiper = new Swiper(".swiper-container", {
      speed: 1200,
      direction: "vertical",
      effect: "fade",
      keyboard: true,
      mousewheel: { releaseOnEdges: false },
      followFinger: false,
      touchReleaseOnEdges: true,
      longSwipes: false,
      parallax: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className}"><span class='s-label'>text</span></span>`;
        },
      },
      on: {
        init: () => {
          initAnimations();
        },
        slideChange: (swiper) => {
          const { offsetTop } = swiper.el;
          if (window.pageYOffset !== offsetTop) {
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
          let direction =
            swiper.activeIndex > swiper.previousIndex ? "forward" : "backward";
          if (direction === "forward") {
            timelines[swiper.activeIndex]?.play();
          }
        },
        slideChangeTransitionEnd: (swiper) => {
          const activeIndex = swiper.activeIndex;
          swiper.params.mousewheel.releaseOnEdges =
            activeIndex === 0 || activeIndex === slidesLength - 1;
        },
      },
    });
    MySwiper.init();
  }

  function initAnimations() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 768) {
      // Mobile viewport animations
      timelines[0] = animateSlide0Mobile();
      timelines[1] = animateSlide1Mobile();
      timelines[2] = animateSlide2Mobile(); // Mobile animation for Slide 2
      timelines[3] = animateSlide3Mobile(); // Mobile animation for Slide 3
    } else {
      // Desktop viewport animations
      timelines[0] = animateSlide0();
      timelines[1] = animateSlide1();
      timelines[2] = animateSlide2(); // Desktop animation for Slide 2
      timelines[3] = animateSlide3(); // Desktop animation for Slide 3
    }

    // Play the timeline for the first slide (slide 0) on page load
    timelines[0].play();
  }

  // Desktop-specific animations
  function animateSlide0() {
    // Define the GSAP timeline for slide 0
    const tl = gsap.timeline({ paused: true });
    // Define animations for slide 0
    tl.fromTo(
      ".sunrise-wrap-slide-1",
      { x: "100vw", y: "100vh" },
      { x: "10vw", y: "10vh", duration: 1, ease: "power2.out" },
      0.5
    )
      .fromTo(
        ".sun-glow-slide-1",
        { scale: 0.5 },
        { scale: 1, duration: 1, ease: "power2.out" }
      )
      .fromTo(
        ".land-behind-slide-1",
        { scale: 0, y: "20vh" },
        { scale: 2, y: "0vh", duration: 1, ease: "power2.out" },
        0.25
      )
      .fromTo(
        ".wheel",
        { y: "40vh" },
        { y: "0vh", duration: 1, ease: "power2.out" },
        0
      )
      .fromTo(
        ".grass-1-slide-1, .grass-2-slide-1, .grass-3-slide-1, .grass-4-slide-1",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, ease: "power2.out", stagger: 0.1 }
      )
      .fromTo(
        ".seed-slide-1",
        { y: "-9vh" },
        { y: "75vh", duration: 0.5, ease: "none" }
      )
      .to(".seed", { yPercent: 100, duration: 0.1, ease: "none" })
      .fromTo(
        ".text-container-1-slide-1",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
      );

    new SplitType(".text-1-slide-1", { types: "lines", tagName: "span" });
    tl.fromTo(
      ".text-1-slide-1 .line",
      {
        rotateX: -90,
        opacity: 0,
        transformOrigin: "50% 100%",
      },
      {
        rotateX: 0,
        opacity: 1,
        stagger: 0.05, // Adjust the stagger value as needed
        duration: 0.5, // Adjust the duration as needed
        ease: "power1.out",
      },
      "<"
    );

    return tl;
  }

  // Desktop-specific animations
  function animateSlide1() {
    // Define the GSAP timeline for slide 1
    const tl = gsap.timeline({ paused: true });

    // Define initial animations for slide 1
    tl.fromTo(".wheel.is-2", { x: "0vw" }, { x: "-100vw", duration: 2 })
      .to(".wheel.is-1", { x: "-100vw", duration: 2 }, "<")
      .to(".wheel.is-1", { x: "0vw", duration: 0 })
      .fromTo(
        ".grass-1-slide-1, .grass-2-slide-1, .grass-3-slide-1, .grass-4-slide-1",
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0, ease: "power2.out" },
        0
      )

      .fromTo(
        ".text-container-1-slide-2",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
      ); // No need for a label or position parameter here

    // SplitType animation starts immediately after the previous animation
    new SplitType(".text-1-slide-2", { types: "lines", tagName: "span" });
    tl.fromTo(
      ".text-1-slide-2 .line",
      {
        rotateX: -90,
        opacity: 0,
        transformOrigin: "50% 100%",
      },
      {
        rotateX: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power1.out",
      }
    ); // This will start right after the previous animation

    // Continue with the rest of the animations for slide 1
    tl.fromTo(
      ".sunrise-wrap-slide-2",
      { x: "10vw", y: "10vh" },
      { x: "0vw", y: "42.5vh", duration: 10, ease: "power2.out" },
      0
    )
      .fromTo(
        ".sun-glow-slide-2",
        { scale: 1 },
        { scale: 0.5, duration: 2.5, ease: "power2.in" },
        "<"
      )
      .fromTo(
        ".sunrise-slide-2",
        { color: "#ffe900" },
        { color: "#ff3b2f", duration: 0.5, ease: "none" },
        "<"
      )
      .fromTo(
        ".sun-glow-slide-2",
        { color: "#ffe900" },
        { color: "#ff3b2f", duration: 0.5, ease: "none" },
        "<"
      )
      .fromTo(
        ".sapling-full-slide-2",
        { height: "0%" },
        { height: "100%", duration: 7.5, ease: "power2.out" },
        "<"
      )
      .from(
        ".cloud-1-slide-2, .cloud-2-slide-2, .cloud-4-slide-2, .cloud-5-slide-2, .cloud-6-slide-2, .cloud-3-slide-2",
        { y: "-5vh", duration: 1, ease: "power2.out", stagger: 0.1 },
        6
      );

    return tl;
  }

  // Desktop-specific animations
  function animateSlide2() {
    // Define the GSAP timeline for slide 2
    const tl = gsap.timeline({ paused: true });
    // Define animations for slide 2
    tl.fromTo(".wheel.is-3", { x: "-100vw" }, { x: "-200vw", duration: 2 })
      .to(".wheel.is-2", { x: "-200vw", duration: 2 }, "<")
      .to(".wheel.is-2", { x: "-100vw", duration: 0 })
      .fromTo(
        ".stars-wrapper-slide-3",
        { x: "100vw", y: "10rem" },
        { x: "0vw", y: "0rem", duration: 3, ease: "power2.out" },
        0
      )
      .fromTo(
        ".moon-wrap-slide-3",
        { x: "100vw", y: "60vh" },
        { x: "42.5vw", y: "5vh", duration: 3.5, ease: "power2.out" },
        0
      )
      .call(window.playAnimation);
    return tl;
  }

  function animateSlide3() {
    // Define the GSAP timeline for slide 3
    const tl = gsap.timeline({ paused: true });
    // Define animations for slide 3
    tl.fromTo(".wheel.is-4", { x: "-200vw" }, { x: "-300vw", duration: 2 })
      .to(".wheel.is-3", { x: "-300vw", duration: 2 }, "<")
      .to(".wheel.is-3", { x: "-200vw", duration: 0 })
      .fromTo(
        ".sunrise-wrap-slide-4",
        { y: "100%" },
        { y: "0%", duration: 1, ease: "power2.out" },
        0.5
      )
      .from(
        ".cloud-1-slide-4, .cloud-2-slide-4, .cloud-3-slide-4, .cloud-4-slide-4",
        { y: "0vh", duration: 1, ease: "power2.out", stagger: "0.2" },
        0.6
      )
      .from(
        ".stars-1-slide-4",
        {
          y: "10vh",
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .fromTo(
        ".side-branches-left-slide-4",
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        ".tree-2-slide-4, .tree-3-slide-4, .tree-4-slide-4",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, stagger: 0.2 },
        "<"
      )
      .call(window.playTreeBig);
    return tl;
  }

  // Mobile-specific animations
  function animateSlide0Mobile() {
    const tl = gsap.timeline({ paused: true });
    // Your animation code for slide 2 on mobile here
    return tl;
  }
  // Mobile-specific animations
  function animateSlide1Mobile() {
    const tl = gsap.timeline({ paused: true });
    // Your animation code for slide 2 on mobile here
    return tl;
  }
  // Mobile-specific animations
  function animateSlide2Mobile() {
    const tl = gsap.timeline({ paused: true });
    // Your animation code for slide 2 on mobile here
    return tl;
  }

  function animateSlide3Mobile() {
    const tl = gsap.timeline({ paused: true });
    // Your animation code for slide 3 on mobile here
    return tl;
  }
});

// Your JavaScript code to draw using Rough.js
const svgElement = document.querySelector("svg[rough=name]");
const svgElement2 = document.querySelector("svg[rough=email]");
const roughSvg = rough.svg(svgElement);
const roughSvg2 = rough.svg(svgElement2);

// Draw line
// const line = roughSvg.line(60, 60, 190, 60);
// svgElement.appendChild(line);

// Draw rectangles
svgElement.appendChild(roughSvg.ellipse(275, 37.5, 500, 75));
svgElement2.appendChild(roughSvg.rectangle(0, 0, 500, 75));
