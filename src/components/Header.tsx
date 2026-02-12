import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-[1000]"
      style={{
        background: 'linear-gradient(180deg, #020a1a 0%, #000613 100%)',
        borderBottom: '1px solid rgba(100, 140, 255, 0.15)',
        boxShadow: '0 1px 20px rgba(60, 100, 220, 0.1)',
      }}>
      <div className="mx-auto max-w-[1400px] px-5 h-[60px] flex items-center justify-start
        max-md:h-[50px]">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center no-underline">
            <div className="w-10 h-10 rounded-lg border-2 border-gold shadow-[0_2px_8px_rgba(255,215,0,0.2)]
              max-md:w-[35px] max-md:h-[35px]"
              style={{ background: 'linear-gradient(145deg, #f5a623 0%, #d4880f 100%)' }} />
          </Link>
          <nav className="flex gap-1.5 ml-5">
            <Link href="/members"
              className="relative text-white font-semibold text-[0.95rem] py-2 px-4 no-underline
                transition-all duration-200 after:content-[''] after:absolute after:bottom-[-5px]
                after:left-1/2 after:-translate-x-1/2 after:w-[50px] after:h-[3px] after:bg-gold
                after:rounded-sm max-md:text-[0.85rem] max-md:py-1.5 max-md:px-3">
              인물소개
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
