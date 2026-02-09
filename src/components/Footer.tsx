export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] py-[30px] px-5 text-center"
      style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)' }}>
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[#666] text-[0.85rem] mb-1.5">
          팬메이드 사이트입니다. 왁타버스와 공식적인 관련이 없습니다.
        </p>
        <p className="text-[#888] text-[0.85rem]">Made with love by Fans</p>
      </div>
    </footer>
  );
}
