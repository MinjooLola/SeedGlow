import { useEffect, useState } from "react";

import img1 from "@assets/3_1767890854722.jpg";
import img2 from "@assets/GTJ01322_1767890854737.jpg";
import img3 from "@assets/KakaoTalk_20250523_104833739_03_1767890854743.jpg";
import img4 from "@assets/KakaoTalk_20250523_104936309_01_1767890854746.jpg";
import img5 from "@assets/KakaoTalk_20250523_104936309_02_1767890854749.jpg";
import img6 from "@assets/KakaoTalk_20250523_104936309_03_1767890854752.jpg";
import img7 from "@assets/KakaoTalk_20251210_233230339_1767890854755.jpg";
import img8 from "@assets/M4J01775_1767890854762.jpg";
import img9 from "@assets/M4J01778_1767890854765.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

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
              src={img}
              alt={`활동 사진 ${(index % images.length) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
