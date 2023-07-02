import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useEffect, useState } from "react";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    //useEffect renders only once instead of listening to the port all the time
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json()) //data returned from fetch is transformed into json
      .then((data) => {
        setCategories(data); //json data is passed as parameter to setCategories
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault(); //Prevent a link from opening the URL
    handleSubmit(project); //passing a project in a argument
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text, //fetch the text from the index selected in options
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""} //ternary operator
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory} // Update the prop name
        value={
          project.category && project.category.id ? project.category.id : ""
        }
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
