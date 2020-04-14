export let pSettings = {
  density: 100,

  phaseAB: 300,
  phaseBC: 300,
  phaseCD: 300,
  phaseDE: 100,

  dxSlow: 0.1,
  dxFast: 0.2,

  yAmplitude: 0.1,

  opacityMax: .8,
  opacityRate: 0.005,


  filters: "blur(2px)",
  radiusBase: 5,
  radiusVariation: 4,
  radiusMaxGrow: 0.1,
  colors: [
    "#aaff00",
    "#05ff00"
  ],
  shadowBlur: 17,
};

export let cSettings = {
  containerWidth: 22,
  containerHeight: 19,
  containerBreak: 48,
};