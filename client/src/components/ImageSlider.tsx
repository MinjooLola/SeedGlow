import { useEffect, useState } from "react";

import { activityImages as images } from "@/assets/home/images";

export default function ImageSlider() {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const doubledImages = [...images, ...images];

  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div 
        className="flex gap-4"
        style={{
          transform: `translateX(-${offset % (images.length * 320)}px)`,
          width: `${doubledImages.length * 320}px`,
        }}
      >
        {doubledImages.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[300px] h-[200px] rounded-md overflow-hidden"
          >
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes="300px"
              width={img.width}
              height={img.height}
              alt={`시드글로우 컨설팅 및 강의 활동 사진 ${(index % images.length) + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
