$(document).ready(function(){
    const menu = [
        { name: "Burger", price: 100, img: "burger.jpg" },
        { name: "Pizza", price: 250, img: "pizza.jpg" },
        { name: "Pasta", price: 180, img: "pasta.jpg" },
        { name: "Fries", price: 80, img: "fries.jpg" }
    ];

    menu.forEach((item) => {
        $('#menuItems').append(`
            <div class="menu-item">
                <img src="${item.img}" alt="${item.name}">
                <h5>${item.name}</h5>
                <p>₱${item.price}</p>
            </div>
        `);
        $('#quantityInputs').append(`
            <div class="mb-3 quantity-container">
                <label class="form-label">${item.name} quantity:</label>
                <input type="number" class="form-control quantity" data-price="${item.price}" placeholder="Enter quantity">
            </div>
        `);
        
    });

    function updateTotal() {
        let total = 0;
        let totalQuantity = 0;  
    
        $(".quantity").each(function () {
            let price = parseInt($(this).data("price")) || 0;
            let quantity = parseInt($(this).val()) || 0;
            total += price * quantity;
            totalQuantity += quantity; 
        });
    
        $("#totalPrice").text(`₱${total.toFixed(2)}`);
        $("#totalQuantity").text(totalQuantity); 
    }
    


    $(".quantity").on("input", updateTotal);

    $("#paymentAmount").on("input", function(){
        let payment = parseFloat($(this).val());
        let total = parseFloat($("#totalPrice").text().replace("₱", ""));
        if (!isNaN(payment) && payment >= total) {
            let change = payment - total;
            $("#changeAmount").text(change.toFixed(2));
            $("#changeText").hides();
        } else {
            $("#changeText").hide();
        }
    });

    $("#submitOrder").click(function () {
        $("#invoiceName").text($('#name').val());
        $("#invoiceAddress").text($('#address').val());
        $("#invoiceContact").text($('#contact').val());
        $("#invoiceTotal").text($("#totalPrice").text().replace("₱", ""));
        $("#invoicePayment").text($("#paymentAmount").val());
        $("#invoiceChange").text($("#changeAmount").text());
    
        $("#salesInvoiceModal").modal("show");
    });
    
});