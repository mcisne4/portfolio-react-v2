// import React from "react";
import { useEffect, useContext } from "react";

import { pSettings, cSettings } from "./settings";
import { WindowContext } from "../../../utils/window/windowContext";

export let AnimateCanvas = (ref) => {
  const {fontSize, outerWidth, outerHeight } = useContext(WindowContext);
  useEffect(() => {
    let requestID;
    if(outerWidth !== undefined){
      // --- Canvas Variables ---
      const canvas = ref.current;
      const context = canvas.getContext("2d");

      const contentArea = setCanvas(canvas, fontSize, outerWidth);
      const [cWidth, cHeight] = [canvas.width, canvas.height];

      let p = createInitialParticles(cWidth, cHeight);

      function animateParticles(){
        p = updateParticles(p, contentArea, cWidth, cHeight);
        drawParticles(context, p, cWidth, cHeight);
        requestID = requestAnimationFrame(animateParticles);
      }

      animateParticles();
    }

    return () => {
      cancelAnimationFrame(requestID);
    }


  }, [ref, fontSize, outerWidth, outerHeight]);
}

// === Canvas Functions ===
function setCanvas(canvas, fontSize, outerWidth){
  const canvasParent = canvas.parentElement;

  // --- Set Canvas Size ---
  canvas.width = canvasParent.offsetWidth;
  canvas.height = canvasParent.offsetHeight;

  let x1, x2, y1, y2;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  if(outerWidth < cSettings.containerBreak * fontSize){
    // --- Mobile ---
    x1 = centerX - (cSettings.containerWidth / 2) * fontSize;
    x2 = centerX + (cSettings.containerWidth / 2) * fontSize;
    y1 = centerY - (cSettings.containerHeight) * fontSize;
    y2 = centerY + (cSettings.containerHeight) * fontSize;
  } else {
    // --- Desktop ---
    x1 = centerX - (cSettings.containerWidth) * fontSize;
    x2 = centerX + (cSettings.containerWidth) * fontSize;
    y1 = centerY - (cSettings.containerHeight / 2) * fontSize;
    y2 = centerY + (cSettings.containerHeight / 2) * fontSize;
  }
  return { x1, x2, y1, y2 };
}

function createInitialParticles(cWidth, cHeight){
  // --- Particle Settings ---
  pSettings.count = Math.round( (cWidth * cHeight) / Math.pow(pSettings.density, 2));
  pSettings.phaseA = 0;
  pSettings.phaseB = pSettings.phaseAB;
  pSettings.phaseC = pSettings.phaseB + pSettings.phaseBC;
  pSettings.phaseD = pSettings.phaseC + pSettings.phaseCD;
  pSettings.phaseE = pSettings.phaseD + pSettings.phaseDE;

  let p = {
    x: [],
    y: [],
    radius: [],
    color: [],
    opacity: [],
    age: [],
    directionX: [],
    directionY: [],
  };

  for(let i=0; i<pSettings.count; i++){
    p.x.push( Math.round( Math.random() * cWidth ) );
    p.y.push( Math.round( Math.random() * cHeight ) );
    p.radius.push( Math.round( pSettings.radiusBase + pSettings.radiusVariation * Math.random() ));
    p.color.push( pSettings.colors[Math.round(Math.random() * (pSettings.colors.length - 1))] );
    p.opacity.push(0);
    p.age.push( Math.round((pSettings.phaseE / pSettings.count) * i) );
    p.directionX.push( Math.random() < 0.5 ? -1 : 1);
    p.directionY.push( Math.random() < 0.5 ? -1 : 1);
  }

  return p;
}


