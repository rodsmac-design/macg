import axios from "axios";

// Replace with your Web App URL for fetching products
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxm1oNE9aJjMZbTDvsG3XXh2TZF9NABIgwCrmIovfXnv10G9DZOJYrzGc3U2kMU2gDdnA/exec";

// Replace with your Web App URL for submitting orders
const ORDERS_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyeZyguPccLoayBUuxd-uFcDjw-bHoJ50__HL0WN-YL9c7EMEzBvSR_rKZomAfaykErDw/exec";

// Function to fetch all products
export async function fetchProducts() {
  try {
    const response = await axios.get(WEB_APP_URL);

    if (!Array.isArray(response.data)) {
      console.error("Unexpected response format:", response.data);
      return [];
    }

    return response.data.map((product) => ({
      id: String(product["Product ID"]), // Ensure ID is a string
      name: product['Product Name'] || "", // Ensure Product Name is pulled
      category: product["Category"] || "", // Ensure category is pulled
      subcategory: product["Subcategory"] || "", // Ensure subcategory is pulled
      subSubcategory: product["Sub-Subcategory"] || "", // Ensure sub-subcategory is pulledname: product["Product Name"],
      specialCategory: product["Special Category"] || "", // Ensure special category is pulled
      description: product["Description"],
      price: Number(product["Price (GST Incl.)"]) || 0, // Ensure price is parsed as a number
      specialprice: Number(product["Special Price"]) || 0, // Ensure price is parsed as a number
      stock: product["Stock"] || "",
      features: product["Features"] || "",
      tags: product["Tags"] || "",
      dimensions: product["Dimensions"] || "",
      imageUrls: [
        product["Image URL 1"],
        product["Image URL 2"],
        product["Image URL 3"],
        product["Image URL 4"],
        product["Image URL 5"],
        product["Image URL 6"],
        product["Image URL 7"],
        product["Image URL 8"],
        product["Image URL 9"],
        product["Image URL 10"],
      ].filter(Boolean),
    }));
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    console.log("ID Passed to fetchProductById:", id); // Debug log
    const products = await fetchProducts();
    console.log("All Products:", products); // Debug log to confirm data

    const product = products.find((p) => p.id === id);

    if (!product) {
      console.error(`Product with ID "${id}" not found.`);
      return null;
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    return null;
  }
}

