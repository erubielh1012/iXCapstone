const createCategory = async (category) => {
  console.log("You are creating a new category!")
  const response = await fetch(
    "http://localhost:8000/api/categories",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: category
    });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || console.log(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const responseData = await response.json();
  return responseData;
};

const fetchCategories = async () => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const categoriesApiData = await response.json();
  return categoriesApiData;
};

const updateCategory = async (category) => {
  const data = await fetch(
    "http://localhost:8000/api/categories/" + category.get("id"),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: category
    });

  if (!data.ok) {
    try {
      let res = await data.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const categoriesApiData = await data.json();
  return categoriesApiData;
};

  const deleteCategory = async (id) => {
    const response = await fetch(
      "http://localhost:8000/api/categories/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const categoriesApiData = await response.json();
  return categoriesApiData;
  };
  
  const categoryService = {
    createCategory,
    fetchCategories,
    updateCategory,
    deleteCategory,
  };

  export default categoryService;

