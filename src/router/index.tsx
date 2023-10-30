import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import AuthRoute from '@/auth'

import HomePage from '@/views/HomePage/HomePage.tsx'

import Login from '@/views/Login/Login.tsx'

import Home from '@/views/HomePage/Home/Home.tsx'

import Content from '@/views/HomePage/Content/Content.tsx'
import Options from '@/views/HomePage/Content/Options/Options.tsx'
import Optimized from "@/views/HomePage/Content/Optimized/Optimized.tsx";
import Engine from "@/views/HomePage/Content/Engine/Engine.tsx";
import Media from "@/views/HomePage/Content/Media/Media.tsx";
import Email from "@/views/HomePage/Content/Email/Email.tsx";
import Blogs from "@/views/HomePage/Content/Blogs/Blogs.tsx";

import Bot from '@/views/HomePage/Bot/Bot.tsx'

import Analytics from "@/views/HomePage/Analytics/Analytics.tsx";

import Support from "@/views/HomePage/Support/Support.tsx";

import Settings from "@/views/HomePage/Settings/Settings.tsx";

import Oops from '@/views/Oops/Oops.tsx'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthRoute />,
    children: [
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            path: '',
            element: <Navigate to="home" replace />,
          },
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'content',
            element: <Content />,
            children: [
              {
                path: 'options',
                element: <Options />
              },
              {
                path: 'optimized',
                element: <Optimized />
              },
              {
                path: 'engine',
                element: <Engine />
              },
              {
                path: 'media',
                element: <Media />
              },
              {
                path: 'email',
                element: <Email />
              },
              {
                path: 'blogs',
                element: <Blogs />
              }
            ]
          },
          {
            path: 'bot',
            element: <Bot />
          },
          {
            path: 'analytics',
            element: <Analytics />
          },
          {
            path: 'support',
            element: <Support />
          },
          {
            path: 'settings',
            element: <Settings />
          }
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <Navigate to="404" replace />,
      },
      {
        path: '404',
        element: <Oops />,
      },
    ],
  },
]

const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true
  }
})

export default router
