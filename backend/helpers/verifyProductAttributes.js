
const verifyProductAttributes = (Attributes) => {
  const { name, price, company } = Attributes;
  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }
  if (price == null || typeof price !== "number") {
    return "Price is required and must be a number";
  }
  if (!company || typeof company !== "string") {
    return "Company is required and must be a string";
  }
    
  return null;
};

export default verifyProductAttributes;