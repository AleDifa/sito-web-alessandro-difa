import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ lines }) => {
  const wrapperRef = useRef(null);

  const defaultLines = [
    "Realizzo siti web e landing page pensati per scalare il mercato per PMI e professionisti.",
    "Posiziono la tua attività in cima a Google e nei consigli delle IA.",
    "Integrazione con foto 3D e design avanzato per un'esperienza visiva unica."
  ];

  const textLines = lines && lines.length > 0 ? lines : defaultLines;

  useEffect(() => {
    // isMobile DEVE essere dichiarato qui, dentro l'effect
    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    const ctx = gsap.context(() => {
      const chars = wrapperRef.current.querySelectorAll('.char');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: isMobile ? '+=320%' : '+=220%',
          scrub: isMobile ? 0.8 : 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      tl.fromTo(
        chars,
        { opacity: 0.15 },
        { opacity: 1, ease: 'none', stagger: 0.1 }
      );
      tl.to({}, { duration: 1 }); // pausa finale a testo completo
    }, wrapperRef);

    return () => ctx.revert();
  }, [lines]);

  return (
    <div ref={wrapperRef} className="textRevealWrapper">
      <div className="text">
        {textLines.map((line, lineKey) => {
          const lineText = typeof line === 'string' ? line : line.text;
          const isItalic = typeof line === 'object' && line.italic;
          const words = lineText.split(' ');

          return (
            <div
              className={`line${isItalic ? ' line--italic' : ''}`}
              key={lineKey}
            >
              {words.map((wordText, wordKey) => (
                <React.Fragment key={wordKey}>
                  <span className="word">
                    {wordText.split('').map((char, charKey) => (
                      <span className="char" key={charKey}>
                        {char}
                      </span>
                    ))}
                  </span>
                  {wordKey < words.length - 1 && ' '}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollReveal;