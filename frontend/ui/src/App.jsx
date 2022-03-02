import { Show, Switch, Match } from 'solid-js';
import { createMemo, createEffect, onCleanup } from "solid-js";
import { useGlobalState } from "./GlobalState";
import Login from "./Login";
import MainPage from "./MainPage";

export default function App() {
  const [userInfo, { _ }] = useGlobalState();
  return (
    <>
      <Show when={userInfo.token} fallback={<Login />}>
        <MainPage />
      </Show>
    </>
  );
}