const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;


async function fetchProperties() {
    try {
        //handle case where apiDomain is not available in deployment environment return empty array
        if (!apiDomain) {
            return [];
        }
    
      const res = await fetch(`${apiDomain}/properties`, {cache: 'no-store'});
      if (!res.ok) {
        throw new Error('Failed to fetch properties');
      }
      return await res.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }
//fetch single property by id
async function fetchProperty(id) {
    try {
        //handle case where apiDomain is not available in deployment environment return empty array
        if (!apiDomain) {
            return null;
        }
    
      const res = await fetch(`${apiDomain}/properties/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch properties');
      }
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export { fetchProperties, fetchProperty };