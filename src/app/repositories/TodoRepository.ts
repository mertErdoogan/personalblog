"use server";

import { query } from "@/lib/db";

export type SearchOptionP = {
  queryStr?: string;
  statuses?: string[];
};

export const getSearchTodos = async (options: SearchOptionP) => {
  try {
    const { queryStr, statuses = [] } = options;

    const statusConditions =
      statuses.length > 0
        ? statuses.map((status) => `status = '${status}'`).join(" OR ")
        : null;
    const queryString = statusConditions
      ? `SELECT * FROM todos WHERE (description LIKE '%${queryStr}%' OR title LIKE '%${queryStr}%') AND ${statusConditions} ORDER BY id DESC;`
      : `SELECT * FROM todos WHERE description LIKE '%${queryStr}%' OR title LIKE '%${queryStr}%' ORDER BY id DESC;`;

    return await query(queryString);
  } catch (err) {
    console.error(err);
  }
}

export const TodoRepository = {
  queries: {
    getSearchTodos,
  },
};