import { Fragment, type ReactNode } from 'react';

type RichTextProps = { text: string; className?: string };

type TextBlock =
  | { kind: 'code'; content: string }
  | { kind: 'heading'; content: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'paragraph'; content: string };

const CODE_FENCE = /```[a-z]*\n?([\s\S]*?)```/g;
const INLINE_TOKEN = /(`[^`]+`|\*\*[^*]+\*\*)/g;
const HEADING_PREFIX = /^#{1,3}\s+/;
const LIST_PREFIX = /^[-*]\s+/;
const CODE_DELIMITER = '`';
const BOLD_DELIMITER = '**';

function parseProse(prose: string): TextBlock[] {
  return prose
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): TextBlock => {
      if (HEADING_PREFIX.test(chunk)) {
        return { kind: 'heading', content: chunk.replace(HEADING_PREFIX, '') };
      }
      const lines = chunk.split('\n');
      if (lines.every((line) => LIST_PREFIX.test(line))) {
        return { kind: 'list', items: lines.map((line) => line.replace(LIST_PREFIX, '')) };
      }
      return { kind: 'paragraph', content: chunk };
    });
}

function parseBlocks(text: string): TextBlock[] {
  const blocks: TextBlock[] = [];
  let lastIndex = 0;
  for (const fenceMatch of text.matchAll(CODE_FENCE)) {
    blocks.push(...parseProse(text.slice(lastIndex, fenceMatch.index)));
    blocks.push({ kind: 'code', content: (fenceMatch[1] ?? '').replace(/\n$/, '') });
    lastIndex = fenceMatch.index + fenceMatch[0].length;
  }
  blocks.push(...parseProse(text.slice(lastIndex)));
  return blocks;
}

function renderInline(content: string): ReactNode[] {
  return content.split(INLINE_TOKEN).map((token, tokenIndex) => {
    if (token.startsWith(CODE_DELIMITER) && token.endsWith(CODE_DELIMITER) && token.length > 1) {
      return (
        <code key={tokenIndex} className="rounded bg-fjord-950 px-1.5 py-0.5 font-code text-aurora">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith(BOLD_DELIMITER) && token.endsWith(BOLD_DELIMITER)) {
      return (
        <strong key={tokenIndex} className="text-rune-gold">
          {token.slice(BOLD_DELIMITER.length, -BOLD_DELIMITER.length)}
        </strong>
      );
    }
    return <Fragment key={tokenIndex}>{token}</Fragment>;
  });
}

function renderBlock(block: TextBlock, blockIndex: number): ReactNode {
  if (block.kind === 'code') {
    return (
      <pre
        key={blockIndex}
        className="overflow-x-auto rounded-xl border-2 border-fjord-600 bg-fjord-950 p-4 font-code text-sm leading-relaxed text-frost"
      >
        <code>{block.content}</code>
      </pre>
    );
  }
  if (block.kind === 'heading') {
    return (
      <h3 key={blockIndex} className="font-heading text-xl font-bold text-rune-gold">
        {renderInline(block.content)}
      </h3>
    );
  }
  if (block.kind === 'list') {
    return (
      <ul key={blockIndex} className="list-disc space-y-1 pl-6">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={blockIndex} className="whitespace-pre-line">
      {renderInline(block.content)}
    </p>
  );
}

export function RichText({ text, className = '' }: RichTextProps) {
  return (
    <div className={`flex flex-col gap-3 text-lg leading-relaxed text-frost ${className}`}>
      {parseBlocks(text).map(renderBlock)}
    </div>
  );
}
