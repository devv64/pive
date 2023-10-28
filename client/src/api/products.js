export async function getFeaturedProducts() {
    const api = 'http://127.0.0.1:8000/drinks/featured_carousel';
  
    try {
        const res = await fetch(api);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
  }

export async function getProductbyId(productId) {
    const api = `http://127.0.0.1:8000/drinks/${productId}`;

    try {
        const res = await fetch(api);
        return await res.json();
    }
    catch (error) {
        console.log(error);
    }
  }


  export async function getCategory(category, page) {
    const api = `http://127.0.0.1:8000/drinks/category_products/${category}/${page}`;

    try {
        const res = await fetch(api);
        return await res.json();
    }
    catch (error) {
        console.log(error);
    }
  }

  export async function getSearchResults(search, page) {
      const api = `http://127.0.0.1:8000/drinks/search_results/${search}/${page}`;

      try {
          const res = await fetch(api);
          return await res.json();
      }
      catch (error) {
          console.log(error);
      }
  }
