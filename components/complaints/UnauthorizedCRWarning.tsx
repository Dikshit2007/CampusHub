import { Alert } from "@/components/ui/Alert";

export function UnauthorizedCRWarning() {
  return (
    <Alert variant="warning" title="Not an Authorized Class Representative">
      You are not an authorized Class Representative (CR). Only authorized CRs
      can submit complaints on behalf of their class. Please contact your CR if
      you need to report an issue.
    </Alert>
  );
}
