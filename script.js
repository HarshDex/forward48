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
  
  const page1 = document.querySelector('.main');
  page1.addEventListener('mousemove',(dets)=>{
    gsap.to('.cursor',{
      x : dets.clientX,
      y : dets.clientY,
    })
  })
  gsap.to('.cursor',{
    display : "none",
    scrollTrigger : {
      trigger : '.page2',
      scroller : ".main",
      scrub : true,
      start : 'top 80%',
      end : 'top 70%',
    }
  })
  

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
    autoplaySpeed : 600,
  });


// this is for color change
  gsap.to('.main',{
    backgroundColor : "white",
    scrollTrigger : {
      trigger : '.page3',
      scroller : ".main",
      start : 'center center',
      scrub : true,
    }
  })

  // page5 animations starts : 
  const pageFiveAnimations = () =>{
    const contentBars = document.querySelectorAll('.page5-content-bar');
    contentBars.forEach((elem) => {
      let flag = 0;
      const tl = gsap.timeline({ paused: true });
      elem.addEventListener('click', () => {
        const part1 = elem.querySelector('.page5-bar-part1');
        const part2 = elem.querySelector('.page5-bar-part2');
        tl.clear();
        if (flag === 0) {
          tl.to(part1, { opacity: 0, duration: 0.2 })
            .to(part2, { opacity: 1, duration: 0.2 }, '-=0.2');
        } else {
          tl.to(part2, { opacity: 0, duration: 0.2 })
            .to(part1, { opacity: 1, duration: 0.2 }, '-=0.2');
        }
        tl.play();
        flag = flag === 0 ? 1 : 0;
      });
    });
  }
  pageFiveAnimations();


  gsap.to('.page6-heading',{
    opacity : "1",
    scrollTrigger : {
      trigger : ".page5",
      scroller : ".main",
      start : "bottom 80%",
      end : "bottom 60%",
      scrub : true,
    }
  })


  let sec = gsap.utils.toArray(document.querySelectorAll('.pannel'));
  gsap.to(sec, {
    xPercent: -100 * (sec.length - 1),
    ease: "ease",
    scrollTrigger: {
      trigger: ".page6",
      scroller : ".main",
      pin: true,
      scrub: 1,
      // snap: 1 / (sec.length - 1),
      end: () => "+=" + document.querySelector(".page6").offsetWidth,
    }
  });

  const cardContainers = document.querySelectorAll('.page8-cards1, .page8-cards2');
  
  cardContainers.forEach((container) => {
    const cards = gsap.utils.toArray(container.querySelectorAll('.page8-card'));
  
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', (dets) => {
        const hoveredCardIndex = index;
  
        cards.forEach((otherCard, otherIndex) => {
          if (otherIndex > hoveredCardIndex) { 
            gsap.to(otherCard, {
              x: 200,
              duration: 0.3,
              ease : 'ease.inOut',
            });
          }
        });
      });
  
      card.addEventListener('mouseleave', (dets) => {
        cards.forEach((otherCard) => {
          gsap.to(otherCard, {
            x: 0, 
            duration: 0.3,
            ease : 'expo.inOut',
          });
        });
      });
    });
  });

  // media querries : 
  const mobileQuery = gsap.matchMedia();
  mobileQuery.add("(max-width: 767px)", () => {
    gsap.utils.toArray(['.page2', '.page3']).forEach((panel) => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === panel) {
            st.kill();
        }
      });
    });
    if (myLocomotiveInstance) {
      myLocomotiveInstance.destroy();
    };
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  
})();
