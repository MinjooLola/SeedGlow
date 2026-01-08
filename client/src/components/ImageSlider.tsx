import { useEffect, useState } from "react";

const images = [
  "/attached_assets/3_1767890854722.jpg",
  "/attached_assets/DSC03795_1767890854730.JPG",
  "/attached_assets/DSC09894_1767890854734.JPG",
  "/attached_assets/GTJ01322_1767890854737.jpg",
  "/attached_assets/IMG_7599_1767890854740.JPG",
  "/attached_assets/KakaoTalk_20250523_104833739_03_1767890854743.jpg",
  "/attached_assets/KakaoTalk_20250523_104936309_01_1767890854746.jpg",
  "/attached_assets/KakaoTalk_20250523_104936309_02_1767890854749.jpg",
  "/attached_assets/KakaoTalk_20250523_104936309_03_1767890854752.jpg",
  "/attached_assets/KakaoTalk_20251210_233230339_1767890854755.jpg",
  "/attached_assets/KakaoTalk_20260108_061715922_02_1767890854758.jpg",
  "/attached_assets/M4J01775_1767890854762.jpg",
  "/attached_assets/M4J01778_1767890854765.jpg",
  "/attached_assets/모더레이터(4)_1767890854768.jpg",
  "/attached_assets/모더레이터(5)_1767890854771.jpg",
];

export default function ImageSlider() {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 50);
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
