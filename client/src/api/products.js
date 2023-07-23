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
