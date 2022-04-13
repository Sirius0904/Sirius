import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import NFTBalance from "components/NFTBalance";
import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import MenuItems from "./components/MenuItems";
const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "serif, sans-serif",
    color: "#fff",
    marginTop: "120px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    fontFamily: "serif, sans-serif",
    alignItems: "center",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 20%)",
  },
  /*кошелек справа*/
  headerRight: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    fontSize: "17px",
    fontWeight: "300",
    /*кошелек справа*/
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "150vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            {/*лого токена*/}
            <TokenPrice
              address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
              chain="eth"
              image="https://sun2.velcom-by-minsk.userapi.com/impf/PJSMJOBRSyM4RZ_Z9BqpApCOpI4t7gjv1Z28EQ/EEXO3V7I6Lc.jpg?size=1117x938&quality=95&sign=d8ceac8f726b6be07a871e50479b4a98&type=album"
              size="60px"
            />
            {/*лого токена*/}
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/nftMarket">
              <NFTBalance />
            </Route>
            <Route path="/transactions">
              <NFTBalance />
            </Route>
            <Redirect to="/nftBalance" />
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};
/* работа с логотипом */
export const Logo = () => (
  <div style={{ display: "flex" }}>
    <svg
      width="105"
      height="70"
      viewBox="-3 0 130 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 24.251 11.15 L 20.351 15.95 A 15.314 15.314 0 0 0 18.434 12.217 A 13.383 13.383 0 0 0 16.626 10.15 Q 14.151 7.85 10.751 7.85 A 9.158 9.158 0 0 0 8.687 8.069 Q 6.882 8.486 5.701 9.7 Q 3.901 11.55 3.901 14.45 A 9.259 9.259 0 0 0 4.115 16.495 A 6.646 6.646 0 0 0 5.201 18.95 Q 6.501 20.75 8.351 21.85 Q 10.16 22.926 13.214 24.289 A 92.486 92.486 0 0 0 13.351 24.35 Q 16.351 25.7 18.076 26.7 Q 19.801 27.7 21.001 29.3 Q 22.201 30.9 22.201 33.25 A 13 13 0 0 1 22.201 33.399 Q 22.201 37.641 19.401 39.95 Q 16.551 42.3 12.001 42.3 Q 8.651 42.3 5.626 40.975 Q 2.601 39.65 0.801 36.95 L 4.701 32.6 A 19.135 19.135 0 0 0 5.897 34.975 Q 7.204 37.15 8.851 38.275 A 11.143 11.143 0 0 0 10.667 39.296 Q 12.163 39.95 13.601 39.95 A 6.562 6.562 0 0 0 15.508 39.683 A 5.462 5.462 0 0 0 17.276 38.775 A 3.963 3.963 0 0 0 18.343 37.564 Q 18.801 36.741 18.801 35.7 Q 18.801 33.95 17.726 32.625 A 9.37 9.37 0 0 0 15.538 30.674 A 10.871 10.871 0 0 0 15.051 30.375 A 30.695 30.695 0 0 0 13.938 29.765 Q 12.681 29.106 10.949 28.313 A 98.758 98.758 0 0 0 10.701 28.2 A 78.887 78.887 0 0 1 8.46 27.135 Q 6.479 26.153 5.101 25.3 Q 3.001 24 1.501 21.875 A 8.1 8.1 0 0 1 0.14 18.473 A 10.876 10.876 0 0 1 0.001 16.7 Q 0.001 13.5 1.676 10.875 A 11.361 11.361 0 0 1 6.117 6.868 A 13.49 13.49 0 0 1 6.301 6.775 A 14.11 14.11 0 0 1 11.741 5.336 A 16.87 16.87 0 0 1 12.851 5.3 Q 16.201 5.3 19.201 6.825 Q 22.201 8.35 24.251 11.15 Z"
        fill="#1826B0"
      />
      <path
        d="M 33.901 16.9 L 33.901 37.5 A 2.455 2.455 0 0 0 33.955 38.034 Q 34.043 38.429 34.272 38.72 A 1.566 1.566 0 0 0 34.276 38.725 Q 34.651 39.2 35.351 39.2 A 1.458 1.458 0 0 0 35.818 39.117 Q 36.175 38.997 36.576 38.7 Q 37.113 38.302 37.666 37.619 A 10.221 10.221 0 0 0 37.951 37.25 L 38.751 38 A 9.668 9.668 0 0 1 37.821 39.437 Q 37.225 40.192 36.532 40.695 A 5.392 5.392 0 0 1 35.976 41.05 Q 34.741 41.734 33.665 41.898 A 4.4 4.4 0 0 1 33.001 41.95 A 4.512 4.512 0 0 1 31.86 41.814 A 3.119 3.119 0 0 1 30.226 40.8 Q 29.352 39.769 29.261 37.454 A 14.155 14.155 0 0 1 29.251 36.9 L 29.251 18.7 L 33.901 16.9 Z M 33.951 0 L 32.251 11.65 L 30.601 12.25 L 28.551 1.85 L 33.951 0 Z"
        fill="#2E3784"
      />
      <path
        d="M 60.151 38.2 L 59.601 37.45 A 6.871 6.871 0 0 1 58.373 38.12 Q 57.514 38.475 56.67 38.498 A 4.296 4.296 0 0 1 56.551 38.5 Q 54.201 38.5 53.001 36.85 Q 51.801 35.2 51.801 32.85 Q 51.801 29.05 53.751 25.65 A 33.705 33.705 0 0 1 56.928 21.07 A 40.141 40.141 0 0 1 58.701 19.05 L 57.901 18.35 Q 55.375 19.937 53.162 20.379 A 8.475 8.475 0 0 1 51.501 20.55 A 3.759 3.759 0 0 1 49.281 19.813 A 5.637 5.637 0 0 1 48.401 19.025 Q 47.001 17.5 46.251 15.65 L 42.201 20.2 A 2.979 2.979 0 0 0 42.536 20.854 Q 43.035 21.606 44.101 22.5 L 40.751 29.5 L 42.601 30.35 L 45.851 23.2 A 11.872 11.872 0 0 0 46.352 23.394 Q 46.838 23.569 47.2 23.64 A 3.386 3.386 0 0 0 47.251 23.65 A 4.966 4.966 0 0 0 47.633 23.703 Q 48.032 23.743 48.571 23.749 A 16.967 16.967 0 0 0 48.751 23.75 A 9.446 9.446 0 0 0 52.699 22.923 A 9.229 9.229 0 0 0 53.251 22.65 L 53.401 22.8 A 17.168 17.168 0 0 0 51.307 25.506 Q 50.459 26.846 49.731 28.459 A 28.988 28.988 0 0 0 49.526 28.925 A 22.947 22.947 0 0 0 48.489 31.826 Q 48.057 33.375 47.942 34.792 A 12.491 12.491 0 0 0 47.901 35.8 A 10.268 10.268 0 0 0 48.094 37.849 Q 48.365 39.176 49.011 40.223 A 6.461 6.461 0 0 0 49.076 40.325 Q 50.251 42.15 52.851 42.15 A 7.97 7.97 0 0 0 56.755 41.118 A 9.361 9.361 0 0 0 56.876 41.05 Q 58.801 39.95 60.151 38.2 Z"
        fill="#081272"
      />
      <path
        d="M 70.701 16.9 L 70.701 37.5 A 2.455 2.455 0 0 0 70.755 38.034 Q 70.843 38.429 71.072 38.72 A 1.566 1.566 0 0 0 71.076 38.725 Q 71.451 39.2 72.151 39.2 A 1.458 1.458 0 0 0 72.618 39.117 Q 72.975 38.997 73.376 38.7 Q 73.913 38.302 74.466 37.619 A 10.221 10.221 0 0 0 74.751 37.25 L 75.551 38 A 9.668 9.668 0 0 1 74.621 39.437 Q 74.025 40.192 73.332 40.695 A 5.392 5.392 0 0 1 72.776 41.05 Q 71.541 41.734 70.465 41.898 A 4.4 4.4 0 0 1 69.801 41.95 A 4.512 4.512 0 0 1 68.66 41.814 A 3.119 3.119 0 0 1 67.026 40.8 Q 66.152 39.769 66.061 37.454 A 14.155 14.155 0 0 1 66.051 36.9 L 66.051 18.7 L 70.701 16.9 Z M 70.751 0 L 69.051 11.65 L 67.401 12.25 L 65.351 1.85 L 70.751 0 Z"
        fill="#4C59D8"
      />
      <path
        d="M 100.601 16 L 100.601 37.35 A 2.455 2.455 0 0 0 100.655 37.884 Q 100.743 38.279 100.972 38.57 A 1.566 1.566 0 0 0 100.976 38.575 Q 101.351 39.05 102.051 39.05 A 1.529 1.529 0 0 0 102.732 38.869 Q 103.549 38.46 104.579 37.128 A 14.477 14.477 0 0 0 104.601 37.1 L 105.351 37.85 A 10.598 10.598 0 0 1 104.597 39.212 Q 104.152 39.886 103.647 40.376 A 4.994 4.994 0 0 1 102.826 41.025 L 101.351 41.95 L 100.051 41.95 A 4.535 4.535 0 0 1 99.105 41.858 Q 98.518 41.733 98.077 41.438 A 2.484 2.484 0 0 1 97.626 41.05 A 3.079 3.079 0 0 1 97.156 40.348 Q 96.691 39.423 96.451 37.825 A 23.358 23.358 0 0 1 96.281 36.337 Q 96.101 34.206 96.101 30.9 Q 96.101 28.15 96.151 26.5 L 95.751 25.5 L 95.601 25.5 Q 94.301 31.65 91.976 36.975 A 13.176 13.176 0 0 1 90.69 39.305 Q 89.798 40.568 88.708 41.299 A 5.893 5.893 0 0 1 85.351 42.3 A 5.079 5.079 0 0 1 84.52 42.237 Q 84.071 42.162 83.719 42 A 2.117 2.117 0 0 1 83.026 41.5 A 3.179 3.179 0 0 1 82.398 40.436 Q 82.217 39.937 82.151 39.325 Q 82.036 38.276 82.009 36.37 A 89.462 89.462 0 0 1 82.001 35.1 L 82.001 21 A 3.125 3.125 0 0 0 81.956 20.457 Q 81.872 19.978 81.626 19.65 A 1.192 1.192 0 0 0 80.759 19.158 A 1.566 1.566 0 0 0 80.601 19.15 Q 79.401 19.15 77.901 21.15 L 77.301 20.35 Q 77.943 18.823 78.86 17.926 A 4.812 4.812 0 0 1 79.326 17.525 A 8.277 8.277 0 0 1 80.205 16.94 Q 80.668 16.676 81.107 16.521 A 4.076 4.076 0 0 1 81.626 16.375 A 13.733 13.733 0 0 1 81.854 16.329 Q 82.668 16.173 82.699 16.29 A 0.038 0.038 0 0 1 82.701 16.3 A 0.297 0.297 0 0 0 82.668 16.302 Q 82.622 16.307 82.551 16.325 A 0.624 0.624 0 0 1 82.486 16.337 Q 82.416 16.347 82.315 16.349 A 2.813 2.813 0 0 1 82.251 16.35 A 5.317 5.317 0 0 1 84.056 16.631 Q 86.551 17.529 86.551 21.3 L 86.551 35.7 Q 86.551 36.563 86.704 37.041 A 1.466 1.466 0 0 0 86.801 37.275 Q 86.933 37.527 87.094 37.645 A 0.507 0.507 0 0 0 87.401 37.75 Q 89.172 37.75 90.74 34.899 A 17.168 17.168 0 0 0 91.401 33.55 A 49.288 49.288 0 0 0 93.582 27.523 A 59.356 59.356 0 0 0 94.426 24.3 Q 95.548 19.475 95.598 18.347 A 2.205 2.205 0 0 0 95.601 18.25 L 100.601 16 Z"
        fill="#717BD8"
      />
      <path
        d="M 107.551 39.7 L 110.901 35.25 Q 112.101 36.8 113.426 37.9 A 4.964 4.964 0 0 0 114.716 38.689 A 4.148 4.148 0 0 0 116.301 39 Q 118.451 39 119.976 37.575 A 4.872 4.872 0 0 0 121.089 36.073 A 4.498 4.498 0 0 0 121.501 34.15 A 4.194 4.194 0 0 0 121.064 32.321 Q 120.785 31.741 120.329 31.164 A 7.933 7.933 0 0 0 120.176 30.975 Q 119.285 29.917 117.91 28.599 A 59.583 59.583 0 0 0 116.451 27.25 A 10.536 10.536 0 0 1 116.293 27.116 Q 116.042 26.897 115.593 26.491 A 126.051 126.051 0 0 1 115.301 26.225 Q 114.6 25.586 114.205 25.134 A 5.562 5.562 0 0 1 114.051 24.95 L 110.551 30.1 L 108.951 29.05 L 112.951 23.5 A 11.799 11.799 0 0 1 112.312 20.783 A 10.49 10.49 0 0 1 112.251 19.65 Q 112.251 17.664 113.061 16.296 A 4.95 4.95 0 0 1 113.201 16.075 Q 114.151 14.65 115.801 14.65 Q 117.341 14.65 118.122 15.143 A 1.952 1.952 0 0 1 118.276 15.25 A 1.912 1.912 0 0 1 118.958 16.315 Q 119.043 16.641 119.05 17.033 A 3.949 3.949 0 0 1 119.051 17.1 A 5.93 5.93 0 0 1 118.911 18.412 A 4.785 4.785 0 0 1 118.526 19.5 A 11.777 11.777 0 0 1 117.982 20.475 A 8.703 8.703 0 0 1 117.401 21.3 A 46.932 46.932 0 0 0 117.141 21.627 Q 116.822 22.034 116.662 22.261 A 4.28 4.28 0 0 0 116.601 22.35 Q 117.142 23.252 118.538 24.44 A 21.471 21.471 0 0 0 118.851 24.7 Q 120.201 25.85 121.001 26.75 Q 121.801 27.65 122.376 29.175 A 8.223 8.223 0 0 1 122.769 30.639 Q 122.951 31.663 122.951 32.9 A 9.959 9.959 0 0 1 122.29 36.547 A 9.45 9.45 0 0 1 121.776 37.65 Q 120.601 39.8 118.526 41.05 A 8.77 8.77 0 0 1 114.333 42.289 A 10.521 10.521 0 0 1 113.851 42.3 A 8.849 8.849 0 0 1 112.176 42.131 Q 111.41 41.984 110.587 41.707 A 14.826 14.826 0 0 1 110.351 41.625 A 7.593 7.593 0 0 1 109.09 41.052 Q 108.393 40.649 107.903 40.127 A 4.252 4.252 0 0 1 107.551 39.7 Z M 115.801 16.6 A 1.858 1.858 0 0 0 115.522 16.619 Q 115.178 16.672 115.027 16.867 A 0.51 0.51 0 0 0 114.976 16.95 Q 114.817 17.266 114.802 17.868 A 5.205 5.205 0 0 0 114.801 18 A 5.439 5.439 0 0 0 114.845 18.715 Q 114.895 19.088 114.999 19.406 A 3.107 3.107 0 0 0 115.051 19.55 Q 115.256 20.085 115.36 20.349 A 23.097 23.097 0 0 0 115.401 20.45 A 2.047 2.047 0 0 0 115.8 20.109 Q 116.128 19.755 116.426 19.175 Q 116.727 18.588 116.837 18.111 A 2.278 2.278 0 0 0 116.901 17.6 A 1.196 1.196 0 0 0 116.859 17.275 A 0.902 0.902 0 0 0 116.626 16.875 A 0.863 0.863 0 0 0 116.282 16.669 Q 116.076 16.6 115.801 16.6 Z"
        fill="#4B2A82"
      />
    </svg>
  </div>
);
/* работа с логотипом */

export default App;
