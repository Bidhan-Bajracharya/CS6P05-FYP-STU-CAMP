import React from "react";
import { useSwipeable } from "react-swipeable";

import { useDispatch, useSelector } from "react-redux";
import { goToNext, goToPrevious, goToSlide } from "../features/sliderSlice";

import * as MdIcons from "react-icons/md";

// import SlArrowRight from "react-icons/sl";

const Slider = () => {
  const { currentIndex } = useSelector((store) => store.slider);
  const dispatch = useDispatch();

  const slides = ["Common Camp", "Computing", "Networking", "Multimedia"];

  // styles for pointer arrow
  const arrowStyle = { color: "white", opacity: "0.5", zIndex: "1" };

  // swipeable motion for mobiles
  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch(goToNext(slides)),
    onSwipedRight: () => dispatch(goToPrevious(slides)),
  });

  return (
    <>
      <div
        className="flex flex-col bg-[#FA8128] h-32 w-[90%] rounded-xl m-0 lg:w-[95%] lg:h-28"
        {...handlers}
      >
        <div className="flex flex-row items-center mt-auto">
          <div
            className="cursor-pointer lg:ml-[60px] sm:max-lg:ml-[40px]"
            onClick={() => {
              dispatch(goToPrevious(slides));
            }}
          >
            <MdIcons.MdOutlineArrowBackIosNew size={35} style={arrowStyle} />
          </div>

          <h1 className="text-3xl mx-auto mb-0 text-white lg:text-4xl select-none">
            {slides[currentIndex]}
          </h1>

          <div
            className="cursor-pointer lg:mr-[60px] sm:max-lg:mr-[40px]"
            onClick={() => {
              dispatch(goToNext(slides));
            }}
          >
            <MdIcons.MdArrowForwardIos size={35} style={arrowStyle} />
          </div>
        </div>

        <div className="flex mx-auto cursor-pointer mt-auto w-fit">
          {slides.map((slide, slideIndex) => {
            const activeDot =
              slideIndex === currentIndex
                ? "w-2 h-2 bg-[#893101] rounded-full mb-2 mr-2 hover:bg-[#893101]"
                : "w-2 h-2 bg-[#C95B0C] rounded-full mb-2 mr-2 hover:bg-[#893101]";

            return (
              <div
                key={slideIndex}
                onClick={() => {
                  dispatch(goToSlide(slideIndex));
                }}
                className={activeDot}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
