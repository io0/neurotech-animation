// import "../styles.css";
// import { useState, useRef, useEffect } from "react";
// import { SmootherContext } from "../SmootherContext";
// import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

// function scrollSmoother(options) {
//   const defaults = {
//     smooth: 1,
//     normalizeScroll: true,
//     ignoreMobileResize: true,
//     effects: true,
//     preventDefault: true,
//   };

//   const settings = { ...defaults, ...options };

//   let scrollY = 0;
//   let lastScrollY = 0;
//   let contentEl;

//   const onScroll = () => {
//     scrollY = window.scrollY;
//     if (settings.effects) {
//       contentEl.style.transform = `translate3d(0, ${-scrollY}px, 0)`;
//     }
//     lastScrollY = scrollY;
//   };

//   const init = (wrapperId, contentId) => {
//     contentEl = document.getElementById(contentId);
//     document.getElementById(wrapperId).style.overflow = "hidden";
//     window.addEventListener("scroll", onScroll, { passive: true });
//   };

//   const destroy = () => {
//     window.removeEventListener("scroll", onScroll, { passive: true });
//   };

//   return { init, destroy };
// }

// export default function MyApp({ Component, pageProps }) {
//   let [smoother, setSmoother] = useState();
//   const videoRef = useRef(null);

//   useIsomorphicLayoutEffect(() => {
//     let mySmoother = scrollSmoother();
//     mySmoother.init("smooth-wrapper", "smooth-content");
//     setSmoother(mySmoother);

//     if (videoRef.current) {
//       const coolVideo = videoRef.current;

//       // Custom implementation of the video timeline
//       const onScroll = () => {
//         const start = 0;
//         const end = window.innerHeight * 2;
//         const progress = Math.min(
//           Math.max(window.scrollY - start, 0) / (end - start),
//           1
//         );
//         coolVideo.currentTime = progress * coolVideo.duration;
//       };

//       window.addEventListener("scroll", onScroll, { passive: true });

//       return () => {
//         window.removeEventListener("scroll", onScroll, { passive: true });
//       };
//     }
//   }, []);

//   return (
//     <div>
//       <div style={{ position: "fixed" }}>
//         <video
//           id="video1"
//           width="100%"
//           height="100%"
//           // autoPlay
//           muted
//           ref={videoRef}
//           preload="auto"
//         >
//           {/* <source src="/output.mp4" type="video/mp4" /> */}
//           <source
//             src="https://curius.s3.us-west-2.amazonaws.com/neuron.mp4"
//             type="video/mp4"
//           />
//           Your browser does not support HTML video.
//         </video>
//       </div>
//       <div id="smooth-wrapper">
//         <div id="smooth-content">{/* <Component {...pageProps} /> */}</div>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useEffect } from "react";

function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const videoUrl = url;

  const onSuccess = (blob_url) => {
    const video = videoRef.current;
    if (video && !video.src) {
      video.src = blob_url;
    }
  };

  useEffect(() => {
    prefetch_file(videoUrl).then(onSuccess);
  }, [videoUrl]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      controls
      playsInline
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function prefetch_file(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const URL = window.URL || window.webkitURL;
        const blob_url = URL.createObjectURL(xhr.response);
        resolve(blob_url);
      } else {
        reject(xhr.statusText);
      }
    });

    xhr.addEventListener("error", () => {
      reject("Network error");
    });

    xhr.send();
  });
}

function App() {
  return (
    <div>
      <VideoPlayer url="https://neurotech2.s3.amazonaws.com/neuron.mp4" />
    </div>
  );
}

export default App;
