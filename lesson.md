
Getting started with TRPC

- add following dependencies to your project
 "@trpc/client": "^11.18.0",
    "@trpc/server": "^11.18.0",
    "@trpc/tanstack-react-query": "^11.18.0",
    "superjson": "^2.2.6",

- create your trpc route app/api/trpc/[...trpc]/route.ts
    [...] -> catch all slug
    /api/trpc/user/profile  ['user','profile']
    /students/[...paths]/page.tsx
    /students/1
    /students/1/grades

    const paths = await params.paths;


https://swr.vercel.app/docs/getting-started