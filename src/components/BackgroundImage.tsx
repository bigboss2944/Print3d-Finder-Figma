import bgImage from 'figma:asset/1c817c81463cbf775d3121264c5968af2a1cabc2.png';

export function BackgroundImage() {
  return (
    <>
      <div 
        className="fixed inset-0 z-0 opacity-80 grayscale-[20%]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="fixed inset-0 z-0 bg-white/85 pointer-events-none" />
    </>
  );
}
