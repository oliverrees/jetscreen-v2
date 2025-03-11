"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { classNames } from "../lib/classNames";

type Props = {
  slides: any;
  splideRef: any;
};

const options = {
  type: "loop",
  arrows: false,
  direction: "ttb",
  height: "100vh",
  autoplay: true,
  interval: 10000,
  speed: 1000,
  pagination: false,
};

const SlideHolder = ({ slides, splideRef }: Props) => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Splide options={options} ref={splideRef}>
        {slides.map((slide: any, index: number) => {
          return (
            <SplideSlide key={index}>
              <div className="h-full flex w-full text-white">
                {slides.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={classNames(
                      item.width ? item.width : "w-full",
                      "text-white items-center justify-center flex flex-col "
                    )}
                  >
                    <span className="text-6xl font-semibold ">{item.stat}</span>
                    <div className="text-2xl mt-4 ">{item.title}</div>
                  </div>
                ))}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};

export default SlideHolder;
