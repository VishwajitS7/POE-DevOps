# Little Shop

A simple, responsive e-commerce demo with a product list, shopping cart, subtotal, and checkout confirmation. It uses plain HTML, CSS, and JavaScript with no application dependencies.

## Run locally

Requires Node.js 18 or newer.

```sh
npm test
npm run build
```

After building, open `dist/index.html` in a browser. You can also serve the `public/` folder with any static web server.

## Run the Jenkins pipeline

1. Install Node.js 18+ and npm on a Jenkins agent, and ensure both commands are on its `PATH`.
2. Create a Jenkins Pipeline job pointing at this Git repository and select **Pipeline script from SCM**.
3. Choose Git, enter the repository URL and branch, and set the script path to `Jenkinsfile`.
4. Save the job and select **Build Now**.

The pipeline runs `npm run build`, then `npm test`. On success, Jenkins archives the built website from `dist/` as a downloadable build artifact.