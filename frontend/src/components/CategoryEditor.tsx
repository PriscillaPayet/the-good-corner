import { useState } from "react";
import { CategoryType } from "../types/types";
import {GET_CATEGORIES } from "../api/graphql_queries";
import {CREATE_CATEGORY } from "../api/graphql_mutations";
import { useMutation } from "@apollo/client";

export function CategoryEditor(props: {
  onCategoryCreated: (newId: number) => void;
}) {
  const [name, setName] = useState("");

  const [doCreateCategory] = useMutation<{ createCategory: CategoryType }>(
    CREATE_CATEGORY,
    {
      refetchQueries: [GET_CATEGORIES],
    }
  );
  async function doSubmit() {
    try {
      const { data } = await doCreateCategory({
        variables: {
          data: {
            name,
          },
        },
      });
      setName("");
      if (data) {
        props.onCategoryCreated(data.createCategory.id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="new-category-container"
    >
      <label  className="label">
        Nom de la catégorie *
        <input
          className="text-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button className="button" type="button" onClick={doSubmit}>
        Créer ma catégorie
      </button>
    </div>
  );
}