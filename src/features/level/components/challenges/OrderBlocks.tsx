import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { COPY } from '@/shared/constants/copy';
import { Button } from '@/shared/ui/Button';
import { shuffleItems } from '@/shared/utils/shuffleItems';

type CodeBlock = { id: string; code: string };

const RESET_ICON = <RotateCcw aria-hidden="true" className="h-5 w-5" />;
const MOVE_UP = -1;
const MOVE_DOWN = 1;

export function OrderBlocks({
  challenge,
  isLocked,
  isCorrect,
  wrongDetails,
  onAnswerChange,
}: ChallengeInputProps<'order_blocks'>) {
  const shuffledBlocks = useMemo(
    () => shuffleItems(challenge.payload.blocks),
    [challenge.payload.blocks],
  );
  const [program, setProgram] = useState<CodeBlock[]>([]);
  const programIds = new Set(program.map((block) => block.id));
  const availableBlocks = shuffledBlocks.filter((block) => !programIds.has(block.id));

  const updateProgram = (nextProgram: CodeBlock[]) => {
    setProgram(nextProgram);
    const isComplete = nextProgram.length === challenge.payload.blocks.length;
    onAnswerChange(
      isComplete ? { type: 'order_blocks', order: nextProgram.map((block) => block.id) } : null,
    );
  };
  const handleAdd = (block: CodeBlock) => () => {
    updateProgram([...program, block]);
  };
  const handleRemove = (blockId: string) => () => {
    updateProgram(program.filter((block) => block.id !== blockId));
  };
  const handleMove = (blockIndex: number, offset: number) => () => {
    const targetIndex = blockIndex + offset;
    const reordered = [...program];
    const [movedBlock] = reordered.splice(blockIndex, 1);
    if (!movedBlock) return;
    reordered.splice(targetIndex, 0, movedBlock);
    updateProgram(reordered);
  };
  const handleReset = () => {
    updateProgram([]);
  };

  const lineTone = (blockIndex: number) => {
    if (isCorrect) return 'border-aurora';
    if (wrongDetails?.firstWrongIndex === blockIndex) return 'border-ember ring-2 ring-ember';
    return 'border-fjord-600';
  };

  return (
    <div className="flex flex-col gap-4">
      <section aria-label={COPY.challenges.availableBlocks} className="flex flex-col gap-2">
        <h3 className="font-code text-sm font-semibold text-mist uppercase">
          {COPY.challenges.availableBlocks}
        </h3>
        <ul className="flex flex-col gap-2">
          {availableBlocks.map((block) => (
            <li key={block.id}>
              <button
                type="button"
                disabled={isLocked}
                onClick={handleAdd(block)}
                aria-label={COPY.challenges.addBlock(block.code)}
                className="min-h-11 w-full rounded-xl border-2 border-fjord-600 bg-fjord-950 px-3 py-2 text-left font-code text-sm whitespace-pre text-frost hover:border-aurora"
              >
                {block.code}
              </button>
            </li>
          ))}
        </ul>
        {!availableBlocks.length && <p className="text-mist">{COPY.challenges.allBlocksUsed}</p>}
      </section>
      <section aria-label={COPY.challenges.yourProgram} className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-code text-sm font-semibold text-mist uppercase">
            {COPY.challenges.yourProgram}
          </h3>
          <Button variant="ghost" icon={RESET_ICON} onClick={handleReset} disabled={isLocked}>
            {COPY.challenges.resetBlocks}
          </Button>
        </div>
        {!program.length && <p className="text-mist">{COPY.challenges.emptyProgram}</p>}
        <ol className="flex flex-col gap-2">
          {program.map((block, blockIndex) => (
            <li
              key={block.id}
              className={`flex items-center gap-2 rounded-xl border-2 bg-fjord-900 p-1 ${lineTone(blockIndex)}`}
            >
              <span className="w-7 text-right font-code text-sm text-mist">{blockIndex + 1}.</span>
              <button
                type="button"
                disabled={isLocked}
                onClick={handleRemove(block.id)}
                aria-label={COPY.challenges.removeBlock(block.code)}
                className="min-h-11 flex-1 px-2 text-left font-code text-sm whitespace-pre text-frost"
              >
                {block.code}
              </button>
              <button
                type="button"
                disabled={isLocked || blockIndex === 0}
                onClick={handleMove(blockIndex, MOVE_UP)}
                aria-label={COPY.challenges.moveUp(block.code)}
                className="grid h-11 w-11 place-items-center rounded-lg text-aurora disabled:opacity-30"
              >
                <ArrowUp aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={isLocked || blockIndex === program.length - 1}
                onClick={handleMove(blockIndex, MOVE_DOWN)}
                aria-label={COPY.challenges.moveDown(block.code)}
                className="grid h-11 w-11 place-items-center rounded-lg text-aurora disabled:opacity-30"
              >
                <ArrowDown aria-hidden="true" className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ol>
      </section>
      {isCorrect && challenge.payload.expectedOutput && (
        <div className="flex flex-col gap-1">
          <p className="font-code text-sm font-semibold text-aurora uppercase">
            {COPY.level.expectedOutput}
          </p>
          <pre className="rounded-xl bg-fjord-950 p-3 font-code text-frost">
            {challenge.payload.expectedOutput}
          </pre>
        </div>
      )}
    </div>
  );
}
