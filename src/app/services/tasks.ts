"use client";

import { Task } from "../types/shared";

export type BoardTasksByColumn = { [columnId: string]: Task[] };

/**
 * Fetch tasks for the board from the API. This is a mocked endpoint.
 */
export async function fetchBoardTasks(): Promise<BoardTasksByColumn> {
  // Simulate network latency for the mock service
  await new Promise((resolve) => setTimeout(resolve, 400));

  const response = await fetch("/api/tasks", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = (await response.json()) as BoardTasksByColumn;
  return data;
}


