let label = document.getElementById('label')
let ShoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((a,c)=> a+c, 0)
}

calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket
            .map((x)=> {
                let { id, item } = x;
                let search = shopItemsData.find((c) => c.id === id) || [];
                let {img, name, price} = search;
                return `
            <div class="cart-item">
                <img width="100" src=${img} alt="" />
                <div class="details">
                  <div class="title-price-x">
                      <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$ ${price}</p>
                      </h4>
                      <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                  </div>
                  <div class="buttons">
                      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                      <div id=${id} class="quantity">${item}</div>
                      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                  </div>
                  <h3>$ ${item * search.price}</h3>
                </div>
              </div>
            `;
        }).join(''));
    }
    else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back To Home<?button>
        </a> 
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };
  
  let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  
  TotalAmount();

// generate form required to enter credit card info

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("checkout")) {
    // The user clicked the checkout button, so show the credit card form
    showCreditCardForm();
  }
});

function showCreditCardForm() {
  // Create the form element
  const form = document.createElement("form");
  form.classList.add("credit-card-form");

  // Create the input fields for the credit card information
  const creditCardNumberInput = document.createElement("input");
  creditCardNumberInput.type = "text";
  creditCardNumberInput.name = "credit-card-number";
  creditCardNumberInput.placeholder = "Credit Card Number";
  creditCardNumberInput.classList.add("input")
  form.appendChild(creditCardNumberInput);

  const expiryDateInput = document.createElement("input");
  expiryDateInput.type = "text";
  expiryDateInput.name = "expiry-date";
  expiryDateInput.placeholder = "Expiry Date (MM/YYYY)";
  expiryDateInput.classList.add("input")
  form.appendChild(expiryDateInput);

  const securityCodeInput = document.createElement("input");
  securityCodeInput.type = "text";
  securityCodeInput.name = "security-code";
  securityCodeInput.placeholder = "Security Code (CVV or CVC)";
  securityCodeInput.classList.add("input")
  form.appendChild(securityCodeInput);

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.classList.add("input")
  form.appendChild(submitButton);

  // Add the form to the page
  document.body.appendChild(form);
}

  // add ability to accept CC payment via the form 

  function checkout(creditCardNumber, expiryDate, securityCode, amount) {
    // Validate the input data
    if (!validateCreditCardNumber(creditCardNumber)) {
      return { success: false, error: "Invalid credit card number" };
    }
    if (!validateExpiryDate(expiryDate)) {
      return { success: false, error: "Invalid expiry date" };
    }
    if (!validateSecurityCode(securityCode)) {
      return { success: false, error: "Invalid security code" };
    }
    if (amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }
  
    // Send the payment information to the payment gateway
    const paymentResponse = paymentGateway.sendPayment({
      creditCardNumber,
      expiryDate,
      securityCode,
      amount,
    });
  
    if (paymentResponse.success) {
      // Payment successful, update the order status and send a receipt
      updateOrderStatus(orderId, "PAID");
      sendReceipt(customerEmail, orderId, amount);
      return { success: true };
    } else {
      // Payment failed, return the error from the payment gateway
      return { success: false, error: paymentResponse.error };
    }
  }

  // need to implement the functions (validateCreditCardNumber, validateExpiryDate, validateSecurityCode-- these are done), paymentGateway.sendPayment, updateOrderStatus, and sendReceipt. You will also need to integrate with a payment gateway to actually process the payments.

  // function to validate CC numbers using Luhn algorithm
  function validateCreditCardNumber(creditCardNumber) {
    // Remove any spaces or hyphens from the credit card number
    creditCardNumber = creditCardNumber.replace(/[\s-]/g, "");
  
    // Check that the credit card number is a string of numbers
    if (!/^\d+$/.test(creditCardNumber)) {
      return false;
    }
  
    // Check that the credit card number is the correct length
    if (creditCardNumber.length < 12 || creditCardNumber.length > 19) {
      return false;
    }
  
    // Use the Luhn algorithm to check the credit card number for validity
    let sum = 0;
    let isEven = false;
    for (let i = creditCardNumber.length - 1; i >= 0; i--) {
      const digit = parseInt(creditCardNumber[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
  
    return sum % 10 === 0;
  }

// check expiration date for validity (format MM/YYYY)

  function validateExpiryDate(expiryDate) {
    // Check that the expiry date is in the format MM/YYYY
    const expiryDateRegex = /^\d{2}\/\d{4}$/;
    if (!expiryDateRegex.test(expiryDate)) {
      return false;
    }
  
    // Split the expiry date into the month and year
    const [month, year] = expiryDate.split("/");
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  
    // Check that the expiry year is equal to or greater than the current year
    if (year < currentYear) {
      return false;
    }
  
    // If the expiry year is the same as the current year, check that the expiry month is greater than the current month
    if (year === currentYear && month < currentMonth) {
      return false;
    }
  
    return true;
  }

  // checking the security code is valid for a credit card 

  function validateSecurityCode(securityCode, creditCardNumber) {
    // Remove any spaces or hyphens from the credit card number
    creditCardNumber = creditCardNumber.replace(/[\s-]/g, "");
  
    // Check that the security code is a string of numbers
    if (!/^\d+$/.test(securityCode)) {
      return false;
    }
  
    // Check the length of the security code based on the type of credit card
    if (creditCardNumber.startsWith("4") && securityCode.length !== 3) {
      return false;
    }
    if (creditCardNumber.startsWith("34") || creditCardNumber.startsWith("37") && securityCode.length !== 4) {
      return false;
    }
    if (securityCode.length !== 3) {
      return false;
    }
  
    return true;
  }
