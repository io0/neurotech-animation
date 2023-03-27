import "../styles.css";
import { useState, useRef } from "react";
import { gsap } from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/dist/ScrollTrigger";
// import { ScrollSmoother } from "gsap-trial/dist//ScrollSmoother";
import { SmootherContext } from "../SmootherContext";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export default function MyApp({ Component, pageProps }) {
  let [smoother, setSmoother] = useState();
  const videoRef = useRef(null);
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // let smoother = ScrollSmoother.create({
    //   smooth: 1,
    //   normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
    //   ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
    //   effects: true,
    //   preventDefault: true,
    // });

    // setSmoother(smoother);
    if (videoRef.current) {
      const coolVideo = videoRef.current;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: "video",
          start: "top top",
          end: "bottom+=200% bottom",
          scrub: true,
          markers: true,
        },
      });

      tl.to(coolVideo, { currentTime: coolVideo.duration });
    }
  }, []);

  return (
    <div>
      <div style={{ position: "fixed" }}>
        <video
          id="video1"
          width="100%"
          height="100%"
          // autoPlay
          muted
          ref={videoRef}
          preload="preload"
        >
          <source
            // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
            src="/output.mp4"
            type="video/mp4"
          />
          {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
          Your browser does not support HTML video.
        </video>
      </div>
      {/* <SmootherContext.Provider value={smoother}>
        <div id="smooth-wrapper">
          <div id="smooth-content"></div>
        </div>
      </SmootherContext.Provider> */}
      {/* <footer>
        <a href="https://greensock.com/scrollsmoother">
          <img
            className="greensock-icon"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-smoother-logo-light.svg"
            width="220"
            height="70"
            alt=""
          />
        </a>
      </footer> */}
    </div>
  );
}
