import { MetaFunction, LoaderFunction, ActionFunction, redirect } from "remix";
import { useLoaderData, json, Form } from "remix";
import { supabase } from "../../db";

type IndexData = {
  id: number;
  created_at: string;
  title: string;
  description: string;
}[];

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { data, error } = await supabase.from("manga").insert({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (error) {
    return json(error, { status: 400 });
  }
  console.log(data);
  return redirect("/mangas");
};

// https://remix.run/guides/routing#index-routes
export default function MangaNew() {
  return (
    <div className="">
      new manga
      <Form method="post">
        <label>
          title:
          <input type="text" name="title" />
        </label>
        <label>
          description:
          <textarea name="description" />
        </label>
        <input type="submit" value="submit" />
      </Form>
    </div>
  );
}
