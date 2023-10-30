export const ProductDetail = ({ params }) => {
  const { id } = params;

  return `
  <h3>Chi tiết sản phẩm: ${id}</h3>
  <button  onclick = "navigate('/san-pham')">Back</button>
  `;
};
