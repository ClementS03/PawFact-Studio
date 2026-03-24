let gsapInstance = null

export async function initGSAP() {
  if (gsapInstance) return gsapInstance
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  gsapInstance = { gsap, ScrollTrigger }
  return gsapInstance
}
