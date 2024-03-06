(function(){
  gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, 
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  const commonScrollTriggerConfig = {
    trigger: '.page2',
    scroller : '.main',
    start: '-10% 70%',
    end: 'center 70%',
    scrub: true,
    ease : 'expo.inOut',};

  gsap.timeline()
    .to('.page2-video', { 
        width: '95vw', 
        scrollTrigger: commonScrollTriggerConfig 
    })
    .to('.navigation', { 
        height: '7vh', 
        scrollTrigger: { 
            trigger: '.page2',
            scroller : '.main',
            start: '10% 10%', 
            end: 'center center',
            delay : .5, 
            ease :'expo.out',
            scrub: true, 
    }})

  gsap.utils.toArray(['.page2','.page3']).forEach((pannel)=>{
    ScrollTrigger.create({
        trigger : pannel,
        scroller : '.main',
        start : 'top top',
        end: '+=70%',
        scrub : true,
        pinSpacing : false,
        pin : true,
    })
  })

  const page3custom ={
      trigger : ".page3",
      scroller : '.main',
      start : 'top 80%',
      end : 'top top',
      scrub : true,
      duration : 4,
      ease : 'back.inOut(2)',
  }

  gsap.timeline()
    .to('.navigation',{
    opacity : 0,
    scrollTrigger : page3custom,    
  })
  .to('.page3',{
    backgroundColor : 'white',
    duration : 5,
    scrollTrigger : page3custom,    
    snap : 1/4,
  })



  $('.owl-carousel').owlCarousel({
    autoplay: true,
    center: true,
    loop: true,
    nav: true,
  });




  // page5 animations starts : 
  const contentBars = document.querySelectorAll('.page5-content-bar');

if (contentBars.length === 0) {
  console.error('No elements with class "page5-content-bar" found.');
  return;
}

contentBars.forEach((elem) => {
  let flag = 0;

  // Keep track of the timeline for each contentBar
  const tl = gsap.timeline({ paused: true });

  elem.addEventListener('click', () => {
    const part1 = elem.querySelector('.page5-bar-part1');
    const part2 = elem.querySelector('.page5-bar-part2');

    // Clear any existing animations before starting a new one
    tl.clear();

    // Add animations to the timeline
    if (flag === 0) {
      // If flag is 0, fade out part1 and fade in part2
      tl.to(part1, { opacity: 0, duration: 0.2 })
        .to(part2, { opacity: 1, duration: 0.2 }, '-=0.2'); // Staggered timing
    } else {
      // If flag is 1, fade out part2 and fade in part1
      tl.to(part2, { opacity: 0, duration: 0.2 })
        .to(part1, { opacity: 1, duration: 0.2 }, '-=0.2'); // Staggered timing
    }

    // Play the timeline
    tl.play();

    // Toggle flag value
    flag = flag === 0 ? 1 : 0;
  });
});

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  
})();
