import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

const heightTo = document.querySelector('.m-inner').getBoundingClientRect().height;
console.log(heightTo);

const wrappermarquee = [...document.querySelectorAll('.marquee-wrapper')]
wrappermarquee.forEach(el=>{

  el.style.height = `${heightTo}px`
})

// init lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

raf()

gsap.registerPlugin(ScrollTrigger);

// hero aniamtion
const heroTimeline = gsap.timeline()

heroTimeline.from('.hero-header h1', {
  filter: 'blur(25px)',
  duration: 1,
  y: '30px',
  rotateX: '-70deg'
})
  .from('.hero-header p', {
    opacity: 0,
    filter: 'blur(5px)',
    duration: .5,
    y: '20px',
  }, "-=.7")

// cursor animation
const cursor = document.querySelector('.cursor')
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: .3,
    ease: 'power4.0ut'
  })
})

const growSmall = () => {
  gsap.to(cursor, {
    scale: 4,
    filter: 'blur(2.5px)',
    duration: .5,
    ease: 'power4.out'
  })
}
const growBig = () => {
  gsap.to(cursor, {
    scale: 27,
    filter: 'blur(4px)',
    duration: .5,
    ease: 'power4.out'
  })
}
const growMedium = () => {
  gsap.to(cursor, {
    scale: 5.5,
    filter: 'blur(2.5px)',
    duration: .5,
    ease: 'power4.out'
  })
}

wrappermarquee.forEach(el => {
  el.addEventListener('mouseenter', () => {
    growBig()
  })
  el.addEventListener('mouseleave', () => {
    shrinkBack()
  })
})

const shrinkBack = () => {
  gsap.to(cursor, {
    scale: 1,
    filter: 'blur(0px)',
    duration: .5,
    ease: 'power4.out'
  })
}

document.querySelector('.header .logo').addEventListener('mouseenter', () => {
  growSmall()
})
document.querySelector('.header .logo').addEventListener('mouseleave', () => {
  shrinkBack()
})

document.querySelector('.nav').addEventListener('mouseenter', () => {
  growSmall()
})
document.querySelector('.nav').addEventListener('mouseleave', () => {
  shrinkBack()
})

document.querySelectorAll('.btn-glow').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const x = e.clientX - btn.getBoundingClientRect().left
    const y = e.clientY - btn.getBoundingClientRect().top
    const moveX = x - (btn.getBoundingClientRect().width / 2)
    const moveY = y - (btn.getBoundingClientRect().height / 2)
    gsap.to(btn, {
      x: moveX,
      y: moveY * .8,
    })
  })

  btn.addEventListener('mouseenter', () => {
    growSmall()
  })
  btn.addEventListener('mouseleave', () => {
    shrinkBack()
    gsap.to(btn, {
      x: 0,
      y: 0,
    })
  })
})

//video timeline scroll

const videoTimeline = gsap.timeline({
  defaults: {
    ease: 'none'
  },
  scrollTrigger: {
    trigger: '.section-video',
    start: 'top 80%',
    end: 'top 40%',
    scrub: 2,
  }
})

videoTimeline.to('.video', {
  scale: 1,
  y: 0,
  borderRadius: 500
})
  .to('.video', {
    borderRadius: 50
  })


const fadeInSpans = [...document.querySelectorAll('.fadein-text span')]
fadeInSpans.forEach(span => {
  gsap.to(span, {
    backgroundPositionX: '0%',
    scrollTrigger: {
      trigger: span,
      start: 'top 85%',
      end: 'top 20%',
      scrub: 2,
    }
  })
  if (span.dataset.fromleft) {
    gsap.from(span, {
      x: -250,
      scrollTrigger: {
        trigger: span,
        start: 'top 95%',
        end: 'top 30%',
        scrub: 2
      }
    })
  }
  if (span.dataset.fromright) {
    gsap.from(span, {
      x: 350,
      scrollTrigger: {
        trigger: span,
        start: 'top 95%',
        end: 'top 30%',
        scrub: 2
      }
    })
  }

})

const workitems = [...document.querySelectorAll('.works-item')]

workitems.forEach(item => {
  const image = item.querySelector('.work-image img')
  const detail = item.querySelector('.work-detail')
  gsap.from(detail, {
    y: 250,
    scrollTrigger: {
      trigger: item,
      start: 'top 70%',
      end: 'top 30%',
      scrub: 2
    }
  })
  const direction = image.dataset.direction

  gsap.from(image, {
    x: `${direction === 'left' ? -250 : 250}px`,
    rotate: `${direction === 'left' ? -12 : 12}deg`,
    scrollTrigger: {
      trigger: item,
      start: 'top bottom',
      end: 'top 30%',
      scrub: 2
    }
  })
})

document.querySelectorAll('.acard').forEach(card=>{
  const fadeup = card.querySelector('.fade-up')
  card.addEventListener('mouseenter',()=>{
    gsap.to(fadeup, {
      yPercent:-50,
      duration:1,
      delay:.2,
      ease:'power4.out'
    })
  })
  card.addEventListener('mouseleave',()=>{
    gsap.to(fadeup, {
      yPercent:0,
      duration:1,
      ease:'power4.out'
    })
  })
  if(card.dataset.left){
    gsap.from(card, {
      x:-250,
      rotate:'-20deg',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 2
      }
    })
  }
  if(card.dataset.right){
    gsap.from(card, {
      x:250,
      rotate:'20deg',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 2,
      }
    })
  }
})

const dribbleTl = gsap.timeline({
  defaults: {
    ease:'none',
  },
  scrollTrigger:{
    trigger:'.reveal-wrapper',
    start: 'top bottom',
    end: 'bottom 70%',
    scrub:2,
  }
})

dribbleTl.to('.moveleft1',{
  x:-500,
  y:250,
  rotate:'-40deg'
},'<')
.to('.moveright1',{
  x:500,
  y:250,
  rotate:'40deg'
},'<').
to('.moveleft2',{
  x:-340,
  y:-100,
  rotate:'-20deg'
},'<')
.to('.moveright2',{
  x:340,
  y:-100,
  rotate:'20deg'
},'<')
.
to('.moveleft3',{
  x:-170,
  y:-330,
  rotate:'-30deg'
},'<')
.to('.moveright3',{
  x:170,
  y:-330,
  rotate:'30deg'
},'<')


