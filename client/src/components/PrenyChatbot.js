import React, { useEffect } from 'react';

function PrenyChatbot() {
    useEffect(() => {
        // Kiểm tra xem script đã tồn tại chưa để tránh việc thêm nhiều lần
        if (!document.querySelector('script[src="https://app.preny.ai/embed-global.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://app.preny.ai/embed-global.js';
            script.async = true;
            script.defer = true;
            script.dataset.prenyBotId = '6809f1c88ebce60ba4723860';
            script.dataset.buttonStyle = 'width:200px;height:200px';

            document.body.appendChild(script);

            // Cleanup function để loại bỏ script khi component unmount (tùy chọn)
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    // Component này không render ra bất kỳ UI trực tiếp nào
    return null;
}

export default PrenyChatbot;