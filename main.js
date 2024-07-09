let shop = document.getElementById("shop");

console.log(shop); // Checking if 'shop' element is correctly retrieved

let shopItemsData = [
  {
    id: "jfhgbvnscs",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipus  olljg lfjfl",
    img: "images/img-1.jpg",
  },
  {
    id: "jfhgbvflgis",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipus  olljg lfjfl",
    img: "images/img-2.jpg",
  },
  {
    id: "jwlelglflg",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipus  olljg lfjfl",
    img: "images/img-3.jpg",
  },
  {
    id: "algojlnnbj",
    name: "Men Suit",
    price: 300,
    desc: "description 4",
    img: "images/img-4.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data"))  ||[];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search=basket.find((x)=>x.id===id) || [];
      return `
      <div class="item">
        <img src="${img}" width="220px" alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>${price}</h2>
            <div class="buttons">
              <i class="fa fa-minus" onclick="decrement('${id}')"></i>
              <div class="quantity" id="${id}">
              
              
              ${search.item===undefined?0:search.item}
              
              
              </div>
              <i class="fa fa-plus" onclick="increment('${id}')"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

let content = generateShop(); // Call the function and store the returned content

// console.log(content); // Output the generated HTML content

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
localStorage.setItem("data",JSON.stringify(basket));
  console.log(basket);
  update(selectedItem);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search.item === 0 || search === undefined) return;
  else {
    search.item -= 1;
  }

  console.log(basket);
  update(selectedItem);
  basket=basket.filter((x)=>x.item!==0);
  

  
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  
  
};

calculation();