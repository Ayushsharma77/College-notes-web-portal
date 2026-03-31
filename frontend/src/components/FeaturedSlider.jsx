import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const featuredNotes = [
  {
    title: "Advanced Data Structures",
    branch: "CSE",
    img: "/featured-1.jpg",
  },
  {
    title: "Fundamentals of Machine Learning",
    branch: "CSE-AI",
    img: "/featured-2.jpg",
  },
  {
    title: "Analog & Digital Communication",
    branch: "ECE",
    img: "/featured-3.jpg",
  },
  {
    title: "Thermodynamics & Fluid Mechanics",
    branch: "MECH",
    img: "/featured-4.jpg",
  },
];

export default function FeaturedSlider() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="!pb-12"
      >
        {featuredNotes.map((note, index) => (
          <SwiperSlide key={index}>
            <Link to={`/browse?search=${encodeURIComponent(note.title)}`}>
              <div className="group aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden relative">
                <img
                  src={note.img}
                  alt={note.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full font-mono">
                    {note.branch}
                  </span>
                  <h3 className="text-white font-display text-2xl mt-2">
                    {note.title}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
        <img src="/arrow-left.svg" alt="Previous" className="w-6 h-6" />
      </div>
      <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
        <img src="/arrow-right.svg" alt="Next" className="w-6 h-6" />
      </div>
    </div>
  );
}