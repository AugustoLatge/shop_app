import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    // Any async code you want!
    try {
      const response = await fetch(
        "https://rn-complete-guide-81cf2.firebaseio.com/products.json"
        // method: 'GET', don't neet to add this. It is the default for 'fetch()'
        // GET request also doesn't need 'headers'
        // headers: {
        //   'Content-Type': 'application/json'
        // },
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      // Send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = producId => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide-81cf2.firebaseio.com/products/${producId}.json`,
      {
        method: "DELETE"
      }
    );    

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, pid: producId });
  };
};

// Returns a promise
export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // Any async code you want!
    // 'await fetch()' gets a response from the promise (equivalent to .then() followed by .catch())
    const response = await fetch(
      "https://rn-complete-guide-81cf2.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };

  // SAME AS:
  // return { type: CREATE_PRODUCT, productData: {
  //   title: title,
  //   description: description,
  //   imageUrl: imageUrl,
  //   price: price
  // }};
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide-81cf2.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};
