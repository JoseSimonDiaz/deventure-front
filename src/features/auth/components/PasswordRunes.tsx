import { COPY } from '@/shared/constants/copy';
import { LIMITS } from '@/shared/constants/limits';
import { HAS_DIGIT, HAS_LETTER } from '@/shared/contracts/auth';
import { Rune } from '@/shared/illustrations/Rune';

type PasswordRule = { id: string; label: string; isSatisfiedBy: (password: string) => boolean };

const PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'length',
    label: COPY.auth.passwordRuleLength,
    isSatisfiedBy: (password) =>
      password.length >= LIMITS.passwordMinLength && password.length <= LIMITS.passwordMaxLength,
  },
  {
    id: 'letter',
    label: COPY.auth.passwordRuleLetter,
    isSatisfiedBy: (password) => HAS_LETTER.test(password),
  },
  {
    id: 'digit',
    label: COPY.auth.passwordRuleDigit,
    isSatisfiedBy: (password) => HAS_DIGIT.test(password),
  },
];

type PasswordRunesProps = { password: string };

export function PasswordRunes({ password }: PasswordRunesProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-mist">{COPY.auth.passwordRulesTitle}</p>
      <ul className="flex flex-col gap-1.5">
        {PASSWORD_RULES.map((passwordRule) => {
          const isSatisfied = passwordRule.isSatisfiedBy(password);
          return (
            <li
              key={passwordRule.id}
              className={`flex items-center gap-2 text-sm transition-colors ${isSatisfied ? 'text-aurora' : 'text-mist'}`}
            >
              <Rune
                glyph="algiz"
                className={`w-5 transition-[opacity,transform] ${isSatisfied ? 'scale-110 opacity-100' : 'opacity-40'}`}
              />
              <span>{passwordRule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
