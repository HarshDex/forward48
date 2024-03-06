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

  const mediaQuery = window.matchMedia("(max-width: 600px)"); 

  const handleMediaQuery = (mq) => {
    if (mq.matches) {
      tl.pause();
    } else {
      tl.resume();
    }
  };
  // Initial check
  handleMediaQuery(mediaQuery); 
  // Listener for changes
  mediaQuery.addEventListener('change', (mq) => handleMediaQuery(mq)); 

  
  // important
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  
})();
