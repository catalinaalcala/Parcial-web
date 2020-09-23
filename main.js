let cart = [];
let menu = [];
let inCart = 0;

const fetchPromise = fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json",
);
fetchPromise
  .then((response) => response.json())
  .then((categories) => {
    menu = categories;
    let ids = [
      "info-burgers",
      "info-tacos",
      "info-salads",
      "info-desserts",
      "info-drinks-sides",
    ];
    for (let i = 0; i < categories.length; i++) {
      let html = "";
      let products = categories[i].products;
      for (let j = 0; j < products.length; j++) {
        let current = products[j];
        html +=
          "<div class='cool-12 col-sm-6 col-lg-3 mb-4 px-2'>\n" +
          "<div class='card h-100'>\n" +
          "<img src='" +
          current.image +
          "' class='card-img-top' alt='" +
          ids[i] +
          "'>\n" +
          "<div class='card-body d-flex flex-column'>\n" +
          "<h5 class='card-title'><strong>" +
          current.name +
          "</strong></h5>\n" +
          "<p class='card-text'>" +
          current.description +
          "</p>\n" +
          "<div class='mt-auto'>\n<p class='card-text'><strong>$" +
          current.price +
          "</strong></p>\n" +
          "<button type='button' onclick='add(" +
          i +
          "," +
          j +
          ")' class='btn btn-dark'>Add to car</button>" +
          "</div>\n</div>\n</div>\n</div>\n";
      }
      document.getElementById(ids[i]).innerHTML = html;
    }
  });

function add(i, j) {
  let product = menu[i].products[j];
  let item = cart.length + 1;
  const found = cart.find((item) => item.description == product.name);
  if (found) {
    found.quantity++;
  } else {
    cart.push({
      item: item,
      quantity: 1,
      description: product.name,
      unitPrice: product.price,
    });
  }
  document.getElementById("num-items").innerHTML = ++inCart + " items";
  alert(product.name + " was added to your shopping cart");
}

function showShoppingCart() {
  let html = "";
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    product = cart[i];
    amount = product.unitPrice * product.quantity;
    total += amount;
    html +=
      "<tr>\n" +
      "<th scope='row'>" +
      product.item +
      "</th>\n" +
      "<td>" +
      product.quantity +
      "</td>\n" +
      "<td>" +
      product.description +
      "</td>\n" +
      "<td>" +
      product.unitPrice +
      "</td>\n" +
      "<td>" +
      amount +
      "</td>\n" +
      "</tr>\n";
  }
  document.getElementById("order-detail").innerHTML = html;
  document.getElementById("total").innerHTML = total;

  let tabs = ["burgers", "tacos", "salads", "desserts", "drinks-sides"];

  for (let i = 0; i < tabs.length; i++) {
    let content = document.getElementById(tabs[i]);
    if (content.classList.contains("show")) {
      content.classList.remove("show", "active");
    }
  }

  document.getElementById("shopping-cart").classList.add("show", "active");
}

function cleanCart() {
  cart = [];
  inCart = 0;
  document.getElementById("num-items").innerHTML = "";
  showShoppingCart();
}

function showShoppingCartConsole() {
  if (cart.length == 0) alert("Your order is empty. Please continue shopping");
  else {
    console.log(cart);
    alert("Your order was confirmed, thank you");
  }
}
