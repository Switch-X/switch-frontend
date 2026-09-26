"use client";

/**
 * The company name behind every `applicationId`, for screens that list linked records.
 *
 * <p>One extra call rather than an id on every row: the payloads carry only `applicationId`, and
 * "Interview · #14" tells the reader nothing about which company it is.
 */

import { useMemo } from "react";
import { api } from "@/lib/api";
import { useResource } from "@/lib/hooks";
import { APPLICATION_LOOKUP_SIZE } from "@/components/shared/constants/applications";
import { companyNameMap } from "@/components/shared/utils/companyNames";

export function useCompanyNames({ withRole = false }: { withRole?: boolean } = {}) {
  const applications = useResource(
    () => api.applications.list({ size: APPLICATION_LOOKUP_SIZE }),
    [],
  );
  const content = applications.data?.content;

  return useMemo(() => companyNameMap(content ?? [], { withRole }), [content, withRole]);
}
