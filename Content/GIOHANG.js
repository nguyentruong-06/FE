// Hàm format số thành định dạng tiền tệ Việt Nam (ví dụ: 104,000₫)
function formatCurrency(amount) {
    // Đảm bảo amount là số và không phải NaN
    if (typeof amount !== 'number' || isNaN(amount)) {
        amount = 0;
    }
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}

// Hàm chính để cập nhật toàn bộ giỏ hàng, được gọi mỗi khi số lượng thay đổi
function updateCart() {
    let grandTotal = 0;

    // Lấy tất cả các hàng sản phẩm trong giỏ hàng
    const productRows = document.querySelectorAll('.product-row'); // Tìm tất cả các div có class này

    productRows.forEach(row => {
        // Lấy các phần tử quan trọng trong từng hàng
        const quantityInput = row.querySelector('.quantity-input');
        const itemTotalElement = row.querySelector('.item-total');

        // Lấy giá gốc (cần được lưu trong thuộc tính data-price của thẻ product-row)
        const unitPrice = parseInt(row.getAttribute('data-price'));
        let newQuantity = parseInt(quantityInput.value);

        // 2. Kiểm tra và điều chỉnh giá trị hợp lệ
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            // Tùy chọn: Đặt lại giá trị trong input nếu muốn
            // quantityInput.value = 1; 
        }

        // 3. Tính toán
        const newItemTotal = unitPrice * newQuantity;
        grandTotal += newItemTotal; // **Cộng dồn vào tổng cuối cùng**

        // 4. Cập nhật giao diện (Cột Tổng - nơi 1)
        itemTotalElement.textContent = formatCurrency(newItemTotal);
    });

    // 5. Cập nhật Tổng tiền cuối cùng (Nơi 2)
    const grandTotalValueElement = document.getElementById('grand-total-value');
    if (grandTotalValueElement) {
        grandTotalValueElement.textContent = formatCurrency(grandTotal);
    }
}

// Đảm bảo hàm updateCart được chạy khi trang tải xong
document.addEventListener('DOMContentLoaded', updateCart);
// Thêm hàm này vào file JS của bạn (GIOHANG.js)
function validateForm() {
    let isValid = true;

    // Hàm phụ trợ để hiển thị lỗi
    function displayError(id, message) {
        const errorElement = document.getElementById(id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
    }

    // 1. Validate Tên (Name)
    const nameInput = document.getElementById('name');
    // Regex: Chữ cái (kể cả tiếng Việt) và khoảng trắng. \u00C0-\u1EF9 là dải ký tự chữ cái tiếng Việt.
    const nameRegex = /^[a-zA-Z\u00C0-\u1EF9\s]+$/;

    if (nameInput.value.trim() === '') {
        displayError('name', '⚠️ Xin nhập lại họ và tên.');
        isValid = false;
    } else if (!nameRegex.test(nameInput.value.trim())) {
        displayError('name', '⚠️ Xin nhập lại họ và tên (Không số, không ký tự đặc biệt, chỉ chữ hoa, chữ thường và cách).');
        isValid = false;
    } else {
        displayError('name', '');
    }

    // 2. Validate Email
    const emailInput = document.getElementById('email');
    // Regex email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() === '') {
        displayError('email', '⚠️ Xin hãy nhập lại email.');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        displayError('email', '⚠️ Xin hãy nhập lại email (VD: abc@gmail.com).');
        isValid = false;
    } else {
        displayError('email', '');
    }

    // 3. Validate Địa chỉ (Address)
    const addressInput = document.getElementById('address');
    if (addressInput.value.trim() === '') {
        displayError('address', '⚠️ Xin hãy nhập lại địa chỉ.');
        isValid = false;
    } else {
        displayError('address', '');
    }

    // 4. Validate Sđt (Phone)
    const phoneInput = document.getElementById('phone');
    // Regex: Chỉ chấp nhận số
    const phoneRegex = /^[0-9]+$/;

    if (phoneInput.value.trim() === '') {
        displayError('phone', '⚠️ Xin hãy nhập lại số điện thoại.');
        isValid = false;
    } else if (!phoneRegex.test(phoneInput.value.trim())) {
        displayError('phone', '⚠️ Xin hãy nhập lại số điện thoại (Không có chữ và ký tự đặc biệt).');
        isValid = false;
    } else {
        displayError('phone', '');
    }

    // 5. Validate Phương thức thanh toán (Payment Method)
    const paymentRadios = document.getElementsByName('payment');
    let isPaymentSelected = false;
    for (let i = 0; i < paymentRadios.length; i++) {
        if (paymentRadios[i].checked) {
            isPaymentSelected = true;
            break;
        }
    }

    if (!isPaymentSelected) {
        displayError('payment', '⚠️ Xin hãy chọn phương thức thanh toán.');
        isValid = false;
    } else {
        displayError('payment', '');
    }

    return isValid;
}
// ==========================================================
// CÁC HÀM CƠ BẢN VÀ VALIDATE FORM (Đã giữ nguyên theo yêu cầu)
// ==========================================================

// Hàm format số thành định dạng tiền tệ Việt Nam (ví dụ: 104,000₫)
function formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        amount = 0;
    }
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}

