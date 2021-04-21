# PolyMap
PolyMap is an open source polygon visualizer used by BTE Germany.
It is build using [Next.JS](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/) and [React Leaflet](https://react-leaflet.js.org/).

# Demo
A demo is available on [https://map.bte-germany.de](https://map.bte-germany.de)

# Deployment
Deployment of PolyMap is pretty straightforward. You have two ways to host PolyMap.
## Requirements
- [Vercel](https://vercel.com/) Account or NodeJS enabled webspace/server
- [Algolia Account](https://www.algolia.com/)
### 1. (Easy) Deploy with Vercel
Because PolyMap is build using Next.JS (which happens to be made by Vercel) it is really easy to deploy it. Just click the button below and fill in the required information.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FNachwahl%2Fpolymap&env=DB_CON,DISCORD,ALLOW_EVERYTHING,NEXT_PUBLIC_ALGOLIA_APPID&envDescription=All%20values%20are%20required.&envLink=https%3A%2F%2Fgithub.com%2FNachwahl%2Fpolymap%2Fwiki%2FEnv-Variables&demo-title=BTE%20Germany%20Map&demo-description=BTE%20Germany%20is%20using%20PolyMap%20to%20show%20their%20claimed%20regions.&demo-url=https%3A%2F%2Fmap.bte-germany.de&demo-image=https%3A%2F%2Fi.arvserver.tech%2Fmsedge_2dtDuWxrqD.png)

### 2. (Advanced) Build with ``yarn build``
If you want to deploy your app to any hosting provider, that supports NodeJS or want to use your own server, you can build PolyMap using ``yarn build``. Learn more over [here](https://nextjs.org/docs/deployment#nodejs-server)

# Minecraft Plugin
To use PolyMap, you need to install [PolyMap-MC](https://github.com/Nachwahl/polymap-mc/) on your server.

# Contribute
If you find any bugs, errors or want to add a feature, feel free to fork the project and create a pull request :)
Otherwise, you can create an issue [here](https://github.com/Nachwahl/polymap/issues).
