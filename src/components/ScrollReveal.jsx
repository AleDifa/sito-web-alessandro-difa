import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ lines }) => {
  const wrapperRef = useRef(null);

  // Fallback se non vengono passate righe
  const defaultLines = [
    "Realizzo siti web e landing page pensati per scalare il mercato per PMI e professionisti.",
    "Posiziono la tua attività in cima a Google e nei consigli delle IA.",
    "Integrazione con foto 3D e design avanzato per un'esperienza visiva unica."

  ];

  const textLines = lines && lines.length > 0 ? lines : defaultLines;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('.char');

      gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          pin: false,
        }
      }).to(chars, {
        opacity: 1,
        stagger: 0.08,
        ease: 'power1.inOut'
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [lines]);

  return (
    <div className="textRevealWrapper">
      <div ref={wrapperRef} className="text">
        {textLines.map((lineText, lineKey) => (
          <div className="line" key={lineKey}>
            {/* 1. Divide la riga in parole */}
            {lineText.split(' ').map((wordText, wordKey) => (
              <React.Fragment key={wordKey}>
                <span className="word">
                  {/* 2. Divide la parola in caratteri */}
                  {wordText.split('').map((char, charKey) => (
                    <span className="char" key={charKey}>
                      {char}
                    </span>
                  ))}
                </span>
                {/* Spazio normale tra le parole per consentire il va-a-capo naturale */}
                {wordKey < lineText.split(' ').length - 1 && ' '}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollReveal;