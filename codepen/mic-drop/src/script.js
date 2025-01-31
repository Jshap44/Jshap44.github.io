gsap.config({trialWarn: false});
let select = s => document.querySelector(s),
  selectAll = s =>  document.querySelectorAll(s),
		mainSVG = select('#mainSVG')

gsap.set('svg', {
	visibility: 'visible'
})
function blendEases(startEase, endEase, blender) {
    var parse = function(ease) {
            return typeof(ease) === "function" ? ease : gsap.parseEase("power4.inOut");
        },
        s = gsap.parseEase(startEase),
        e = gsap.parseEase(endEase),
        blender = parse(blender);
    return function(v) {
      var b = blender(v);
      return s(v) * (1 - b) + e(v) * b;
    };
}
let tl = gsap.timeline({repeat: -1});
tl
.fromTo('#mainPath', {
	drawSVG: '40% 48%'
}, {
	duration: 1,
	drawSVG: '73.3% 81.3%',
	ease: blendEases('sine.in','back(0.7)')
}, 0)
.to('#mic', {
	duration: 0.45,
	y: '+=214.5',
	ease: 'power2.in'
}, 0.19)
.to('#mic', {
	duration: 1.55,
	rotation: 3,
	transformOrigin: '50% 100%',
	ease: 'wiggle({type:easeOut, wiggles:7})'
}, 0.45)
.to('#whole', {
	duration: 2,
	y: '-=214.5',
	ease: 'linear'
}, 0)