function updateParticles(p, contentArea, cWidth, cHeight){
  for(let i = 0; i< pSettings.count; i++){
    p.age[i]++;
    if(p.age[i] > pSettings.phaseE){
      p.x[i] = Math.round( Math.random() * cWidth );
      p.y[i] = Math.round( Math.random() * cHeight );
      p.radius[i] = Math.round( pSettings.radiusBase + pSettings.radiusVariation * Math.random() );
      p.color[i] = pSettings.colors[Math.round(Math.random() * (pSettings.colors.length - 1))];
      p.opacity[i] = 0;
      p.age[i] = 0;
    }

    // --- Phase AB ---
    if(p.age[i] < pSettings.phaseB){
      // ... X Coord ...
      p.x[i] = +(p.x[i] + (p.directionX[i] * pSettings.dxSlow)).toFixed(2);
      // ... Y Coord ...
      p.y[i] = +(p.y[i] + p.directionY[i] * pSettings.yAmplitude * Math.sin( 2 * Math.PI * ( p.age[i] / pSettings.phaseE))).toFixed(2);
      // ... Opacity ...
      if(p.x[i] > contentArea.x1 && p.x[i] < contentArea.x2 && p.y[i] > contentArea.y1 && p.y[i] < contentArea.y2){
        if(p.opacity[i] !== 0){
          p.opacity[i] = +(p.opacity[i] - pSettings.opacityRate).toFixed(3);
          if(p.opacity[i] < 0){
            p.opacity[i] = 0;
          }
        }
      } else {
        if(p.opacity[i] < pSettings.opacityMax){
          p.opacity[i] = +(p.opacity[i] + pSettings.opacityRate).toFixed(3);
          if(p.opacity[i] > pSettings.opacityMax){
            p.opacity[i] = pSettings.opacityMax;
          }
        }
      }
    }

    // --- Phase BC ---
    else if(p.age[i] >= pSettings.phaseB && p.age[i] < pSettings.phaseC){
      // ... X Coord ...
      p.x[i] = +(p.x[i] + (p.directionX[i] * pSettings.dxFast)).toFixed(2);
      // ... Y Coord ...
      p.y[i] = +(p.y[i] + p.directionY[i] * pSettings.yAmplitude * Math.sin( 2 * Math.PI * ( p.age[i] / pSettings.phaseE))).toFixed(2);
      // ... Opacity ...
      if(p.x[i] > contentArea.x1 && p.x[i] < contentArea.x2 && p.y[i] > contentArea.y1 && p.y[i] < contentArea.y2){
        if(p.opacity[i] !== 0){
          p.opacity[i] = +(p.opacity[i] - pSettings.opacityRate).toFixed(3);
          if(p.opacity[i] < 0){
            p.opacity[i] = 0;
          }
        }
      } else {
        if(p.opacity[i] < pSettings.opacityMax){
          p.opacity[i] = +(p.opacity[i] + pSettings.opacityRate).toFixed(3);
          if(p.opacity[i] > pSettings.opacityMax){
            p.opacity[i] = pSettings.opacityMax;
          }
        }
      }
    }

    // --- Phase CD ---
    else if(p.age[i] >= pSettings.phaseC && p.age[i] < pSettings.phaseD){
      // ... X Coord ...
      p.x[i] = +(p.x[i] + (p.directionX[i] * pSettings.dxSlow)).toFixed(2);
      // ... Y Coord ...
      p.y[i] = +(p.y[i] + p.directionY[i] * pSettings.yAmplitude * Math.sin( 2 * Math.PI * ( p.age[i] / pSettings.phaseE))).toFixed(2);
      // ... Opacity ...
      if(p.opacity[i] !== 0){
        p.opacity[i] = +(p.opacity[i] - pSettings.opacityRate).toFixed(3);
        if(p.opacity[i] < 0){
          p.opacity[i] = 0;
        }
      }
    }

    // --- Phase DE ---
    else {
      p.opacity[i] = 0;
    }
  }

  // console.log("Age:", p.age[0], "Y:", p.y[0]);

  return p;
};

function drawParticles(context, p, cWidth, cHeight){
  context.clearRect(0, 0, cWidth, cHeight);

  context.save();
  // context.filter = pSettings.filters;
  for(let i=0; i<pSettings.count; i++){
    context.beginPath();
    context.shadowColor = p.color[i];
    context.shadowBlur = pSettings.shadowBlur;
    context.globalAlpha = p.opacity[i];
    context.fillStyle = p.color[i];
    context.arc(
      p.x[i],
      p.y[i],
      p.radius[i],
      0,
      2 * Math.PI
    );
    context.fill();
  }
  context.restore();
}
