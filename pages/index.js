import { useContext, useRef } from "react";
import { gsap } from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/dist/ScrollTrigger";
import { SmootherContext } from "../SmootherContext";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export default function IndexPage() {
  const smoother = useContext(SmootherContext);
  const boxC = useRef();

  useIsomorphicLayoutEffect(() => {
    smoother && smoother.effects("[data-speed], [data-lag]", {});
  }, [smoother]);

  function scrollTo() {
    smoother && smoother.scrollTo(boxC.current, true, "center center");
  }

  return (
    <div>
      <div id="smooth-content">
        <header className="header">
          <h1 className="title">ScrollSmoother</h1>
          <button className="button" onClick={scrollTo}>
            Jump to C
          </button>
        </header>
        <div className="box box-a" data-speed="0.5">
          a
        </div>
        <div className="box box-b" data-speed="0.8">
          b
        </div>
        <div className="box box-c" data-speed="1.5" ref={boxC}>
          c
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
}
