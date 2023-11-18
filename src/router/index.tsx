import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import AuthRoute from '@/auth'

import HomePage from '@/views/HomePage/HomePage.tsx'

import Login from '@/views/Login/Login.tsx'

import Home from '@/views/HomePage/Home/Home.tsx'

import Content from '@/views/HomePage/Content/Content.tsx'
import Optimized from "@/views/HomePage/Content/Optimized/Optimized.tsx";
import Engine from "@/views/HomePage/Content/Engine/Engine.tsx";
import Media from "@/views/HomePage/Content/Media/Media.tsx";
import Email from "@/views/HomePage/Content/Email/Email.tsx";
import Blogs from "@/views/HomePage/Content/Blogs/Blogs.tsx";

import Bot from '@/views/HomePage/Bot/Bot.tsx'

import Analytics from "@/views/HomePage/Analytics/Analytics.tsx";

import Support from "@/views/HomePage/Support/Support.tsx";

import Oops from '@/views/Oops/Oops.tsx'

//Optimize Content
import Tone from '@/views/HomePage/Content/Optimized/Tone'
import Summarize from '@/views/HomePage/Content/Optimized/Summarize'
import Paraphrase from '@/views/HomePage/Content/Optimized/Paraphrase'
import BrandVoice from '@/views/HomePage/Content/Optimized/BrandVoice'
import Audience from '@/views/HomePage/Content/Optimized/Audience'

//Email
import Freestyle from '@/views/HomePage/Content/Email/Freestyle'
import Marketing from '@/views/HomePage/Content/Email/Marketing'
import Welcome from '@/views/HomePage/Content/Email/Welcome'

//Blogs
import Odds from '@/views/HomePage/Content/Email/Odds'
import Intro from '@/views/HomePage/Content/Blogs/Intro'
import Outline from '@/views/HomePage/Content/Blogs/Outline'
import Entire from '@/views/HomePage/Content/Blogs/Entire'
import Chat from '@/views/HomePage/Bot/Chat'
import Create from '@/views/HomePage/Bot/Create'

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
                path: 'optimized',
                element: <Optimized />,
                children: [
                  {
                    path: 'tone',
                    element: <Tone />
                  },
                  {
                    path: 'summarize',
                    element: <Summarize />
                  },
                  {
                    path: 'paraphrase',
                    element: <Paraphrase />
                  },
                  {
                    path: 'brandvoice',
                    element: <BrandVoice />
                  },
                  {
                    path: 'audience',
                    element: <Audience />
                  },
                ]
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
                element: <Email />,
                children:[
                  {
                    path: 'freestyle',
                    element: <Freestyle />
                  },
                  {
                    path: 'marketing',
                    element: <Marketing />
                  },
                  {
                    path: 'welcome',
                    element: <Welcome />
                  },
                  {
                    path: 'odds',
                    element: <Odds />
                  },
                ]
              },
              {
                path: 'blogs',
                element: <Blogs />,
                children: [
                  {
                    path: 'intro',
                    element: <Intro />
                  },
                  {
                    path: 'outline',
                    element: <Outline />
                  },
                  {
                    path: 'entire',
                    element: <Entire />
                  },
                ]
              }
            ]
          },
          {
            path: 'bot',
            element: <Bot />,
            children: [
              {
                path: 'chat',
                element: <Chat />
              },
              {
                path: 'create',
                element: <Create />
              },
            ]
          },
          {
            path: 'analytics',
            element: <Analytics />
          },
          {
            path: 'support',
            element: <Support />
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
