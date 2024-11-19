import { useState } from "react";
import { TagType } from "../types/types";
import { useMutation } from "@apollo/client";
import { CREATE_TAG} from "../api/graphql_mutations";
import { GET_TAGS } from "../api/graphql_queries";

export function TagEditor(props: { onTagCreated: (newId: number) => void }) {
  const [name, setName] = useState("");

  const [doCreateTag] = useMutation<{ createTag: TagType }>(CREATE_TAG, {
    refetchQueries: [GET_TAGS],
  });
  async function doSubmit() {
    try {
      const { data } = await doCreateTag({
        variables: {
          data: {
            name,
          },
        },
      });
      setName("");
      if (data) {
        props.onTagCreated(data.createTag.id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 16,
      }}
    >
      <label>
        Nom du tag :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button type="button" onClick={doSubmit}>
        Créer mon tag
      </button>
    </div>
  );
}