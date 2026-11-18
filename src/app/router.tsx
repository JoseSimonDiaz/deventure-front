import { createBrowserRouter } from 'react-router';
import { RedirectIfSession } from '@/app/guards/RedirectIfSession';
import { RequireAdmin } from '@/app/guards/RequireAdmin';
import { RequireSession } from '@/app/guards/RequireSession';
import { AppLoadingPage } from '@/app/pages/AppLoadingPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { RouteErrorPage } from '@/app/pages/RouteErrorPage';
import { RootLayout } from '@/app/RootLayout';
import { ROUTE_IDS, ROUTES } from '@/shared/constants/routes';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: RouteErrorPage,
    HydrateFallback: AppLoadingPage,
    children: [
      {
        path: ROUTES.home,
        lazy: {
          Component: async () => (await import('@/features/home/HomePage')).HomePage,
        },
      },
      {
        Component: RedirectIfSession,
        children: [
          {
            path: ROUTES.login,
            lazy: {
              Component: async () => (await import('@/features/auth/LoginPage')).LoginPage,
            },
          },
          {
            path: ROUTES.register,
            lazy: {
              Component: async () => (await import('@/features/auth/RegisterPage')).RegisterPage,
            },
          },
        ],
      },
      {
        id: ROUTE_IDS.protected,
        Component: RequireSession,
        children: [
          {
            path: ROUTES.intro,
            lazy: {
              Component: async () => (await import('@/features/intro/IntroPage')).IntroPage,
            },
          },
          {
            path: ROUTES.zones,
            lazy: {
              Component: async () => (await import('@/features/zones/ZonesPage')).ZonesPage,
            },
          },
          {
            path: ROUTES.level,
            lazy: {
              Component: async () => (await import('@/features/level/LevelPage')).LevelPage,
            },
          },
          {
            path: ROUTES.progress,
            lazy: {
              Component: async () =>
                (await import('@/features/progress/ProgressPage')).ProgressPage,
            },
          },
          {
            path: ROUTES.gallery,
            lazy: {
              Component: async () => (await import('@/features/gallery/GalleryPage')).GalleryPage,
            },
          },
          {
            path: ROUTES.account,
            lazy: {
              Component: async () => (await import('@/features/account/AccountPage')).AccountPage,
            },
          },
          {
            path: ROUTES.theEnd,
            lazy: {
              Component: async () => (await import('@/features/ending/TheEndPage')).TheEndPage,
            },
          },
          {
            Component: RequireAdmin,
            children: [
              {
                path: ROUTES.admin,
                lazy: {
                  Component: async () =>
                    (await import('@/features/admin/AdminZonesPage')).AdminZonesPage,
                },
              },
              {
                path: ROUTES.adminLevel,
                lazy: {
                  Component: async () =>
                    (await import('@/features/admin/AdminLevelPage')).AdminLevelPage,
                },
              },
              {
                path: ROUTES.adminStats,
                lazy: {
                  Component: async () =>
                    (await import('@/features/admin/AdminStatsPage')).AdminStatsPage,
                },
              },
            ],
          },
        ],
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
