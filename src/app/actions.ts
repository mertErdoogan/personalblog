"use server";

import { query } from "@/lib/db";
import { createResponse } from "@/lib/dbResponse";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TodoP } from "./_components/TodoForm";

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
    return console.error("hata: ", err);
  }
};

type SearchOptionP = {
  queryStr?: string;
  statuses?: string[];
}

export const getSearchTodos = async (options: SearchOptionP) => {
  try{
    const { queryStr, statuses = [] } = options;

    const statusConditions =
      statuses.length > 0
        ? statuses.map((status) => `status = '${status}'`).join(" OR ")
        : null;
    const queryString = statusConditions
      ? `SELECT * FROM todos WHERE (description LIKE '%${queryStr}%' OR title LIKE '%${queryStr}%') AND ${statusConditions} ORDER BY id DESC;`
      : `SELECT * FROM todos WHERE description LIKE '%${queryStr}%' OR title LIKE '%${queryStr}%' ORDER BY id DESC;`;

    const res: TodoP[] = await query(queryString);

    return createResponse("Succes list", res, true);
  } catch(err){
    return console.error("hata: ", err);
  }
}

export const createOrUpdateTodo = async (formData: FormData) => {
  const id = formData.get("id");

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
        "UPDATE todos SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *";
      queryValues = [title, description, status, id];
    } else {
      queryString =
        "INSERT INTO todos (title, description, status) VALUES ($1, $2, $3) RETURNING *";
      queryValues = [title, description, status];
    }
    await query(queryString, queryValues);

    revalidatePath("/");
  }
}
