import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

interface CarouselProps {
  slides: string[];
  subSlide?: "DOT" | "IMAGE" | "NONE";
  className?: string;
  numberOfSubSlides?: number;
  // hideBsChevron?: boolean;
}

const Carousel = ({
  slides,
  className,
  subSlide = "NONE",
  numberOfSubSlides = 4
  // hideBsChevron = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [subSlideIndex, setSubSlideIndex] = useState<{
    startIdx: number;
    endIdx: number;
  }>({ startIdx: 0, endIdx: 0 });
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const handleRenderSubSlide = () => {
      const totalSlides = slides.length;
      let startIdx, endIdx;
      if (numberOfSubSlides % 2 === 1) {
        // Nếu numberOfSubSlides là số lẻ
        startIdx = Math.max(
          0,
          currentIndex - Math.floor(numberOfSubSlides / 2)
        );
        endIdx = startIdx + numberOfSubSlides;
        if (endIdx > totalSlides) {
          startIdx = totalSlides - numberOfSubSlides;
          endIdx = totalSlides;
        }
      } else {
        startIdx = Math.max(
          0,
          currentIndex - Math.floor(numberOfSubSlides / 2) + 1
        );
        endIdx = startIdx + numberOfSubSlides;
        if (endIdx > totalSlides) {
          startIdx = totalSlides - numberOfSubSlides;
          endIdx = totalSlides;
        }
      }
      console.log({ startIdx, endIdx: endIdx - 1 });
      console.log(currentIndex);
      setSubSlideIndex({ startIdx, endIdx: endIdx - 1 });
    };
    handleRenderSubSlide();
  }, [currentIndex, slides.length, numberOfSubSlides]);

  return (
    <div
      className={`relative group max-w-[1400px] h-[78 0px] w-full m-auto py-16 px-4 ${className}`}
    >
      <div
        // style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className="w-full h-full rounded-2xl border border-slate-500 flex justify-center duration-500"
      >
        <Image src={slides[currentIndex]} className="w-full h-full" />
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] text-2xl left-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] text-2xl right-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>

      <div
        className={`flex top-4 gap-3 justify-center py-2 ${subSlide === "NONE" && "hidden"} ${subSlide === "IMAGE" && `grid grid-cols-${numberOfSubSlides}`}`}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className="text-2xl cursor-pointer col-span-1">
            {subSlide === "DOT" && (
              <RxDotFilled onClick={() => goToSlide(slideIndex)} />
            )}
            {subSlide === "IMAGE" &&
              slideIndex >= subSlideIndex.startIdx &&
              slideIndex <= subSlideIndex.endIdx && (
                <div className="border rounded border-slate-500">
                  <Image src={slide} onClick={() => goToSlide(slideIndex)} />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
