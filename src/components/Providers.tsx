"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

// Dev-only mock: seeds auth + cart + intercepts /api/* calls.
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  import("@/lib/dev-mock");
}

/**
 * Everything below is deferred. Previously LoginModal, CartDrawer,
 * FloatingActions and ChatWidget were static imports, so their JS shipped in
 * the first load bundle of every single page even though none of them are
 * visible until the user interacts.
 */
const LoginModal = dynamic(() => import("@/components/auth/LoginModal"), {
  ssr: false,
});
const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});
const FloatingActions = dynamic(
  () => import("@/components/layout/FloatingActions"),
  { ssr: false },
);
const ChatWidget = dynamic(() => import("@/components/chatbot/ChatWidget"), {
  ssr: false,
});
const LenisProvider = dynamic(
  () => import("@/components/shared/LenisProvider"),
  { ssr: false },
);
const CursorFollower = dynamic(
  () => import("@/components/layout/CursorFollower"),
  { ssr: false },
);
const TrackingProvider = dynamic(
  () => import("@/components/TrackingProvider"),
  {
    ssr: false,
  },
);

/** True only for a real mouse-driven device that has not asked for less motion. */
function usePointerFine() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);
  return enabled;
}

/** Delay non-critical widgets until the browser is idle or the user interacts. */
function useDeferredMount(delay = 2500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let done = false;
    const mount = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "scroll",
    ];
    events.forEach((event) =>
      window.addEventListener(event, mount, { once: true, passive: true }),
    );
    const timer = window.setTimeout(mount, delay);
    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, mount));
    };
  }, [delay]);
  return ready;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 300_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  // Lenis smooth scrolling hijacks native scroll and is a common source of
  // poor INP and janky scrolling on phones. Desktop pointers only.
  const pointerFine = usePointerFine();
  const deferred = useDeferredMount();

  const content = (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-center"
        richColors
        dir="rtl"
        offset={80}
        toastOptions={{
          style: {
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            fontFamily: "Vazirmatn, system-ui, sans-serif",
          },
        }}
      />
      <LoginModal />
      <CartDrawer />
      {deferred && (
        <>
          <FloatingActions />
          <ChatWidget />
          <TrackingProvider />
        </>
      )}
      {pointerFine && deferred && <CursorFollower />}
    </QueryClientProvider>
  );

  return pointerFine ? <LenisProvider>{content}</LenisProvider> : content;
}
