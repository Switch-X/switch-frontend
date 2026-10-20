"use client";

import { ListPagination } from "@/components/shared/list/ListPagination";
import { useApplications } from "@/components/applications/context/ApplicationsProvider";

export function ApplicationsPagination() {
  const { applications, setPage } = useApplications();
  return <ListPagination data={applications.data} onPage={setPage} />;
}
