window.Webflow ||= [];
window.Webflow.push(() => {
  const slideNumber = document.querySelector(".swiper-slide-num");
  const headings = document.querySelectorAll(".heading");
  const carouselWheel = document.querySelector(".carousel-wheel"); // Select the carousel wheel
  const speed = 800; // Animation speed

  const swiper = new Swiper(".swiper", {
    direction: "vertical",
    loop: false,
    speed: speed,
    mousewheel: true,
    keyboard: { 
      enabled: true, 
    },
    navigation: {
      nextEl: '#scene-1-arrow-next',
      prevEl: '#scene-1-arrow-prev',
    },
  });

  swiper.on("reachEnd", () => {
    setTimeout(() => {
      swiper.params.mousewheel.releaseOnEdges = true;
      swiper.params.touchReleaseOnEdges = true;
    }, speed * 2);
  });

  swiper.on("activeIndexChange", () => {
    let realIndex = swiper.realIndex;
    slideNumber.textContent = realIndex + 1;
    headings.forEach((heading) => heading.classList.remove("is-active"));
    headings[realIndex].classList.add("is-active");

    // Combine rotation and scaling in the transform property
    const rotationDegree = 0 - 90 * realIndex; // Calculate rotation
    const scaleValue = 1.55; // Maintain scale
    carouselWheel.style.transform = `rotate(${rotationDegree}deg) scale(${scaleValue})`; // Apply combined transformations
  });


  // Handle slide transition animations for next slide
  swiper.on("slideNextTransitionStart", () => {
    let tl = gsap.timeline();
    tl.to(".front", { translateY: "100%", duration: speed / 2000 })
      .set(".front", { translateY: "-100%" })
      .to(".front", { translateY: "0%", duration: speed / 2000 });
  });

  // Handle slide transition animations for previous slide
  swiper.on("slidePrevTransitionStart", () => {
    let tl = gsap.timeline();
    tl.to(".front", { translateY: "-100%", duration: speed / 2000 })
      .set(".front", { translateY: "100%" })
      .to(".front", { translateY: "0%", duration: speed / 2000 });
  });
});
