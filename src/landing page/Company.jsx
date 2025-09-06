import React from "react";
import './company.css'
import Marquee from "react-fast-marquee";
import Slider from "react-slick";
import { companys } from "../Data/Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JobCategory from "./JobCategory";

const Company = () => {
   const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280, // screens < 1280px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // screens < 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // screens < 640px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <div className="text-4xl bs-mx:text-3xl md-mx:2xl xsm-mx:text-xl mb-10 text-mine-shaft-100 text-center">
        Trusted by <span className="text-bright-sun-400">1000</span> Companies
      </div>

      {/* Horizontal marquee */}
      <Marquee pauseOnHover={true}>
        {companys.map((company, index) => (
          <div
            key={index}
            className="mx-8 px-2 py-1 hover:bg-mine-shaft-900 rounded-xl cursor-pointer"
          >
            <img
              className="h-20"
              src={`/companies/${company}.webp`}
              alt={company}
            />
          </div>
        ))}
      </Marquee>
      <JobCategory />

      {/* Vertical slider */}
      <div className="group relative w-full mx-auto mt-10 overflow-visible px-10 pl-16">
        <Slider {...settings} className="[&_.slick-arrow]:opacity-0 group-hover:[&_.slick-arrow]:opacity-75 [&_.slick-arrow:hover]:opacity-100">
          <div className="px-2">
            <div className="flex flex-col h-full justify-center items-center text-center px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className=" h-full justify-center transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(202,138,4,0.7)] flex flex-col items-center text-center px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className="h-full justify-center transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(202,138,4,0.7)] flex flex-col items-center text-cente px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className= "h-full justify-center transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(202,138,4,0.7)] flex flex-col items-center text-center px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className="h-full justify-center transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(202,138,4,0.7)] flex flex-col items-center text-center px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className="h-full justify-center transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(202,138,4,0.7)] flex flex-col items-center text-center px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className="h-full justify-center transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(202,138,4,0.7)] flex flex-col items-center text-center px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="h-6 w-6"
                  src="/icons/keyboard-icon.png"
                  alt="icon"
                />
              </div>

              <div className="text-mine-shaft-100 text-lg font-semibold">
                Data Entry
              </div>

              <div className="text-sm text-mine-shaft-300">
                Input data into systems
                <br />
                accurately and efficiently
              </div>

              <div className="text-bright-sun-300 text-base font-medium">
                1k+ new job posted
              </div>
            </div>
          </div>

          {/* lex flex-col items-center text-center w-64 px-4 py-6 border-2 border-bright-sun-300 rounded-lg gap-3 */}
        </Slider>
      </div>
    </div>
  );
};

export default Company;