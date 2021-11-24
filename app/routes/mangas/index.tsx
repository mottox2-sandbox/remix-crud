import { LoaderFunction, Form } from "remix";
import { useLoaderData, json, Link } from "remix";
import { supabase } from "../../db";

type IndexData = {
  id: number;
  created_at: string;
  title: string;
  description: string;
}[];

export let loader: LoaderFunction = async () => {
  const res = await supabase.from("manga").select("*").order("id");
  return json(res.data);
};

export default function MangaIndex() {
  let data = useLoaderData<IndexData>();

  return (
    <div>
      <Link to="new">New manga</Link>
      <table>
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
        </thead>
        <tbody>
          {data.map((manga) => (
            <tr>
              <td>{manga.id}</td>
              <td>
                <Link to={`/mangas/${manga.id}`}>{manga.title}</Link>
              </td>
              <td>{manga.description}</td>
              <td>
                <Form method="post" action="/mangas/star">
                  <input type="hidden" name="id" value={manga.id} />
                  <button>star</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
