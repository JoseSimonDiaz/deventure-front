import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { fetchLevelChallenges } from '@/features/admin/api/adminApi';
import { ChallengeEditor } from '@/features/admin/components/ChallengeEditor';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import { PageShell } from '@/shared/ui/PageShell';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

const NEW_CHALLENGE_KEY = 'new';

export function AdminLevelPage() {
  const { levelId = '' } = useParams();
  const queryClient = useQueryClient();
  const [selectedKey, setSelectedKey] = useState(NEW_CHALLENGE_KEY);
  const levelQuery = useQuery({
    queryKey: queryKeys.admin.levelChallenges(levelId),
    queryFn: () => fetchLevelChallenges(levelId),
  });

  const challenges = levelQuery.data?.challenges ?? [];
  const selectedChallenge = challenges.find((challenge) => challenge.id === selectedKey) ?? null;

  const handleSelect = (challengeKey: string) => () => {
    setSelectedKey(challengeKey);
  };
  const handleChanged = () => {
    setSelectedKey(NEW_CHALLENGE_KEY);
    void queryClient.invalidateQueries({ queryKey: queryKeys.admin.levelChallenges(levelId) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.admin.zones });
  };

  return (
    <PageShell title={levelQuery.data?.title ?? COPY.admin.title} backTo={ROUTES.admin}>
      {levelQuery.isPending && <RuneSkeleton label={COPY.admin.loading} />}
      {levelQuery.isError && (
        <p role="alert" className="text-ember">
          {COPY.errors.generic}
        </p>
      )}
      <ol className="flex flex-col gap-2">
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <button
              type="button"
              onClick={handleSelect(challenge.id)}
              aria-pressed={challenge.id === selectedKey}
              className={`min-h-11 w-full rounded-xl border-2 px-3 py-2 text-left text-frost ${challenge.id === selectedKey ? 'border-rune-gold bg-fjord-700' : 'border-fjord-600 bg-fjord-800'}`}
            >
              <span className="font-code text-sm text-aurora">
                {challenge.order}. {challenge.type}
              </span>
              <span className="block truncate">{challenge.statement}</span>
            </button>
          </li>
        ))}
      </ol>
      <Button variant="ghost" onClick={handleSelect(NEW_CHALLENGE_KEY)}>
        {COPY.admin.newChallenge}
      </Button>
      {levelQuery.data && (
        <ChallengeEditor
          key={selectedKey}
          levelId={levelId}
          challenge={selectedChallenge}
          onChanged={handleChanged}
        />
      )}
    </PageShell>
  );
}
