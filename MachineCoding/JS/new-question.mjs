#!/usr/bin/env node

import { access, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(scriptDirectory, 'index.html');

function printUsage() {
  console.log('Usage: node MachineCoding/JS/new-question.mjs "Question Name"');
  console.log('Creates a starter HTML page and adds it to MachineCoding/JS/index.html.');
}

function toPascalCaseFilename(questionName) {
  const words = questionName.normalize('NFKD').match(/[a-zA-Z0-9]+/g) ?? [];
  return `${words.map((word) => word[0].toUpperCase() + word.slice(1)).join('')}.html`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function createQuestionPage(questionName) {
  const safeName = escapeHtml(questionName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeName}</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 32px 20px;
        background: #f6f8fa;
        color: #0f172a;
        font-family: Inter, Arial, sans-serif;
      }
      .container { width: min(900px, 100%); margin: 0 auto; }
      .card {
        margin-bottom: 20px;
        padding: 24px;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        box-shadow: 0 8px 24px rgb(15 23 42 / 5%);
      }
      h1, h2 { margin-top: 0; }
      p, li { line-height: 1.65; }
      .placeholder { color: #64748b; }
      button {
        padding: 10px 16px;
        color: #fff;
        background: #2563eb;
        border: 0;
        border-radius: 8px;
        cursor: pointer;
      }
      #result {
        min-height: 72px;
        margin-top: 14px;
        padding: 14px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <main class="container">
      <section class="card">
        <h1>${safeName}</h1>
        <p class="placeholder">Add the question description here.</p>
      </section>

      <section class="card">
        <h2>Problem Statement</h2>
        <p class="placeholder">Write the problem statement and requirements here.</p>
      </section>

      <section class="card">
        <h2>Examples / Notes</h2>
        <ul>
          <li class="placeholder">Add input/output examples or constraints.</li>
        </ul>
      </section>

      <section class="card">
        <h2>Try Your Solution</h2>
        <p class="placeholder">Implement your solution in the script below, then connect it to this demo.</p>
        <button id="runButton" type="button">Run</button>
        <div id="result" aria-live="polite">Your demo output will appear here.</div>
      </section>
    </main>

    <script>
      // TODO: Write your solution here. Keep this inline script for the index preview.

      document.getElementById('runButton').addEventListener('click', () => {
        document.getElementById('result').textContent = 'Implement your solution, then wire it to this button.';
      });
    </script>
  </body>
</html>
`;
}

const questionName = process.argv.slice(2).join(' ').trim();

if (!questionName || questionName === '--help' || questionName === '-h') {
  printUsage();
  process.exit(questionName ? 0 : 1);
}

const filename = toPascalCaseFilename(questionName);
if (filename === '.html') {
  console.error('Question name must include at least one letter or number.');
  process.exit(1);
}

const marker = '        // QUESTION GENERATOR INSERTION POINT';
const indexHtml = await readFile(indexPath, 'utf8');
if (indexHtml.split(marker).length !== 2) {
  console.error('Could not find the unique question insertion point in index.html.');
  process.exit(1);
}

if (indexHtml.includes(`file: '${filename}'`) || indexHtml.includes(`file: "${filename}"`)) {
  console.error(`A question file named "${filename}" is already registered.`);
  process.exit(1);
}

const questionPath = path.join(scriptDirectory, filename);
try {
  await access(questionPath);
  console.error(`Refusing to overwrite existing file: ${filename}`);
  process.exit(1);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const ids = [...indexHtml.matchAll(/\bid:\s*(\d+)/g)].map((match) => Number(match[1]));
const id = Math.max(-1, ...ids) + 1;
const description = `Starter template for ${questionName}. Add the problem details and your solution.`;
const questionEntry = [
  '        {',
  `          id: ${id},`,
  `          name: ${JSON.stringify(questionName)},`,
  `          file: ${JSON.stringify(filename)},`,
  `          desc: ${JSON.stringify(description)},`,
  '        },',
].join('\n');
const updatedIndex = indexHtml.replace(marker, `${questionEntry}\n${marker}`);

await writeFile(questionPath, createQuestionPage(questionName), { flag: 'wx' });
try {
  await writeFile(indexPath, updatedIndex, 'utf8');
} catch (error) {
  await unlink(questionPath);
  throw error;
}

console.log(`Created ${filename} and registered "${questionName}" in index.html.`);