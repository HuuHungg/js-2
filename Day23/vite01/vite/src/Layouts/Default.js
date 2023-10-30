export const DefaultLayout = ({ body }) => {
  return `
      <header>
          <div>
              <h1><a href = "/" data-route>HEADER</a></h1>
          </div>
      </header>
      
      <main>
          <div >
              <div >
                  <h1>Menu</h1>
                  <ul>
                      <li><a href = "/">Trang chủ</a></li>
                      <li><a href = "/gioi-thieu">Giới thiệu</a></li>
                      <li><a href = "/san-pham">Sản phẩm</a></li>
                  </ul>
              </div>
              <div>
                  ${body}
              </div>
          </div>
      </main>
  
      <footer>
          <div >
              <h1>FOOTER</h1>
          </div>
      </footer>
      `;
};
