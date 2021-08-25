function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot)=>{
        let cartItems = [];
        snapshot.forEach((doc)=>{
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
    })
}

function decreaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then((doc)=>{
        if(doc.exists)
        {
            if(doc.data().quantity>1)
            {
                cartItem.update({
                    quantity: doc.data().quantity-1
                })
            }
            else{
                deleteItem(itemId);
            }
        }
    })
}
function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then((doc)=>{
        if(doc.exists)
        {
            
                cartItem.update({
                    quantity: doc.data().quantity+1
                })
            
        }
    })
}

function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems)
{
    let itemsHTML = "",sum=0;
    cartItems.forEach((item)=>{
        itemsHTML+=`
        
                <div class="cart-item flex items-center pb-4 border-b border-gray-300">
                <div class="cart-item-image w-40 h-24 bg-white p-4">
                    <img class="w-full h-full object-contain" src="${item.image}" alt="">
                </div>
                <div class="cart-item-details flex-grow">
                    <div class="cart-item-title font-bold text-gray-800 text-sm">
                        ${item.name}
                    </div>
                    <div class="cart-item-brand text-gray-600 text-sm">
                        ${item.make}
                    </div>
                </div>
                <div class="cart-item-counter w-48 flex items-center">
                    <div data-id="${item.id}" class="chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2">
                        <i class="fas fa-minus"></i>
                    </div>
                    <h4 class="text-gray-400">x${item.quantity}</h4>
                    <div data-id="${item.id}" class="chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                   Rs. ${numeral(item.price*item.quantity).format('Rs0,0.00')} 
                </div>
                <div data-id="${item.id}" class="card-item-delete w-10 text-gray-300 font-bold cursor-pointer hover:text-gray-400">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        
        `
        sum+=item.quantity*item.price;
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    document.querySelector(".total-cost-number").innerText ="Rs. "+numeral(sum).format('Rs0,0.00') ;
    createEventListeners();
}

function createEventListeners(){
    let decreaseButtons = document.querySelectorAll(".chevron-left");
    let increaseButtons = document.querySelectorAll(".chevron-right");
    let deleteButtons = document.querySelectorAll(".card-item-delete");


    decreaseButtons.forEach((btn)=>{
        btn.addEventListener("click",function(){
            decreaseCount(btn.dataset.id);
        })
    })
    increaseButtons.forEach((btn)=>{
        btn.addEventListener("click",function(){
            increaseCount(btn.dataset.id);
        })
    })

    deleteButtons.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            deleteItem(btn.dataset.id);
        })
    })
}

getCartItems();