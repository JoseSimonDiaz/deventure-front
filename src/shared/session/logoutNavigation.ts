import { z } from 'zod';

export const LOGOUT_NAVIGATION_STATE = { isLoggingOut: true } as const;

const logoutNavigationStateSchema = z.object({ isLoggingOut: z.literal(true) });

export function isLogoutNavigation(navigationState: unknown): boolean {
  return logoutNavigationStateSchema.safeParse(navigationState).success;
}
