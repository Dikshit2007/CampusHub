"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AdminSession, StudentSession } from "@/types/auth";
import {
  clearStudentSession,
  getStudentSession,
} from "@/lib/auth/mock-student-auth";
import {
  clearAdminSession,
  getAdminSession,
} from "@/lib/auth/mock-admin-auth";

interface SessionContextValue {
  studentSession: StudentSession | null;
  adminSession: AdminSession | null;
  refreshStudent: () => void;
  refreshAdmin: () => void;
  logoutStudent: () => void;
  logoutAdmin: () => void;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [studentSession, setStudentSession] = useState<StudentSession | null>(
    null
  );
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshStudent = useCallback(() => {
    setStudentSession(getStudentSession());
  }, []);

  const refreshAdmin = useCallback(() => {
    setAdminSession(getAdminSession());
  }, []);

  useEffect(() => {
    refreshStudent();
    refreshAdmin();
    setIsLoading(false);
  }, [refreshStudent, refreshAdmin]);

  const logoutStudent = useCallback(() => {
    clearStudentSession();
    setStudentSession(null);
  }, []);

  const logoutAdmin = useCallback(() => {
    clearAdminSession();
    setAdminSession(null);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        studentSession,
        adminSession,
        refreshStudent,
        refreshAdmin,
        logoutStudent,
        logoutAdmin,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
