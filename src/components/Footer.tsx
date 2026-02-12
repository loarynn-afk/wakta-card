export default function Footer() {
  return (
    <footer className="py-[30px] px-5 text-center"
      style={{
        background: 'linear-gradient(180deg, #020a1a 0%, #000613 100%)',
        borderTop: '1px solid rgba(100, 140, 255, 0.1)',
      }}>
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[#4a5a7a] text-[0.85rem] mb-1.5">
          팬메이드 사이트입니다. 왁타버스와 공식적인 관련이 없습니다.
        </p>
        <p className="text-[#5a6a8a] text-[0.85rem]">Made with love by Fans</p>
      </div>
    </footer>
  );
}
