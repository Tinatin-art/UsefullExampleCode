import { useEffect, useRef, useState } from "react";

export default function SyncScrollWithBody() {
  const firstDivRef = useRef();

  const [scrollTop, setScrollTop] = useState(0);
  const [disableBodyScroll, setDisableBodyScroll] = useState(false);
  const handleScrollFirst = (scroll) => {
    setScrollTop(scroll.target.scrollTop);
  };

  useEffect(() => {
    if (firstDivRef.current && !disableBodyScroll) {
      firstDivRef.current.scrollTop = scrollTop;
    }
    if (disableBodyScroll) {
      window.scrollTo(0, scrollTop);
    }
  }, [firstDivRef, scrollTop, disableBodyScroll]);

  useEffect(() => {
    const onScroll = () => {
      console.log(disableBodyScroll, window.scrollY);

      if (!disableBodyScroll) {
        setScrollTop(window.scrollY);
      }
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [disableBodyScroll]);

  return (
    <div
      className="App"
      style={{
        display: "flex"
      }}
    >
      <div
        onMouseEnter={() => setDisableBodyScroll(true)}
        onMouseLeave={() => setDisableBodyScroll(false)}
        onScroll={handleScrollFirst}
        ref={firstDivRef}
        style={{
          height: "500px",
          overflow: "scroll",
          backgroundColor: "#FFDAB9",
          position: "sticky",
          top: "0px"
        }}
      >
        <div style={{ height: 5000, width: 300 }}>
          The first div (or it can be tbody of a table and etc.)
          {[...new Array(1000)].map((_, index) => {
            const isEven = index % 2 === 0;
            return (
              <div style={{ backgroundColor: isEven ? "#FFFFE0  " : "#FFDAB9" }}>
                {index}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          height: "100%",

          backgroundColor: "#EEE8AA"
        }}
      >
        <div style={{ height: 5000, width: 200 }}>
          The second div
          {[...new Array(1000)].map((_, index) => {
            const isEven = index % 2 === 0;
            return (
              <div style={{ backgroundColor: isEven ? "#FFFFE0  " : "#FFDAB9" }}>
                {index}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}