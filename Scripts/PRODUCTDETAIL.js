/**
 * Hàm thay đổi số lượng sản phẩm khi click vào nút + hoặc -
 * @param {HTMLElement} btn - Nút được click (+ hoặc -)
 * @param {number} change - Giá trị thay đổi (-1 hoặc 1)
 */
function changeQuantity(btn, change) {
    // 1. Tìm thẻ input số lượng nằm gần nút nhất
    // (Tìm thẻ cha chung 'quantity-input-group', sau đó tìm 'quantity-input' bên trong)
    const quantityInputGroup = btn.closest('.quantity-input-group');
    if (!quantityInputGroup) return; // Thoát nếu không tìm thấy nhóm input

    const quantityInput = quantityInputGroup.querySelector('.quantity-input');
    if (!quantityInput) return; // Thoát nếu không tìm thấy input

    // 2. Lấy giá trị hiện tại và đảm bảo nó là số
    let currentValue = parseInt(quantityInput.value);

    // Nếu giá trị không hợp lệ (NaN), đặt lại là 1
    if (isNaN(currentValue)) {
        currentValue = 1;
    }

    // 3. Tính toán giá trị mới
    let newValue = currentValue + change;

    // 4. Đảm bảo giá trị mới không nhỏ hơn 1 (Giá trị tối thiểu)
    if (newValue < 1) {
        newValue = 1;
    }

    // 5. Cập nhật lại giá trị vào input
    quantityInput.value = newValue;

    // Tùy chọn: Gọi hàm cập nhật tổng tiền nếu cần (dựa trên hàm updateItemTotal của bạn)
    // updateItemTotal(quantityInput); 
}


/**
 * Hàm kiểm tra và chuẩn hóa giá trị nhập vào
 * (Thêm hàm này để xử lý sự kiện onchange/onkeyup)
 * @param {HTMLElement} input - Thẻ input số lượng
 */
function updateItemTotal(input) {
    let value = parseInt(input.value);

    // Đảm bảo giá trị nhập vào là hợp lệ và không nhỏ hơn 1
    if (isNaN(value) || value < 1) {
        input.value = 1;
    }

    // *Lưu ý*: Nếu bạn muốn tính tổng tiền sản phẩm (ví dụ: 48,000đ * số lượng), 
    // bạn sẽ viết logic tính toán tại đây.
}// Thêm đoạn mã này vào file JS của trang productdetail

function addToCart() {
    // 1. Lấy thông tin sản phẩm từ trang hiện tại
    const productName = document.querySelector('.product-title').textContent.trim();
    const imageUrl = document.querySelector('.main-image').src;

    // Trích xuất giá (ví dụ: "48,000đ" -> 48000)
    const unitPriceText = document.querySelector('.sale-price').textContent;
    const unitPrice = parseInt(unitPriceText.replace(/[^0-9]/g, ''));

    // Lấy số lượng sản phẩm (giả sử input số lượng có class là .quantity-input)
    const quantityInput = document.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput ? quantityInput.value : 1);

    // Tạo đối tượng sản phẩm
    const product = {
        // Tạo ID đơn giản, ví dụ: lấy vài ký tự đầu của tên + giá
        id: productName.substring(0, 10).replace(/[^a-zA-Z0-9]/g, '') + unitPrice,
        name: productName,
        price: unitPrice,
        quantity: quantity,
        image: imageUrl
    };

    // 2. Tải giỏ hàng hiện tại từ Local Storage
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // 3. Kiểm tra nếu sản phẩm đã tồn tại thì tăng số lượng
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ
        cart.push(product);
    }

    // 4. Lưu giỏ hàng đã cập nhật vào Local Storage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    // 5. Thông báo cho người dùng
    alert(`${quantity} sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);

    // (Tùy chọn: Chuyển hướng đến trang Giỏ Hàng)
    // window.location.href = '/GIOHANG';
}

// Gắn hàm addToCart vào nút "THÊM VÀO GIỎ"
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
});