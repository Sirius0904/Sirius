import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import QuickStart from "components/QuickStart";

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
    );
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <App isServerInfo />
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuickStart />
      </div>
    );
  }
};

ReactDOM.render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById("root"),
);

// Если вы хотите, чтобы ваше приложение работало в автономном режиме и загружалось быстрее, вы можете заменить
// unregister() на register() ниже. Обратите внимание, что это сопряжено с некоторыми подводными камнями.
// Узнайте больше о service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
