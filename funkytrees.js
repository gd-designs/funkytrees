gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    let sections = gsap.utils.toArray(".scene");
    let sceneWrapper = document.querySelector(".scene-wrapper");
    let canScroll = true;
    let currentIndex = 0;
    let isThrottled = false;
    let throttledTimeout;

    // Pin the .scene-wrapper
    ScrollTrigger.create({
        trigger: sceneWrapper,
        start: "top top",
        end: () => `+=${sceneWrapper.offsetHeight}`,
        pin: true,
        pinSpacing: false
    });

    // Initialize sections with opacity 0, except for the first one
    gsap.set(sections, {opacity: 0});
    gsap.set(sections[0], {opacity: 1});

    // Store timelines for each scene to easily access them later
    let timelines = [];

    const animateScene = (index) => {
        // Define your timeline for each scene
        let tl = gsap.timeline();

        // Reset the timeline if it already exists
        if (timelines[index]) {
            tl = timelines[index].clear(); // Clear the existing timeline
        } else {
            timelines[index] = tl; // Store the new timeline
        }

        if (index === 0) {
            // Scene 1 animations
            tl.fromTo(".sunrise-wrap-slide-1", { y: '7.5rem', x: '7.5rem' }, { y: -400, x: -200, duration: 1, ease: "power2.out" })
              .fromTo(".sun-glow-slide-1", { scale: 0.5 }, { scale: 1, duration: 0.75, ease: "power2.out" }, 1.25)
              .fromTo(".seed-slide-1", { y: -200 }, { y: 450, duration: 0.75, ease: "power2.out" })
              .to(".seed-slide-1", { opacity: 0, autoAlpha: 0, duration: 0, ease: "none" });
        }
        
                if (index === 1) {
            tl.fromTo(".sunrise-wrap-slide-2, .sunrise-wrap-slide-1",
      					{ y: -400, x: -200 },
      					{ y: -150, x: -700, duration: 8, ease: "power2.out"})
      				.fromTo(".sun-glow-slide-2",
        				{ scale: 1 },
        				{ scale: 0.5, duration: 1, ease: "power2.out" }, 0.5)
              .fromTo(".cloud-5-slide-2",
                { x: "-15rem", y: "9.375rem", opacity: "100%" },
                {
                  x: "100vw",
                  y: "9.375rem",
                  opacity: "100%",
                  duration: 4,
                  ease: "none",
                }, 0)
              .fromTo(
                ".cloud-4-slide-2",
                { x: "-15rem", y: "9.375rem", opacity: "100%" },
                {
                  x: "100vw",
                  y: "9.375rem",
                  opacity: "100%",
                  duration: 5,
                  ease: "none",
                  delay: 1,
                },
               0
              )
              .fromTo(
                ".cloud-3-slide-2",
                { x: "-12rem", y: "8.875rem", opacity: "100%" },
                {
                  x: "100vw",
                  y: "8.875rem",
                  opacity: "100%",
                  duration: 4,
                  ease: "none",
                  delay: 4,
                },
                0
              )
              .fromTo(
                ".cloud-2-slide-2",
                { x: "-8rem", y: "11.4375rem", opacity: "100%" },
                {
                  x: "100vw",
                  y: "11.4375rem",
                  opacity: "100%",
                  duration: 8,
                  ease: "none",
                },
                0
              )
              .fromTo(
                ".cloud-1-slide-2",
                { x: "-25vw", y: "9.375rem", opacity: "100%" },
                {
                  x: "100vw",
                  y: "9.375rem",
                  opacity: "100%",
                  duration: 6,
                  ease: "none",
                  delay: 2,
                },
                0
              )
      				.fromTo( ".sapling-full-slide-2",
        				{ height: "0%", opacity: "100%" },
        				{ height: "100%", opacity: "100%", duration: 8, ease: "power2.out" }, 0);
        }
        
        if (index === 2) {
            tl.fromTo(".sunrise-wrap-slide-2",
    						{ y: -150, x: -700},
    						{ y: 25, x: -900, duration: 1.5, ease: "power2.out" }, 0)
    					.fromTo(".cloud-1-slide-3",
      					{ x: "-15vw", y: "9.375rem", opacity: "100%" },
      					{x: "100vw", y: "9.375rem", opacity: "100%", duration: 6, ease: "none"}, 0)
    					.fromTo(".cloud-3-slide-3",
      					{ x: "-10rem", y: 300, opacity: "100%" },
      					{x: "100vw", y: 300, opacity: "100%", duration: 4, ease: "none", delay: 2}, 0)                
              .fromTo(".stars-wrapper-slide-3",
      					{ y: "10rem", x: "100vw", opacity: "100%" },
                {
                  y: "0rem",
                  x: "0vw",
                  opacity: "100%",
                  duration: 5,
                  ease: "power2.out",
                }, 0)
              .fromTo(
                ".moon-wrap-slide-3",
                { y: "60vh", x: "100vw", opacity: "100%" },
                {
                  y: "5vh",
                  x: "42.5vw",
                  opacity: "100%",
                  duration: 2.5,
                  ease: "power2.out",
                }, 0)
              .call(() => {
                        // Assuming your dotlottie-player element has a class 'tree-grow-lottie-slide-3'
                        const dotLottiePlayer = document.querySelector(".tree-grow-lottie-slide-3");
                        dotLottiePlayer.play(); // Play the dotlottie-player animation
                        });
        	}
          
          if (index === 3) {
          	tl.fromTo(".moon-wrap-slide-4, .moon-wrap-slide-3", {x: '42.5vw', y: '5vh'}, {x: '-15vw', y: '60vh', duration: 1.5, ease: "power2.out" })
            	.fromTo(".stars-wrapper-slide-4, .stars-wrapper-slide-3", {x: '0vw', y: '0rem'}, {x: '-100vw', y: '10rem', duration: 2, ease: "power2.out" }, 0)
            	.fromTo(".side-branches-right-slide-4", {x: '100%'}, {x: '0%', duration: 1, ease: "power2.out" }, 1)
              .fromTo(".side-branches-left-slide-4", {x: '-100%'}, {x: '0%', duration: 1, ease: "power2.out" }, "<")
              .call(() => {
              // Assuming your dotlottie-player element has a class 'tree-grow-lottie-slide-3'
              const dotLottiePlayer = document.querySelector(".tree-grow-lottie-slide-4");
              dotLottiePlayer.play(); // Play the dotlottie-player animation
              })
              .fromTo(".tree-apples-wrap-slide-4", {opacity: 0, autoAlpha: 0}, {opacity: 1, autoAlpha: 1, duration: 0.5, ease: "power2.out", delay: 0.5 })
              .fromTo(".apple-1-slide-4", {scale: 0}, {scale: 1, duration: 0.5, ease: "power2.out"})
              .fromTo(".apple-4-slide-4", {scale: 0}, {scale: 1, duration: 0.5, ease: "power2.out"}, "<")
              .fromTo(".apple-2-slide-4", {scale: 0}, {scale: 1, duration: 0.45, ease: "power2.out"})
              .fromTo(".apple-5-slide-4", {scale: 0}, {scale: 1, duration: 0.35, ease: "power2.out"}, "<")
              .fromTo(".apple-3-slide-4", {scale: 0}, {scale: 1, duration: 0.5, ease: "power2.out"})
              .fromTo(".apple-6-slide-4", {scale: 0}, {scale: 1, duration: 0.5, ease: "power2.out"}, "<");
 
          }


        return tl;
    };

    const goToSection = (index, immediate = false) => {
        if (!canScroll || index < 0 || index >= sections.length) return;
        canScroll = false;

        let previousIndex = currentIndex;
        currentIndex = index;

        let tl = gsap.timeline({
            onComplete: () => {
                canScroll = true; // Re-enable scrolling after the animation
                isThrottled = false; // Reset throttle flag after the animation
            }
        });

        // Fade in the current section
        tl.to(sections[index], {
            opacity: 1,
            duration: immediate ? 0 : 0.8,
            ease: "power2.out",
        });

        // Fade out the previous section
        if (index !== previousIndex) {
            tl.to(sections[previousIndex], {
                opacity: 0,
                duration: immediate ? 0 : 0.8,
                ease: "power2.out",
            }, 0); // Start at the same time as the fade in
        }

        // Scene in-view animation
        tl.add(animateScene(index), 0);
    };

    window.addEventListener('wheel', (e) => {
        if (isThrottled) return;
        isThrottled = true;

        if (e.deltaY > 0 && currentIndex < sections.length - 1) {
            goToSection(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            goToSection(currentIndex - 1);
        }

        throttledTimeout = setTimeout(() => isThrottled = false, 800);
    });

    // Setup ScrollTrigger for each section
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => goToSection(index),
            onLeaveBack: (self) => {
                if (self.progress === 0) {
                    goToSection(index - 1);
                }
            },
            onLeave: () => {
                // Reset the timeline for the current section when leaving
                if (timelines[index]) {
                    timelines[index].progress(0).clear();
                }
            },
            onEnterBack: () => {
                // Restart the animation for the current section when re-entering from the back
                if (timelines[index]) {
                    timelines[index].restart();
                }
            },
        });
    });
});
