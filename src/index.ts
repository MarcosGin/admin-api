import { App } from "./app";

const application = new App();

application.initializeApp().then(() => {
  console.log("App is running at http://localhost:%d in %s mode", application.getPort(), application.getEnv());
});
