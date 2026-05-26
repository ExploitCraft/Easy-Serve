// App.tsx — Root component with React Router setup.
// Each page is lazy-loaded so the shell opens instantly.

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

const Dashboard  = lazy(() => import("./pages/Dashboard"));
const Console    = lazy(() => import("./pages/Console"));
const Settings   = lazy(() => import("./pages/Settings"));
const Plugins    = lazy(() => import("./pages/Plugins"));
const Mods       = lazy(() => import("./pages/Mods"));
const Network    = lazy(() => import("./pages/Network"));
const JavaMgr    = lazy(() => import("./pages/JavaManager"));

const Spinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div
      className="h-6 w-6 animate-spin rounded-full border-2 border-bg-border"
      style={{ borderTopColor: "var(--teal)" }}
    />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/"                      element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"             element={<Dashboard />} />
            <Route path="/console"               element={<Console />} />
            <Route path="/console/:serverId"     element={<Console />} />
            <Route path="/settings"              element={<Settings />} />
            <Route path="/settings/:serverId"    element={<Settings />} />
            <Route path="/plugins"               element={<Plugins />} />
            <Route path="/mods"                  element={<Mods />} />
            <Route path="/network"               element={<Network />} />
            <Route path="/java"                  element={<JavaMgr />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