// Hàm chính để cập nhật toàn bộ giỏ hàng, được gọi mỗi khi số lượng thay đổi
function updateCart() {
    let grandTotal = 0;

    // Lấy tất cả các hàng sản phẩm trong giỏ hàng
    const productRows = document.querySelectorAll('.product-row');

    productRows.forEach(row => {
        const quantityInput = row.querySelector('.quantity-input');
        const itemTotalElement = row.querySelector('.item-total');

        // Lấy giá gốc
        const unitPrice = parseInt(row.getAttribute('data-price'));
        let newQuantity = parseInt(quantityInput.value);

        // Kiểm tra và điều chỉnh giá trị hợp lệ
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        }

        const newItemTotal = unitPrice * newQuantity;
        grandTotal += newItemTotal;

        // Cập nhật giao diện (Cột Tổng)
        itemTotalElement.textContent = formatCurrency(newItemTotal);
    });

    // Cập nhật Tổng tiền cuối cùng
    const grandTotalValueElement = document.getElementById('grand-total-value');
    if (grandTotalValueElement) {
        grandTotalValueElement.textContent = formatCurrency(grandTotal);
    }
}

// Hàm Validate Form (Giữ nguyên logic của bạn)
function validateForm() {
    let isValid = true;

    function displayError(id, message) {
        const errorElement = document.getElementById(id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
    }

    // 1. Validate Tên
    const nameInput = document.getElementById('name');
    const nameRegex = /^[a-zA-Z\u00C0-\u1EF9\s]+$/;
    if (nameInput.value.trim() === '') {
        displayError('name', '⚠️ Xin nhập lại họ và tên.');
        isValid = false;
    } else if (!nameRegex.test(nameInput.value.trim())) {
        displayError('name', '⚠️ Xin nhập lại họ và tên (Không số, không ký tự đặc biệt, chỉ chữ hoa, chữ thường và cách).');
        isValid = false;
    } else {
        displayError('name', '');
    }

    // 2. Validate Email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        displayError('email', '⚠️ Xin hãy nhập lại email.');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        displayError('email', '⚠️ Xin hãy nhập lại email (VD: abc@gmail.com).');
        isValid = false;
    } else {
        displayError('email', '');
    }

    // 3. Validate Địa chỉ
    const addressInput = document.getElementById('address');
    if (addressInput.value.trim() === '') {
        displayError('address', '⚠️ Xin hãy nhập lại địa chỉ.');
        isValid = false;
    } else {
        displayError('address', '');
    }

    // 4. Validate Sđt
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^[0-9]+$/;
    if (phoneInput.value.trim() === '') {
        displayError('phone', '⚠️ Xin hãy nhập lại số điện thoại.');
        isValid = false;
    } else if (!phoneRegex.test(phoneInput.value.trim())) {
        displayError('phone', '⚠️ Xin hãy nhập lại số điện thoại (Không có chữ và ký tự đặc biệt).');
        isValid = false;
    } else {
        displayError('phone', '');
    }

    // 5. Validate Phương thức thanh toán
    const paymentRadios = document.getElementsByName('payment');
    let isPaymentSelected = false;
    for (let i = 0; i < paymentRadios.length; i++) {
        if (paymentRadios[i].checked) {
            isPaymentSelected = true;
            break;
        }
    }
    if (!isPaymentSelected) {
        displayError('payment', '⚠️ Xin hãy chọn phương thức thanh toán.');
        isValid = false;
    } else {
        displayError('payment', '');
    }

    return isValid;
}


// ==========================================================
// HÀM XỬ LÝ THANH TOÁN (Chỉ cần tạo mã đơn hàng)
// ==========================================================

// Hàm tạo mã đơn hàng: #DDMMYYRR
function generateOrderCode() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const randomNum = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    return `#${day}${month}${year}${randomNum}`;
}

// ==========================================================
// XỬ LÝ SỰ KIỆN CHÍNH (Tải trang & Nút Thanh toán)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Luôn đảm bảo tổng tiền được tính toán khi trang tải xong
    updateCart();

    const checkoutSubmitBtn = document.querySelector('.checkout-submit-btn');
    const orderSuccessBlock = document.querySelector('.order-success-block');
    const displayOrderCode = document.getElementById('display-order-code');

    // Khởi tạo: Đảm bảo khối thành công bị ẩn khi tải trang
    if (orderSuccessBlock) {
        orderSuccessBlock.classList.add('hidden');
    }

    if (checkoutSubmitBtn) {
        checkoutSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();

            // --- BƯỚC 1: KIỂM TRA HỢP LỆ (VALIDATION) ---
            if (!validateForm()) {
                // Nếu có lỗi, ẩn thông báo thành công
                if (orderSuccessBlock) {
                    orderSuccessBlock.classList.add('hidden');
                }
                return;
            }

            // --- BƯỚC 2: XỬ LÝ THÀNH CÔNG (KHÔNG XÓA GIỎ HÀNG) ---

            // 1. Tạo và hiển thị Mã đơn hàng
            const newOrderCode = generateOrderCode();
            if (displayOrderCode) {
                displayOrderCode.textContent = newOrderCode;
            }

            // 2. HIỆN khối ĐẶT HÀNG THÀNH CÔNG (Bên cạnh Form)
            if (orderSuccessBlock) {
                orderSuccessBlock.classList.remove('hidden');
            }

            // Cuộn xuống thông báo thành công (nếu cần)
            orderSuccessBlock.scrollIntoView({ behavior: 'smooth' });
        });
    }
});








