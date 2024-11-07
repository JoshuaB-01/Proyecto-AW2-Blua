const BASE_URL = 'http://localhost:3001';

export const fetchProductos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const crearOrden = async (ordenData) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ordenData),
    });
    if (!response.ok) {
      throw new Error('Error al procesar la orden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear la orden:', error);
    throw error;
  }
};

