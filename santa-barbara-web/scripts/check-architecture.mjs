import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

let violations = 0;

function getFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap(entry => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }

    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      return [fullPath];
    }

    return [];
  });
}

function checkImports(file) {
  const content = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(process.cwd(), file);

  const importPattern =
    /(?:import\s+(?:type\s+)?[\s\S]*?\s+from\s+|import\s*\(\s*|import\s+)(['"])([^'"]+)\1/g;

  for (const match of content.matchAll(importPattern)) {
    const importPath = match[2];

    if (
      importPath.startsWith('./') ||
      importPath.startsWith('../')
    ) {
      console.error(
        `IMPORT RELATIVO: ${relativeFile} → ${importPath}`
      );

      violations++;
    }

    const isUiFile = file.startsWith(
      path.join(SRC_DIR, 'ui')
    );

    const importsApplication =
      importPath.startsWith('@/application/') ||
      importPath === '@/application';

    if (isUiFile && importsApplication) {
      console.error(
        `VIOLAÇÃO DE ARQUITETURA: ${relativeFile} → ${importPath}`
      );

      console.error(
        '   A camada ui/ não pode depender da camada application/.'
      );

      violations++;
    }
  }
}

for (const file of getFiles(SRC_DIR)) {
  checkImports(file);
}

if (violations > 0) {
  console.error(
    `\n${violations} violação(ões) arquitetural(is) encontrada(s).\n`
  );

  process.exit(1);
}

console.log('Arquitetura válida.\n');