/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TodoP } from "./_components/TodoForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createResponse } from "@/types/dbResponse";

const createTodoSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  status: z.enum(["active", "done", "hold", "deleted"]),
});

export const getTodos = async (id?: number) => {
  try {
    let queryString: string;
    let queryParams: unknown[] = [];

    if (id) {
      queryString = "SELECT * FROM todos WHERE id = $1";
      queryParams = [id];
    } else {
      queryString = "SELECT * FROM todos ORDER BY id DESC";
    }

    const res: TodoP[] = await query(queryString, queryParams);
    return createResponse("Succes list", res, true);
  } catch (err) {
    return console.error("hata1: ", err);
  }
};

type SearchOptionP = {
  queryStr?: string;
  statuses?: string[];
}

export const getSearchTodos = async (options: SearchOptionP) => {
  try {
    const data = (await getServerSession(authOptions)) as any;
    const userId = data?.user?.id + "";
    if (userId) {
      const { queryStr, statuses = [] } = options;

      const statusConditions =
        statuses.length > 0
          ? statuses.map((status) => `status = '${status}'`).join(" OR ")
          : null;

      const queryString = statusConditions
        ? `SELECT * FROM todos WHERE (description LIKE '%${queryStr}%' OR title LIKE '%${queryStr}%') AND ${statusConditions} AND user_id = ${userId}::VARCHAR ORDER BY id DESC;`
        : `SELECT * FROM todos WHERE (description LIKE '%${queryStr}%' OR title LIKE '%${queryStr}%') AND user_id = ${userId}::VARCHAR ORDER BY id DESC;`;

      const res: TodoP[] = await query(queryString);
      return createResponse("Succes list", res, true);
    }
    return createResponse("failed list user not found", [], false);
  } catch (err) {
    return console.error("hata2: ", err);
  }
}

export const createOrUpdateTodo = async (formData: FormData) => {
  const id = formData.get("id");
  try {
    const data = (await getServerSession(authOptions)) as any;
    const userId = data?.user?.id;
    if (userId) {
      const validateData = createTodoSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
      });

      if (validateData.success) {
        const { title, description, status } = validateData.data;
        let queryString;
        let queryValues;
        if (id) {
          queryString =
            "UPDATE todos SET title = $1, description = $2, status = $3, user_id = $4 WHERE id = $5 RETURNING *";
          queryValues = [title, description, status, userId, id];
        } else {
          queryString =
            "INSERT INTO todos (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
          queryValues = [title, description, status, userId];
        }
        await query(queryString, queryValues);

        revalidatePath("/");
      }
    }
  } catch(err) {
    console.error(err, ": error");
  }
  
}
