import Image from 'next/image';

export default function FloatingHeroAssets() {
  return (
    <>
      {/* Background Grid Line Frame (Top Right) */}
      <Image
        src="/images/floating/float-grid-frame.png"
        alt="Grid Line Frame"
        width={392}
        height={707}
        priority
        className="absolute top-[15%] lg:top-[175px] right-[0%] lg:right-0 w-[250px] md:w-[300px] lg:w-[389px] z-0 opacity-100 pointer-events-none h-auto object-contain"
      />

      {/* Background Grid Line Frame Reversed (Bottom Left) */}
      <Image
        src="/images/floating/float-grid-frame.png"
        alt="Grid Line Frame Reversed"
        width={392}
        height={707}
        className="absolute top-[45%] lg:top-[510px] left-[-8%] lg:left-[-6%] w-[250px] md:w-[300px] lg:w-[389px] z-0 opacity-100 pointer-events-none h-auto object-contain -scale-x-100"
      />

      {/* Add New Glass Asset (Top Right) - Optimized WebP */}
      <Image
        src="/images/floating/float-add-new.webp"
        alt="Add New Glass"
        width={1310}
        height={734}
        priority
        className="absolute top-[12%] lg:top-[131px] right-[0%] lg:right-[-6px] w-[280px] md:w-[400px] lg:w-[592px] z-50 pointer-events-none drop-shadow-2xl h-auto object-contain"
      />

      {/* Calendar Asset (Middle Left) - Optimized WebP */}
      <Image
        src="/images/floating/float-calendar.webp"
        alt="Calendar Asset"
        width={1920}
        height={1080}
        priority
        className="absolute top-[40%] lg:top-[400px] left-[-5%] lg:left-[-6%] w-[350px] md:w-[500px] lg:w-[680px] z-50 pointer-events-none drop-shadow-2xl h-auto object-contain -scale-x-100"
      />

      {/* Random Floating Cluster (Middle Right) - Optimized WebP */}
      <Image
        src="/images/floating/float-cluster.webp"
        alt="Random Floating Cluster"
        width={1920}
        height={1080}
        className="absolute top-[55%] lg:top-[500px] right-[-5%] lg:right-[-8%] w-[350px] md:w-[550px] lg:w-[850px] z-50 pointer-events-none drop-shadow-2xl h-auto object-contain"
      />

      {/* iPad Mini Mockup (Hero Centerpiece) - Optimized WebP */}
      <Image
        src="/images/floating/float-dashboard.webp"
        alt="iPad Mini Mockup"
        width={3000}
        height={2250}
        priority
        className="absolute top-[70%] lg:top-[580px] left-[40%] lg:left-[35%] z-[60] w-[110%] lg:w-[120%] max-w-[1400px] h-auto object-contain pointer-events-none drop-shadow-2xl"
        style={{ transform: 'translateX(-50%) rotate(25deg)' }}
      />

      {/* 3D Decorative Element (Bottom Right) */}
      <Image
        src="/images/floating/float-3d-element.png"
        alt="3D Decorative Element"
        width={601}
        height={397}
        className="absolute top-[115%] lg:top-[1140px] right-[0%] lg:right-[5%] z-[55] w-[300px] md:w-[450px] lg:w-[600px] h-auto object-contain pointer-events-none"
      />

      {/* Decorative Element 527 (Middle-Bottom Right) */}
      <Image
        src="/images/floating/float-decorative-cluster.png"
        alt="Decorative Element 527"
        width={510}
        height={576}
        className="absolute top-[85%] lg:top-[820px] right-[2.5%] lg:right-[2.5%] z-10 w-[150px] md:w-[250px] lg:w-[350px] h-auto object-contain pointer-events-none drop-shadow-xl"
      />
    </>
  );
}
