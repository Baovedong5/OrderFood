"use client";

import { RoleType } from "@/constants/type";
import { decodeToken } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const AppContext = createContext({
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRoleState] = useState<RoleType | undefined>();
  const { data: session } = useSession();
  
  useEffect(() => {
    const token = session?.access_token as string;

    if (token) {
      const role = decodeToken(token).role as RoleType;
      setRoleState(role);
    }
  }, []);

  const setRole = useCallback((role?: RoleType | undefined) => {
    setRoleState(role);
  }, []);

  return (
    <AppContext.Provider value={{ role, setRole }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
