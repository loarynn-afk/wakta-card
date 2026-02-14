import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.join(process.cwd(), 'public', 'assets', 'cards');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'assets', 'cards-webp');
const QUALITY = 80;

async function optimizeImages() {
  // 출력 폴더 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // PNG, WEBP 파일 목록
  const files = fs.readdirSync(INPUT_DIR).filter((f) =>
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  console.log(`[optimize] ${files.length}개 이미지 변환 시작...`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputName = file.replace(/\.(png|jpg|jpeg|webp)$/i, '.webp');
    const outputPath = path.join(OUTPUT_DIR, outputName);

    try {
      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`  [OK] ${file} -> ${outputName} (${reduction}% 감소)`);
      success++;
    } catch (err) {
      console.error(`  [FAIL] ${file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`[optimize] 완료: ${success}개 성공, ${failed}개 실패`);
}

optimizeImages();
