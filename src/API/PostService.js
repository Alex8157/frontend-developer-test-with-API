export class PostService {
  static async getProducts(offset, limit) {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
    ).then((response) => response.json());
    return response;
  }
  static async deleteProduct(id) {
    await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: "DELETE",
    });
  }
  static async addProduct(product) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    return fetch("https://api.escuelajs.co/api/v1/products/", requestOptions);
  }
}
